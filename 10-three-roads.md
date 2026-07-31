# Three Roads: Choosing the Stack

**AI Fluency, Week 4 | Nevin Tom**

---

## A note on honesty, first

This assignment asks you to choose a stack before you build. I built first: the
site has been live at nevvyboi.github.io since before I opened this brief.

So this is not a decision document pretending to be written in advance. It is
the same three-way comparison, run properly against the four constraints, and
then **scored against what the choice actually cost over the weeks it has been
live**. That makes it less useful as a demonstration of foresight and more
useful as a demonstration of whether the reasoning was any good, because there
is an outcome to check it against.

Writing it the other way round, in the future tense, as though I had not
already shipped, would have been the easier document and a false one.

## The four constraints

Given as input, not invented afterwards:

1. **Free only.** No hosting bill, no domain purchase, no paid tier, ever.
2. **Honest skill level.** Comfortable in Python and JavaScript, comfortable
   with git and the command line. Not a designer. Has never used a static site
   generator and has used React only inside other people's projects.
3. **What the portfolio must do.** One page. A claim, six projects each with
   their limitation, and one action, which is an email. Map and sections are in
   [the content map](06-through-line-content-map.md).
4. **How the work must be displayed.** This is the constraint that decided it.
   The lead evidence is a **risk-coverage curve from a real run**, and it has to
   be interactive: a reader drags a slider and watches the operating point move.
   Everything else is prose. No image galleries, no video, no long-form reading.

**Does anything have to be dynamic?** At the time, no. Nothing needed a server.
That answer changed later, and the change is in the scoring below.

## The three roads

### Road 1, simplest: one hand-written HTML file on GitHub Pages

**How you build it.** One `index.html` with the CSS in a `<style>` block and
the JavaScript in a `<script>` block. Commit, push, done.

**Where it hosts.** GitHub Pages, free, HTTPS included, custom domain supported
later.

**Backend?** None.

**The real trade-off.** No components, so a change to the shared look means
editing every place it appears. No templating, so six projects are six blocks of
near-identical markup. It stops scaling the moment there is a second page, and
there is no build step to catch a typo before it is live.

### Road 2, middle: a static site generator, Astro or Eleventy, on Netlify

**How you build it.** Projects become data in a file, and one template renders
them. Layouts get shared. Markdown for prose.

**Where it hosts.** Netlify or Cloudflare Pages free tier, with deploy previews
on every pull request.

**Backend?** None, but Netlify Functions are one directory away if that changes.

**The real trade-off.** A dependency tree, a lockfile, and a build that can
break for reasons unrelated to anything I wrote. I have never used one, so the
first evening goes on the tool rather than the site. And in eight months, `npm
install` on a project I have not touched is a coin flip.

### Road 3, most powerful: Next.js on Vercel

**How you build it.** React components, a real component model, API routes in
the same project when a backend is needed.

**Where it hosts.** Vercel free tier.

**Backend?** Included, which is the main argument for it.

**The real trade-off.** Enormous for one page. Hundreds of megabytes of
dependencies and a framework with its own opinions, to render a document that
is mostly text. The interactive curve would be a React component with state, and
the honest version of that is: more machinery, same picture.

## Pressure-testing the front-runner

The brief asks four questions of the leading option. Road 1 was leading.

**What breaks if I pick the simplest?** A second page. Everything in Road 1
assumes there is one file. The moment the site needs an About page or a
per-project page, the copy-paste becomes real duplication.

**What do I maintain if I pick the most powerful?** A dependency tree that ages
whether or not I touch it. A portfolio is checked twice a year at best, and the
failure mode I actually fear is opening it in eight months and spending the
evening on a build error instead of adding the case study.

**Can I finish in two weeks?** Road 1 in an evening. Road 2 in a weekend
including learning it. Road 3, longer, and most of it not on the site.

**Does it show the work properly?** This is where it stopped being close. The
lead evidence is an interactive SVG plotted from real numbers. In Road 1 that
is an inline `<svg>` and about forty lines of JavaScript that compute the path
from an array. In Road 3 it is a React component doing the same arithmetic
with more ceremony. **No option renders that plot better than plain HTML,
because plain HTML is what the plot is made of.**

## The decision

**Road 1.** One hand-written file on GitHub Pages.

The deciding argument was not simplicity for its own sake. It was that the
site's central claim is that its numbers are real and checkable, and a reader
who wants to verify that should be able to press view-source and read the array
the curve is drawn from. A build step puts a compiler between the claim and the
evidence. Not fatally, but it is the wrong direction for this specific page.

The second argument was the footer, which says the page loads no frameworks and
no fonts. Roads 2 and 3 would each have made that sentence either false or
awkward, and a site arguing for honest measurement cannot have a false claim in
its own footer.

## Scored against what actually happened

The part a decision document written in advance could not contain.

| Prediction | What happened |
|---|---|
| An evening to build | Correct. |
| No dependencies to age | Correct so far, and the site has survived several rounds of edits with no install step. |
| Zero hosting cost | Correct. Also zero external requests, 25 KB, 0.19s load. |
| **"Nothing needs to be dynamic"** | **Wrong, and it did not matter.** Week 8 needed a live feature. It turned out to need no backend either: the demo runs client side, and Road 1 handled it with a `<textarea>` and seventy lines. Had the answer required a server, Road 1 would have been the wrong call and I got that outcome by luck rather than judgement. |
| Copy-paste would hurt at a second page | Untested. There is still one page. |
| **Duplication would hurt within one page** | **Underestimated.** Six projects are six near-identical blocks. Adding two more this month was copy, paste, edit, and a template would have made it one line each. It has not hurt enough to migrate, and it is the cost I feel every time. |

**The one I would flag to anyone reading this:** "nothing has to be dynamic yet"
is the shakiest line in the whole exercise, and the brief specifically asks you
to state it. I stated it, it turned out to be wrong within a month, and the
choice survived anyway because the dynamic thing did not need a server. That is
a good outcome reached through an incorrect prediction, and pretending otherwise
would be the more flattering and less useful record.

## What would change my mind

Written down so it is a trigger rather than a feeling:

- **A second page.** The moment the sitemap needs one, Road 2 becomes correct
  and I move.
- **A feature that genuinely needs a server.** A contact form, anything with
  auth, anything that has to remember. Then Netlify Functions on Road 2, and
  Road 3 only if there are several.
- **A third person editing it.** The whole argument for Road 1 assumes one
  author who reads the file.

None of those are true today, so the file stays a file.
