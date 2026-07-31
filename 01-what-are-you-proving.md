# What Are You Proving?

**AI Fluency, Week 1 | Nevin Tom**

---

## The proof statement

I build machine learning systems that report their own uncertainty and hand
back the cases they should not be deciding, and I publish the measurement that
weakens my claim next to the one that supports it. The person I am writing for
is the engineering lead at a small South African team that already has a model
in production and has quietly assigned a human to check its output, because
that team knows the cost of a confident wrong answer and has nobody who can
put a number on it. What I want that person to do is open one repository, read
the ablation table, and email me.

## Why this needs to exist

My CV says machine learning and my LinkedIn says MSc student, and neither can
show the thing that actually distinguishes me: that when the ablation said 387
features scored 96.43% and texture alone scored 96.27%, I published both.
There is no field on either document where that fits, and no employer will
take my word for it in an interview without having seen it first.

## Narrowing the claim

The brief says to use AI as a thinking partner and push back until the claim is
genuinely narrow and true. So the useful artefact here is not the final
paragraph, it is what the paragraph had to survive. Each round below is a
claim, the objection that killed it, and what changed.

**Round 1.** "I build reliable, production-ready AI systems."

*Objection: name one thing this excludes.* It excludes nothing. Every engineer
alive would sign it. "Reliable" and "production-ready" are the words you use
when you have not decided what you are good at, and a claim that costs nothing
to make proves nothing when made.

**Round 2.** "I build AI systems that are honest about their limitations."

*Objection: honest is a property of a person, not of a system, and you have
just claimed to be a nice person rather than a competent one.* Also unfalsifiable:
nobody can check whether my systems are honest. What can be checked is whether
a specific number is present in a specific document.

**Round 3.** "I build classifiers with a reject option."

*Objection: now it is narrow enough to be checkable and too narrow to be true.*
The citation auditor is not a classifier. The polite scraper is not a
classifier. A claim that only covers one of six projects is a description of
one project.

**Round 4.** "I build systems that know when not to trust themselves."

*Objection: this is the site's headline, and as a headline it earns its place,
but as a proof statement it hides the work.* A reader cannot tell from it
whether I mean a calibration curve, a try/except, or a feeling. The mechanism
has to be in the sentence.

**Round 5, kept.** The version at the top. It names the mechanism, "report
their own uncertainty and hand back the cases they should not be deciding",
which is a thing you can look for in a repository and fail to find. And it adds
the part that is genuinely mine rather than generic: publishing the measurement
that weakens the claim.

The claim is now narrow enough that I can be caught failing it. The defect
inspector's ablation, the scraper README that was wrong by 295 records, and
GigGuard failing open are all on the site precisely because they are the
evidence, and every one of them is a place where the number is worse than the
version of the story I would rather tell.

## The one person, made specific

Not "employers". Not "the AI industry". One person:

An engineering lead at a South African company of maybe forty people, with a
model scoring something that matters, invoices or claims or defects, and a
person on staff whose job partly consists of checking its output by hand. That
lead does not need a better model. They need to know which fifth of the queue
the human should be looking at, and they have never seen a candidate arrive
with that number already computed.

I know that person exists because I am currently the junior engineer at a data
company, and the question of what to do when the model is unsure comes up more
often than the question of how to make it more accurate.

## The one action

Email me, having read one ablation table.

Not "get in touch". Not "let's connect". The action assumes the reading has
already happened, which is why the site leads with a plot you can drag rather
than a paragraph about my passion for AI. If a visitor emails without reading,
the site has failed even though the metric went up.

## What this commits me to

Everything downstream inherits this, and it rules things out, which is how I
know the statement is doing work:

- The hero is a real risk-coverage curve, not a photograph of me.
- Every project on the site carries the limitation that matters, in bold,
  at the same size as the result.
- No case study can end on the good number. If I cannot state what the
  project fails at, it does not go on the site.
- The call to action is an email address and nothing else. No contact form,
  no newsletter, no "let's build something amazing together".

---

*Related: [the one-line claim and content map](06-through-line-content-map.md),
[the case studies](03-frame-it-as-cases.md).*
