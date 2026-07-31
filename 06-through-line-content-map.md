# The Through-Line: Content Map and CTAs

**AI Fluency, Week 3 | Nevin Tom**

Live: **https://nevvyboi.github.io/**

---

## The one-line claim

> **I build systems that know when not to trust themselves.**

Ten words, and it is the first thing on the page at 46px.

### How it was chosen

Ten options were generated. Eight were rejected on the same grounds, and it is
worth recording why, because the failure mode was consistent:

| Rejected | Why |
|---|---|
| "Building the future of trustworthy AI" | Nothing. Anyone could say it about anything. |
| "Machine learning engineer specialising in model reliability" | A job title, not a claim. Describes a chair, not a result. |
| "I make AI systems you can actually rely on" | "Actually" is the tell. Insisting is not evidence. |
| "Calibrated confidence for production machine learning" | Accurate and unreadable by the person I am writing for. |
| "Turning uncertainty into decisions" | Backwards. The work turns decisions back into uncertainty when they are not earned. |
| "Honest AI" | Two words, no content, and honesty is not a property of software. |
| "I measure what my models don't know" | Close, and the good one came from sharpening it. |
| "Know when to say I don't know" | Nearly it, but "I" reads as me rather than as the system. |

The two survivors were "I measure what my models don't know" and the one I
kept. The kept version wins because *not to trust themselves* is the part that
does the work: it says the system holds a view about its own reliability and
acts on it, which is precisely the mechanism, not a vibe about carefulness.

**The choosing was mine.** Generating ten options took seconds. Working out
that "actually" is a tell, and that "I don't know" attributes the doubt to the
wrong party, took the rest of the hour.

## The content map

One page. Every page I could add is a page a visitor has to decide to click,
and the whole site exists to move one person to one action.

```
/  (the only page)
│
├─ Masthead
│    Name · role, city, availability
│    → no CTA. Establishes that a specific real person is speaking.
│
├─ Thesis
│    The one-line claim, 46px, "not" in amber
│    One paragraph: what most classifiers do, what mine do instead,
│    and that the thing below is a real one
│    → no CTA. Sets up the instrument.
│
├─ The instrument              ← THE STRONGEST CASE LEADS
│    Live risk-coverage curve from outputs/metrics.json
│    A slider, two numbers, one sentence that changes with it
│    → the CTA is the slider. The only thing asked for here is
│      thirty seconds of interaction, and it is the whole argument.
│
├─ Work, with the limitation that matters
│    1. Trust-aware defect inspector   the ablation that weakens it
│    2. Citation auditor               five unsupported claims in my own writing
│    3. GigGuard                       fails open on purpose
│    4. Polite scraper                 a README claim wrong by 295 records
│    5. Social media studio            the sandbox is one I wrote myself
│    6. World models spec              the prototype refutes one of its claims
│    → no per-project CTA. Nothing to click means nothing to bounce off.
│
├─ Elsewhere
│    LinkedIn · GitHub · Email
│    → THE ONE ACTION. Email, having read the ablation.
│
└─ Footer
     "Built by hand. No frameworks, no fonts loaded, no analytics."
     "Figures from a real run, not illustrative."
     → no CTA. Two claims about the page itself, both checkable in view-source.
```

### Which case sits where, and why

**The defect inspector leads and does not appear in the list first as a
paragraph.** It is the instrument. Its risk-coverage curve is the hero, so the
strongest case is not described at the top, it is operated at the top. A
visitor who drags the slider has understood the claim before reading a single
project.

**The citation auditor is second** because it is the same idea in a different
domain: a system that refuses rather than invents. Two projects in a row making
the same point in different shapes is what turns a claim into a pattern.

**GigGuard is third**, and it is the one that could be dropped. It is the least
related to the claim and the most relatable, and it earns its place on "fails
open, on purpose" alone.

**The scraper and the studio are fourth and fifth**, newest work, and they carry
the two most uncomfortable admissions. They are placed after the reader has
already been given three results, because an admission from a stranger reads as
incompetence and an admission from someone who has shown you three working
things reads as calibration.

**The world models spec is last.** It is the most ambitious and the least
finished, and a visitor who has stopped reading by then has already seen
everything they need.

### Why there is no About page

The About page would say I am an MSc student in Pretoria who works at a data
company, which the masthead already says in one line. The bio exists, in
[the case studies](03-frame-it-as-cases.md), and it goes in the LinkedIn
summary rather than on the site. A page that repeats the masthead is a page
that costs a click and returns nothing.

### Why there is no contact form

The one action is an email. A form adds a backend, a spam problem, a privacy
policy, and a delivery failure mode, in exchange for saving a visitor from
opening their mail client. It also means I cannot tell whether the message
arrived.

## Still to gather

Honest list of the proof the map assumes and does not yet have.

| Missing | For | Blocked on |
|---|---|---|
| Defect inspector repository, public | The lead case has no link. The number is on the page and the code is not. | The MSc is not marked. Publishing before then is a plagiarism risk to me. |
| World models spec, public | Same. | Same. |
| A recorded run of the citation auditor in its host | The agent's judgement is untested. Everything verified so far tests the tools by driving the protocol directly. | Nothing. This is just outstanding. |
| A real photograph | The About slot, [see the image notes](05-curate-your-images.md). | A photo I am happy to publish. |
| A before-and-after visual for the scraper's second run | Its case is the only one with no visual at all. | Nothing. Half an hour of work. |
| The site linked from LinkedIn and the CV | Nobody arrives at a portfolio nobody links to. | Nothing. |

The first two are the important ones. Two of the six cases on the front page
currently ask a stranger to take my word for a number, which is the exact thing
this site is built to avoid. They go public the day the assessed work is
marked, and until then the honest position is that those two cases are weaker
than the four that link to code.

---

*The claim it ladders up to: [what are you proving](01-what-are-you-proving.md).
The copy for each case: [frame it as cases](03-frame-it-as-cases.md).*
