# Make It Do Something

**AI Fluency, Week 8 | Nevin Tom**

Live: **https://nevvyboi.github.io/** (the "Try it" section)

---

## The one feature

Not a contact form. The brief allows a live demo of your own work instead, and
for this site a form would have been the wrong choice twice over: the one
action is already an email address, and a form would add a backend, a spam
problem and a delivery failure mode in exchange for saving a visitor from
opening their mail client.

What the site actually needed was the thing it keeps claiming and never
demonstrating. Six projects are described in prose. A reader has to take my
word for all of them.

So the feature is **the description de-duplicator from the polite scraper,
running in your browser on whatever you paste.** It is the exact function
that was wrong by 295 records, and the one whose refusal case is the whole
difficulty.

Three buttons load three cases:

| Case | What it does | Why it is there |
|---|---|---|
| A truncated preview | **Cuts.** 774 characters down to 390 | The template glued a preview onto the front of the full text |
| Copy that repeats | **Refuses.** "an exact repeat of only 54 characters, under the 100 character floor" | This is the one the first version got wrong |
| Something short | **Refuses.** "the opening never appears a second time" | The ordinary case, where doing nothing is correct |

The refusal is the point. A detector that removes duplicated openings is
trivial. A detector that knows when the repetition is deliberate is the actual
problem, and it is the same argument the rest of the site makes, small enough
to fit in a text box.

## Verified rather than assumed

Porting a function to another language and calling it "the same detector" is a
claim. So I checked it: extracted the JavaScript straight out of the deployed
page and ran it against the Python over the same 998 book descriptions.

**They disagreed on two.**

The port was right. Python's `\s` does not match `U+FEFF` and JavaScript's
does, and two descriptions carry a byte order mark mid paragraph. On one of
them the mark sits exactly where the duplicated opening ends, so the prefix
comparison failed and a real duplicate went through untouched.

Fixing the Python took its coverage from 895 to 897 out of 998. Then a second
disagreement appeared that only existed once the first was fixed: the mark has
to be **deleted**, not collapsed to a space, or `within.<BOM>A` becomes
`within. A` and gains a word break that was never in the text.

Both implementations now produce **identical output on all 998**, and the
scraper has two new tests covering the seam and the delete-rather-than-collapse
rule.

Two records out of 998 is not much. Being unable to find them without a second
implementation is the part worth recording, because no test I would have thought
to write covers "what if there is a character here you cannot see".

## The plain-words explainer

Asked for by the brief, written for someone who has not built a site.

**What a backend is.** When you open a web page, some computer somewhere has to
hand your browser the file. If that computer just keeps finished files on a
shelf and passes over whichever one you asked for, that is all front end: the
page was written once, and everyone who visits gets the identical thing.

A backend is a program on that computer that *makes* the answer when you ask,
instead of taking one off the shelf. It is what you need the moment the answer
depends on something the shelf cannot know: who you are, what you typed, what
time it is, what someone else did a second ago. A contact form needs one,
because the message has to be stored and delivered and neither of those is a
file sitting on a shelf. Logging in needs one, because the site has to check a
password against something it remembers.

**What my feature does.** You paste a book description. It decides whether the
opening has been accidentally duplicated by a template, and if it has, it
removes the duplicate and tells you which rule fired. If the repetition looks
deliberate it leaves the text alone and tells you why it refused.

**How the data flows.** This is the part that surprised me, and it is why this
feature was the right one to pick.

```
you type
   │
   ▼
a text box in the page
   │
   ▼
a function already sitting in your browser, in the page you downloaded
   │
   ▼
the verdict and the cleaned text, written back into the page
```

**Nothing leaves your computer.** There is no arrow to a server on that
diagram, because there is no server. The whole detector is about seventy lines
of JavaScript that arrived with the page, and it runs in your browser using
your processor. If you disconnected from the internet after the page loaded,
the demo would keep working.

That is worth understanding rather than glossing over, because the instinct is
that anything interactive needs a backend, and most of the time the honest
question is: does this answer depend on something only the server knows? For a
contact form the answer is yes, the server has to remember and deliver. For
this one the answer is no. All the information needed to decide is in the text
you pasted, and shipping the decision to a server and back would add a network
round trip, a place for the request to fail, a server to keep running, and a
privacy question about what happens to what you pasted, in exchange for
nothing.

**What it cost:** zero. No host, no free tier, no account, no keys, no
environment variables, and no ongoing thing to keep alive. The site still makes
zero external requests and the footer still says so truthfully.

**What it would cost if it did need a backend:** a host, a deployment, a
runtime to keep patched, rate limiting so it cannot be used as free compute by
anyone who finds it, and a decision about whether pasted text gets logged. All
of that is real work and none of it would make this particular feature better.

## Where it breaks

- **Long input is slow to nothing.** `indexOf` over a few thousand characters is
  instant. Paste a novel and it will still be fine; paste ten megabytes and the
  tab will hang, because there is no length cap. That is a real limitation and
  it is not fixed.
- **Pasted markup renders as text**, because the output is written with
  `textContent` rather than `innerHTML`. This was deliberate: `innerHTML` on
  user input is how you hand a stranger control of your page.
- **The entity decoder is a table of fifteen**, not a full HTML entity set. It
  covers everything in the corpus. An exotic entity would pass through
  undecoded and, on the seam, could cause the same class of disagreement the
  byte order mark did.
- **It only knows this one site's template.** The 100 character floor was
  measured against duplicates from books.toscrape.com, where the truncation is
  fixed at 368 to 376 characters. A different site truncating at 60 would defeat
  it entirely.

---

*The detector and its history:
[polite-scraper](https://github.com/Nevvyboi/polite-scraper),
[docs/NOTES.md](https://github.com/Nevvyboi/polite-scraper/blob/main/docs/NOTES.md).*
