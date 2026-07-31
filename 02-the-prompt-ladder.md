# The Prompt Ladder

**AI Fluency, Week 2 | Nevin Tom | Backend AI Engineering track**

---

## Why this ladder can be scored rather than admired

Most prompt-iteration write-ups end with "v5 is clearly better", which is a
judgement about prose. This one has an answer key.

The task is the retry policy for a service that publishes to a rate-limited
API. I had already built that policy, in
[social-media-studio](https://github.com/Nevvyboi/social-media-studio), and it
is covered by tests. So there are six requirements that the working code
actually needed, and each version of the prompt either produces them or does
not:

| | Requirement | Where it came from |
|---|---|---|
| R1 | Honour `Retry-After` on a 429 instead of guessing | the platform names a number, guessing is either rude or slow |
| R2 | Exponential backoff with jitter for 5xx | a fleet retrying in lockstep is a second outage |
| R3 | Do **not** retry a 4xx that is not 429 or 401 | a 422 on a caption is permanent, three more attempts change nothing |
| R4 | On a 401, refresh the token **once**, then retry | tokens get revoked and servers restart |
| R5 | Send the idempotency key on **every** attempt | otherwise a retry after a timeout double posts |
| R6 | Cap attempts, and report permanent separately from exhausted | an operator needs to know which one happened |

**R4 is the one that matters.** It is the bug that actually bit me: the sandbox
platform restarted, its tokens live in memory, mine were in Postgres still
looking unexpired, and every publish came back 401. My code filed 401 under
"the request was wrong" and two jobs died without a single retry. If a prompt
does not produce R4, it produces the bug I shipped.

**How these were run.** Each version was run once, in a Claude Code session on
Claude Opus 5, 31 July 2026. Outputs are abridged to the retry logic itself;
the boilerplate around it is not interesting and not scored. One layer changes
per version, and the layer is chosen to attack the biggest weakness in the
output before it.

---

## v0, the baseline

> Write backend code for retries.

**Output.** A generic helper. `for attempt in 1..3`, `await sleep(2 ** attempt * 1000)`,
catch anything, rethrow at the end. No status codes at all: it retries on any
thrown error, which for most HTTP clients means it does not retry a 500 (which
resolves fine) and does retry a malformed-URL error (which never will).

**Score: R2 only.** 1 of 6.

It is a plausible-looking function that would take down a rate-limited API,
because a 429 is a successful response, not a thrown error, so the helper sails
straight past the one case retries exist for.

## v1, adding a clearer goal

*The weakness in v0: it did not know what it was retrying.*

> Write a retry wrapper for HTTP requests to a third-party API that is rate
> limited. It should keep working when the API pushes back instead of failing
> the whole job.

**Output.** Now status-aware. Retries on `429` and `5xx`, gives up on `4xx`,
exponential backoff with jitter.

**Score: R2, R3.** 2 of 6.

A real jump, and the cheapest one on the ladder: naming the situation bought
status handling and the do-not-retry-a-4xx rule in one line. But it invents its
own backoff for the 429 rather than reading `Retry-After`, which means it
ignores the one piece of information the server volunteered.

## v2, adding real context

*The weakness in v1: it guessed at the wait rather than reading it.*

> ...as above, plus: this API returns `429` with a `Retry-After` header in
> seconds, returns `401` when the bearer token is no longer valid, returns
> `422` for a caption that is too long or an image of the wrong dimensions,
> and accepts an `Idempotency-Key` header so the same post is never created
> twice.

**Output.** Reads `Retry-After` and waits that long. Keeps jittered backoff for
5xx. Treats `401` and `422` together as non-retryable. Mentions the idempotency
key in a comment.

**Score: R1, R2, R3.** 3 of 6.

The largest single jump, and it came from four sentences of fact about the
service rather than from any technique. Note what it did with `401`: given the
plain statement that 401 means the token is no longer valid, it concluded the
request was wrong and stopped. That is exactly the reasoning I made myself, so
this is not the model being stupid. It is the model reproducing an error that
looks correct until a server restarts.

## v3, adding an output format

*The weakness in v2: the answer was prose with code in it, and the parts I
needed to check were scattered.*

> ...as above. Return: (1) the function, (2) a table of every status code the
> function can see and what it does with it, (3) a one-line note on anything
> you were unsure about.

**Output.** Same code. But the table exposed the hole immediately:

| status | action |
|---|---|
| 2xx | return |
| 401 | fail, permanent |
| 422 | fail, permanent |
| 429 | wait `Retry-After`, retry |
| 5xx | jittered backoff, retry |

And the note said: *"I have treated 401 as permanent. If tokens in this system
can expire mid-run, that is wrong and the caller should refresh."*

**Score: R1, R2, R3.** Still 3 of 6.

The format bought no new behaviour and it is the most useful rung on the
ladder. Forcing a table made a decision visible that had been buried in a
branch, and forcing "anything you were unsure about" surfaced the exact defect,
unprompted, as a caveat I could act on. The output did not improve; my ability
to audit it did.

## v4, adding constraints

*The weakness in v3: it flagged the 401 problem but still shipped the 401 bug,
because nothing told it what to do about it.*

> ...as above. Constraints: a 401 must trigger exactly one token refresh and
> retry, and only fail if the refresh also gets a 401. The idempotency key must
> be sent on every attempt including retries. Cap total attempts at 4. The
> caller must be able to tell "permanently refused" apart from "ran out of
> attempts".

**Output.** All of it. Refresh-once flag, key on every attempt, `maxAttempts`,
and two error classes, `PermanentPublishError` and `TransientPublishError`,
each carrying the status.

**Score: R1 through R6.** 6 of 6.

Honest reading of this rung: the constraints are the answer written as a
question. I did not discover R4 here, I dictated it, having lost two jobs to it
the day before. What the layer proves is narrower than it looks, and worth
knowing: once you can state a requirement precisely, the model will hold it,
including the boring parts like threading a key through a retry loop where a
human quietly forgets on attempt three.

## v5, adding a counter-example

*The weakness in v4: it satisfied the letter of every constraint, and I had no
evidence it understood any of them.*

> ...as above. Here is a failure that happened: the platform process restarted,
> its tokens live in memory, ours were in Postgres and still looked unexpired,
> so every request returned 401 and both jobs failed after zero retries. Show
> me where your implementation prevents that, and then tell me one other way
> this same policy can still fail.

**Output.** Pointed at the refresh-once branch and traced the restart through
it correctly. Then volunteered two failures I had not asked about:

1. **The refresh is per request, not per process.** Twenty jobs in flight when
   the platform restarts means twenty simultaneous token refreshes. Nothing
   here collapses them into one.
2. **`Retry-After` is trusted without a ceiling.** A server that returns
   `Retry-After: 86400`, whether by policy or by bug, parks the worker for a
   day, and the cap on attempts does not help because the wait happens between
   attempts rather than as one.

**Score: still 6 of 6, plus two real defects in my shipped code.**

Both are true of the code in the repository right now. Neither is fixed. They
are in the README's limitations section, where I can point at them, and I would
not have known to write them without this rung.

---

## What the ladder actually shows

```
v0  R2                          1/6   generic loop, would hammer a 429
v1  R2 R3                       2/6   naming the situation bought status handling
v2  R1 R2 R3                    3/6   four sentences of fact, largest jump
v3  R1 R2 R3                    3/6   no new behaviour, defect made visible
v4  R1 R2 R3 R4 R5 R6           6/6   constraints held, including the boring ones
v5  R1 R2 R3 R4 R5 R6 + 2 found 6/6   the counter-example paid, not the polish
```

**The cheapest layer was context, not cleverness.** Four sentences describing
what the API actually returns moved the score more than any technique on the
list. Everything I did before that was making the request prettier while
withholding the information that would have answered it.

**The format layer changed nothing and mattered anyway.** v3 scored identically
to v2 and is the rung I would keep if I could only keep one. Demanding a table
of every status code turned a decision buried in an `else` into a row I could
read, and demanding an uncertainty note produced a warning about the exact bug
that later cost me two jobs. Structure did not make the answer better. It made
the answer checkable, and I am the failure point, not the model.

**The constraints layer is honest about being dictation.** v4 scored full marks
because I told it the answer. That is still worth having, since precisely
stated requirements get held consistently, but it is not the model solving
anything and I should not describe it as such.

**The counter-example was the only rung that taught me something.** Handing over
a real failure and asking where the code survives it, then asking for one more
way it breaks, returned two defects that are in production code today. The
first four rungs improved an output. The fifth improved my understanding of
something I had already shipped and believed was finished.

## What I would do differently

Start at v2. The first two rungs of this ladder are me withholding facts I
already had, and I suspect that is what most bad prompting is: not a missing
technique, but an unwillingness to type out the context because I already know
it. The model does not.

---

*Ground truth and tests:
[social-media-studio/src/publisher/http-platform.js](https://github.com/Nevvyboi/social-media-studio/blob/main/src/publisher/http-platform.js),
[test/publish.test.js](https://github.com/Nevvyboi/social-media-studio/blob/main/test/publish.test.js).*
