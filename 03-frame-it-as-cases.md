# Frame It as Cases

**AI Fluency, Week 2 | Nevin Tom**

---

## Voice card

**Plain, measured, specific, unhedged, and willing to say the bad number.**

Six words, and each one rules something out. It is now a standing instruction
for everything written for the site.

What it forbids, in practice:

- No adjectives doing the work of evidence. "Robust" means nothing; 98.4% on
  what it accepts means something.
- No hedging on my own results. Either I measured it or I did not.
- No hype vocabulary. Not one instance of leverage, unlock, seamless,
  revolutionise, or delve.
- Every project ends on what it fails at, not on what it achieves.

The last rule is the one that costs something, and it is the reason the site
reads differently from other portfolios.

## How these were written

The brief says to be interviewed rather than to have the copy written for you,
one question at a time, answering honestly and messily. That is what happened,
and the useful part to record is what the interview removed.

**Cut from the defect inspector case:** a paragraph about the feature
engineering pipeline, LBP and GLCM and HOG, 387 features. The question that
killed it was *"which of those features earned its place?"* The honest answer
was that I did not know until I ran the ablation, and once I ran it the answer
was mostly no. So the feature list left the case study and the ablation
replaced it.

**Cut from GigGuard:** "bank-grade security". I could not say what grade that
is, or which bank.

**Cut from the polite scraper:** the sentence "handles edge cases gracefully".
The question was *"name one."* I could name one, and it turned out I had got it
wrong by 295 records, which is now the whole third beat of the case.

**Kept against my instinct:** the number 96.27%. Texture features alone score
almost as well as the entire stack. It makes months of feature work look
unnecessary, which is exactly why it stays.

---

## Case 1: Trust-aware defect inspector

**The problem.** A steel surface inspection line has a classifier that returns
a defect class for every part, whatever it sees. When it is wrong it is wrong
silently, and the plant finds out downstream. The interesting question on that
line is not "how accurate is the model", it is "which parts should a human be
looking at", and a model that only outputs a class cannot answer it.

**What I did, and what I decided.** Classical computer vision on NEU-CLS, 1,800
images across six defect classes: denoise, segment, then LBP, GLCM and HOG
features into a calibrated SVM. The decision that mattered was adding a reject
option on top of the calibrated probabilities, so the system abstains on the
cases where its confidence is not earned, and then measuring the whole thing as
a risk-coverage curve rather than as a single accuracy number.

The second decision was to run an ablation I did not want to run: score the
texture features alone against the full 387-feature stack.

**What came of it.** 96.3% accuracy answering everything, and 98.4% on what it
accepts when it hands back the least certain fifth. The curve flattens past
about 80% coverage, so rejecting more parts costs a human more time without
buying much accuracy, and that is where it ships.

The ablation said texture alone scores 96.27% against 96.43% for all 387
features. Most of that feature stack is doing less work than its size suggests.
That number is on the front page of my site, at the same weight as the good
one, because a reader who finds it themselves stops trusting everything else I
wrote.

---

## Case 2: Polite scraper

**The problem.** Every scraping tutorial writes code as though the server on
the other end does not exist. The result works and is rude: no robots.txt, no
pacing, no caching, and a re-run that costs the host exactly as much as the
first run. I wanted a corpus for a retrieval project and I did not want to be
the reason a small site's bandwidth bill went up.

**What I did, and what I decided.** A pipeline of five separable stages,
discover, fetch, parse, clean, store, with the politeness in the fetch layer
rather than in a comment. robots.txt parsed by hand rather than with the
standard library, because I wanted a refusal to name the exact line that caused
it. Requests spaced by the host's crawl-delay or a floor. Every response cached
with its `ETag`, so re-runs send `If-None-Match`.

The decision I would defend hardest is that a 4xx on robots.txt means no policy
was published and a 5xx means a policy exists and I could not read it, so the
first is permission and the second closes the host. Treating an outage as
consent is how a crawler becomes a problem.

**What came of it.** 1,000 records across 50 categories, nothing refused,
nothing retried, nothing unparsable. The second run downloads 0.1 KB against
112.4 KB, because six of seven responses come back 304.

And the part I would rather not report: I wrote a limitation into the README
saying that a certain kind of duplicated description was a theoretical edge
case the target site did not produce. Then I counted. It produces it 295 times
out of 998, and every one of those records was going into the corpus with its
opening 375 characters duplicated. Counting took four minutes. I had already
written the confident sentence.

---

## Case 3: Social media studio

**The problem.** Publishing one blog post to several platforms sounds like a
loop and is not. Each platform crops a different shape, holds you to a
different caption length, rate limits you differently, and tells you whether
the post went out later, over a callback. Get any of that wrong and the failure
is a duplicate post on somebody's real account.

**What I did, and what I decided.** One `SocialPublisher` interface with two
implementations, so nothing outside the publisher directory knows that
Instagram needs two round trips and X needs one. A durable queue where "post at
9am" is a `run_after` column rather than a timer in a process. Idempotency keys
derived from the campaign and platform rather than generated per attempt, sent
on every retry.

The decision that shaped the rest: the worker never writes "published". It
writes "accepted", because at that moment all it knows is that the platform
took the post. Only the signature-verified callback moves an entry to
published. Recording an intention as a fact is the exact bug the callback
exists to prevent.

**What came of it.** 27 tests, and a demonstration rather than a claim. The
worker is killed four seconds into a publish, after the platform created the
post and before the worker recorded the id. On restart the job is reclaimed
when its lease expires, the same idempotency key comes back, and the platform
returns the post it already had. One post per platform across a crash mid
publish.

Two things broke on the way, and both are in the README. A test that stubbed
the adapter's clock stopped time on one side only, so the platform saw four
requests in an instant that the adapter believed were twenty seconds apart. And
a 401 filed as a permanent refusal killed the first crash-resume run outright,
because the sandbox had restarted and forgotten a token my database still
thought was valid.

---

## Bio

Nevin Tom. Junior data engineer at Truedata in Pretoria, finishing an MSc in
artificial intelligence. I work on the part of a system that decides whether to
answer at all: calibration, reject options, and the measurements that tell you
where a model stops being trustworthy. Most of what I build is small, measured,
and comes with the number that makes it look worse.

## Call to action

**Read the ablation, then email me.**

One line, one action, one address. No form, no newsletter, no "let's connect".
If someone emails without having read anything, the site did not work, whatever
the inbox says.

---

*Voice card and the rules it implies: see also
[the identity kit](04-identity-kit.md) and
[the content map](06-through-line-content-map.md).*
