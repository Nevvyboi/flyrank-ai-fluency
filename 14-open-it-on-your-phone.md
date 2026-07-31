# Open It on Your Phone

**AI Fluency, Week 7 | Nevin Tom**

Live: **https://nevvyboi.github.io/**

---

## What "on a phone" means here, precisely

**Real Mobile Safari, on iOS, in the iOS Simulator**, at 402x874 points on an
iPhone 17. Real WebKit, real touch events, real rendering, real address bar
behaviour.

**Not** a physical handset in my hand. What that still leaves untested: the
device outdoors, on a slow mobile connection, on an OLED panel at an angle, and
under an actual thumb rather than a synthesised touch. I checked what a
simulator can check and I am not going to describe it as more than that.

This is a genuine step up from the earlier pass, which was a 375px viewport in a
desktop engine. That checks CSS breakpoints and nothing else.

## The finding

**The demo's verdict colours were inverted against the site's own semantic
pair.**

[The identity kit](04-identity-kit.md) states the rule plainly: green is the
number the system stands behind, amber is the number it hands to a human, and
the pair is never used decoratively.

The live demo had them backwards:

| Verdict | What it means | Was | Should be |
|---|---|---|---|
| Duplicate removed | The detector made a call and acted | **amber** | green |
| Left alone | The detector declined to act | **green** | amber |

So the site was showing "left alone", the case where it refuses, in confident
green, and "duplicate removed", the case where it commits, in caution amber. On
a page whose entire argument is about a system knowing when to answer and when
to abstain, that is the two states of the argument wearing each other's
colours.

**Fixed and deployed:**
[commit](https://github.com/Nevvyboi/Nevvyboi.github.io/commits/main).

### Why the desktop pass missed it

I had looked at that demo repeatedly at desktop width without seeing it, and
there is a reason rather than an excuse.

At desktop width the verdict sits in a narrow right-hand column at 20px, next
to a paragraph of explanation, and reads as a label. Full screen on a phone it
is the largest thing in view with nothing beside it, and it reads as a traffic
light. The mistake did not become visible until the layout stopped giving it
somewhere to hide.

That is the entire argument for this assignment, and I would not have believed
it before doing it.

## What held up

Everything that came out of [the hardening pass](07-break-your-own-site.md)
survived contact with a real browser.

**The slider works with a finger.** This is the one that mattered. It was a
16px target before that pass and is 44px with a 22px thumb now. I dragged it
along the track with a synthesised touch path and the operating point moved,
the numbers went from 98.4% and 20.0% to 98.5% and 50.0%, and the sentence
changed to the one about the curve flattening. A 375px desktop viewport cannot
tell you that; it has no touch.

**The demo takes taps.** The three case buttons wrap onto two rows at this
width and each one registered a tap first time. The textarea is legible at
mono 13px and grows to fit the loaded case.

**No horizontal overflow anywhere** on the full scroll, through six project
entries, the instrument and the demo.

**Body text at 17px with a 26px line height** is comfortable, and the measure
holds at roughly 40 to 50 characters a line rather than running edge to edge.

**Every link is reachable and tappable**, and the nav buttons are 49px after
the padding change.

## Fix log

| | Before | After |
|---|---|---|
| Demo verdict colours | Inverted against the identity kit's semantic pair | Swapped; removed is green, left alone is amber |
| Slider hit area | 16px, from the earlier pass | 44px, and confirmed draggable by touch |
| Nav link height | 41px, from the earlier pass | 49px, confirmed tappable |

Only the first is new here. The other two were fixed by measurement in the
hardening pass and this is the first time they have been confirmed by actually
touching them.

## One thing that is not my bug

On first load, iOS Safari puts its own onboarding bubble ("View Bookmarks,
Share Menu, and Open Tabs") over the lower third of the page, which lands on
top of the hero plot. Nothing I can do about it and worth knowing: a first-time
iOS visitor may meet the site with Safari's chrome sitting on the one thing the
page leads with.

## Still not checked

- A physical device.
- A slow connection. The page is 26 KB with zero external requests so I expect
  it to be fine, and expecting is not measuring.
- Android and Chrome on mobile. WebKit is one engine.
- Dark mode. The site commits to one light palette and does not respond to
  `prefers-color-scheme`, which is a deliberate choice and not a bug, but it
  does mean a dark-mode user gets a bright page.

---

*The measurements this built on: [Break Your Own Site](07-break-your-own-site.md).
The rule the colours broke: [the identity kit](04-identity-kit.md).*
