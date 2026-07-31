# Empty but Live

**AI Fluency, Week 4 | Nevin Tom**

Live URL: **https://nevvyboi.github.io/**

---

## Stated plainly: this is a record, not a milestone I hit this week

The assignment is to go from nothing to a reachable URL, and it is written for
someone who has not done that yet. I had. The site went live before I opened
this brief, so I am not going to write up a first deployment in the present
tense as though I were nervously watching it for the first time.

What this document is instead: the evidence that the deployment is real and
reachable, taken from the actual record rather than from memory, plus what the
first deploy actually taught me, plus a confirmation on a second device.

## The evidence

**The repository and the first build.** The site is
[Nevvyboi/Nevvyboi.github.io](https://github.com/Nevvyboi/Nevvyboi.github.io),
one HTML file plus a share card. GitHub's own build record shows the first
successful Pages deployment:

```
first pages build: 2026-07-31T08:04:03Z (success)
```

That is not a claim I am making about myself. It is GitHub's log of when the
site first became reachable.

**It is genuinely live, over HTTPS, with the insecure address redirecting:**

```
$ curl -sI https://nevvyboi.github.io/
HTTP/2 200
strict-transport-security: max-age=31556952

$ curl -sI http://nevvyboi.github.io/
301 → https://nevvyboi.github.io/
```

```
$ gh api repos/Nevvyboi/Nevvyboi.github.io/pages
https://nevvyboi.github.io/ | https_enforced: true | status: built
```

**Stack matches the choice.** [Three Roads](10-three-roads.md) chose one
hand-written file on GitHub Pages, and that is exactly what is deployed: no
build step, no framework, no dependencies, 25 KB, zero external requests.

## Confirmed on a second device

The brief asks for this specifically, and it is right to: a URL that works on
the machine that made it has proved almost nothing.

**What I checked and how.** The live site rendered at a 375 by 812 viewport in
a real browser engine: no horizontal overflow, body text at 17px with a 26px
line height, and every tappable element at or above 44px after the fixes in
[the hardening pass](07-break-your-own-site.md).

**What I have not done, said plainly:** opened it on a physical handset. A
375px viewport in a desktop engine is not an iPhone. It does not exercise
Mobile Safari's rendering, the address bar changing the viewport height as you
scroll, real touch targets under a real thumb, or how the amber looks on an
OLED screen outdoors.

I tried to close that gap properly with the iOS Simulator, which runs genuine
Mobile Safari rather than a resized desktop window, and it is blocked on an
Xcode configuration change on this machine that needs a password I do not have:

```
sudo xcode-select -s /Applications/Xcode.app/Contents/Developer
```

Until that runs, "checked at mobile width" is the honest description and
"opened on my phone" is not.

## What the first deploy actually taught me

The useful content of this assignment, in retrospect, is not that a URL exists.
It is the things that only became visible once it was public.

**The gap between "it works" and "it is reachable" is entirely about DNS and
certificates**, and neither is under your control on the timescale you want.
I wrote [a walkthrough of what happens when someone types an
address](https://github.com/Nevvyboi/flyrank-pf04) for the PF-04 assignment
partly because deploying made me realise I could not have explained it.

**A live site has a surface a local file does not.** Every finding in [the
hardening pass](07-break-your-own-site.md) was invisible from inside the code
and only existed because the thing was public: no share preview until someone
pastes the link, no favicon 404 until a browser asks for one, no broken CV link
until the file is not there.

**Deploying is not the hard step, and I would tell anyone starting that.** The
hard step is the one this assignment sets up: having something worth putting at
the URL. The empty page took ten minutes. The six projects each carrying the
limitation that matters took the rest of it.

## What is at the URL now

Not blank. One page: the claim, an interactive risk-coverage curve from a real
run, a live demo of the de-duplicator, six projects each with their limitation,
and one email address.

---

*The stack decision: [Three Roads](10-three-roads.md). What broke once it was
public: [Break Your Own Site](07-break-your-own-site.md).*
