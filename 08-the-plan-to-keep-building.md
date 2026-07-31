# The Plan to Keep Building

**AI Fluency, Week 9 | Nevin Tom**

---

## How to add the next case

Not a vague intention. The exact shape, in the repository, next to the thing it
describes: [`Nevvyboi.github.io/README.md`](https://github.com/Nevvyboi/Nevvyboi.github.io/blob/main/README.md).

Every project in the Work section is the same four parts, and the list is in
rank order, strongest first and least finished last.

```html
<div class="item">
  <div>
    <h3>Project name</h3>
    <p class="what">Two or three lines. What it is and what it is built from.</p>
    <span class="tag">one measured fact, lowercase</span>
  </div>
  <p class="limit"><b>The limitation, as a full sentence, in bold.</b> Then two
    or three lines saying why it is a real limit and why I am reporting it
    rather than the headline.</p>
</div>
```

Three beats, the same shape as Week 2: the problem is implied by `p.what`, what
I did and decided is the rest of it, and what came of it is the bold sentence
opening `p.limit`.

**The rule that keeps the list honest:** if I cannot state what it fails at, it
does not go on the site. That has already kept two projects off, and it is the
part most likely to erode, because a limitation is the one thing nobody asks
you for.

Adding a case is one edit to `index.html` and a commit. No build step, no
framework, nothing to reinstall in eight months when I have forgotten how any
of it works. That is not an accident of taste, it is the reason the site will
still be editable when the habit is the only thing keeping it alive.

## The next piece, named

**The trust-aware defect inspector, published as a public repository.**

It is the lead case on the site and the only one whose number is on the page
while its code is not. A visitor is currently asked to take my word for 96.3%
overall and 98.4% on what it accepts, on a site whose entire argument is that
you should not have to take anyone's word for a number. That is the largest
inconsistency on the page and it has a specific fix.

**Unblocked by:** the CSO7015 submission being marked. Publishing assessed work
before it is marked is a risk to me, so this is a real blocker rather than an
excuse, and it has a date attached rather than a someday.

**When it goes up, it changes two things:** the lead case gains a link, and the
"still to gather" list in the [content map](06-through-line-content-map.md)
loses its most important row.

Queued behind it, in the repository README so it survives this document:

| Next | Unblocked by |
|---|---|
| Defect inspector, public | CSO7015 marked |
| Citation auditor, recorded run in its host | nothing, outstanding work |
| World models specification, public | same marking constraint |

## The reminder, which actually fires

A calendar note is a thing I can dismiss and then never see again. This is a
scheduled GitHub Action on the site's own repository:
[`.github/workflows/next-case-study.yml`](https://github.com/Nevvyboi/Nevvyboi.github.io/blob/main/.github/workflows/next-case-study.yml).

```yaml
on:
  schedule:
    - cron: "0 8 1 2,5,8,11 *"
```

The first of February, May, August and November. It opens an issue with the
three-beat template and a pointer at the queue, and it checks for an open issue
labelled `next-case` first, so it never stacks a second one. Three identical
open issues is how a reminder becomes something you filter out.

**Evidence that it works rather than exists:**

```
$ gh workflow run "Next case study"
$ gh run list --workflow "Next case study"
completed  success  Next case study  main  workflow_dispatch  30650280570  7s  2026-07-31T17:12:57Z

$ gh issue list
1  OPEN  Add the next case study (2026-07)  next-case  2026-07-31T17:13:01Z
```

Run manually to prove it fires. Issue
[#1](https://github.com/Nevvyboi/Nevvyboi.github.io/issues/1) is open now, and
it is the first real instance of the habit rather than a test I should close.

Three properties I wanted and a calendar could not give me:

**It lands where the work happens.** The issue is on the repository I would
have to edit anyway, not in an app I open for other reasons.

**It survives me.** No device, no account of mine, no subscription. If I change
laptops or phones it keeps running.

**It is checkable by someone else.** Anyone can look at the Actions tab and see
whether the habit held. A calendar reminder is a private claim about my
intentions; this leaves a public record of every quarter I ignored it.

That last one is the point. A promise to keep building is worth exactly as much
as the evidence of whether I did, and I would rather that evidence exist and
sometimes embarrass me than not exist at all.

## What I am keeping from this track

The voice card, the palette, and the rule about limitations are all written
down in this repository rather than held in my head, which means the next case
is a short edit and not a rebuild of my own conventions from memory.

The habit I actually want is narrower than "keep the portfolio updated". It is
this: **when a project finishes, find the measurement that makes it look worse,
and put that on the page.** Every case here has one, and every one of them was
uncomfortable to write. The ablation that says most of my feature engineering
did not matter. The README claim that was wrong by 295 records. The sandbox I
graded my own work against.

Those are the entries a reader believes, and they are the only reason the good
numbers next to them are worth anything.

---

*The queue and the how-to also live in
[the site's README](https://github.com/Nevvyboi/Nevvyboi.github.io/blob/main/README.md),
so they survive this document.*
