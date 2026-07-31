# Break Your Own Site

**AI Fluency, Week 9 | Nevin Tom**

Live: **https://nevvyboi.github.io/**
Fixes: [commit `9abe1fa`](https://github.com/Nevvyboi/Nevvyboi.github.io/commit/9abe1fa)

---

## What I did

Went looking for breakage rather than reading the code and deciding it was
fine. Clicked every link including the ones I added last, measured every colour
pair rather than eyeballing them, loaded the page at 375px and asked the
browser for the real size of every tappable thing, drove the one interactive
control with a keyboard, and checked what the page looks like to a machine
rather than to me.

Eleven findings. Seven fixed, four kept as known limitations with reasons.

---

## Fixed

### 1. The slider was a 16px target on a phone

The one thing on this page a visitor is meant to touch, and the browser
reported its hit area as **16px tall**. WCAG 2.5.8 asks for 24px, and every
platform guideline says 44. On a phone it is a line you have to hunt for.

Worse than a normal missed target, because the entire argument of the site is
carried by dragging that slider. A visitor who cannot grab it does not get a
worse experience, they get no argument.

**Fix:** 44px hit area with a 22px thumb, while the track stays 4px so it does
not become the loudest object on the page. Measured after: **44px**.

### 2. Moving the slider announced nothing

Dragging it changes two large numbers and a whole sentence, and every one of
those updates happened silently. A screen reader user moving that control heard
"3 of 5" and nothing else, so the site's one interactive feature was decorative
to them.

This is the finding I am least comfortable about. I had already given the SVG a
descriptive `aria-label` and put a `<label>` on the input, which is exactly
enough accessibility work to feel finished while leaving the actual interaction
mute.

**Fix:** the readout is a `aria-live="polite"` region, so the numbers and the
sentence are announced as they change. And the input carries an
`aria-valuetext` that says what the system does rather than where the widget
is:

```
answering 80% of parts, 98.4% accurate on those
```

rather than "3".

### 3. No favicon at all

`/favicon.ico` returned 404 on every single visit, and the tab showed a blank
sheet.

**Fix:** an inline `data:` URI SVG, four lines, drawing the same curve the page
plots. Inline rather than a file because the footer claims this page loads
nothing, and a favicon file would be a request and would make that claim false.

**Precisely what changed:** browsers now get an icon and never ask for
`/favicon.ico`. A direct request to that path still returns 404, because there
is still no file there. The behaviour is fixed; the path is not, and saying
"fixed the 404" would be describing a thing I did not do.

### 4. No share preview

No Open Graph tags, no Twitter card, no image. Every link to this site pasted
into Slack, LinkedIn or a message rendered as a grey rectangle with a URL. The
largest gap between how the site reads and how it travels, and invisible from
inside the site.

**Fix:** `og:type`, `og:url`, `og:title`, `og:description`, `og:image`,
`og:image:alt`, `twitter:card`, plus a canonical URL and a `theme-color`. The
share card is 1200x630, generated from the same six operating points the hero
plots and the same six colour tokens, so it is a picture of the run rather than
a picture of nothing.

### 5. A link that would have shipped a 404, pointing at a private document

My working copy had an uncommitted `<a href="/cv.pdf">CV (PDF)</a>` that the
deployed repository has no file for. Two problems in one line: the link would
have 404'd, and the PDF behind it carries an ID number and a mobile number.

**Fix:** the link is gone and the PDF is not deployed. Caught before it
shipped, which is the only reason this is a small entry rather than the whole
document.

### 6. Nav links at 41px

LinkedIn, GitHub and Email measured 41px tall against the 44 guidance. Close
enough to look right and not close enough to count.

**Fix:** padding from `10px 15px` to `14px 18px`. Measured after: **49px**.

### 7. The amber was undocumented and one edit from failing

`--reject` `#A9762A` measures **3.95:1** on white. That passes AA for large
text and fails for body text, and I did not know which side of the line it was
on until I computed it.

It happens to be used only at 30px and above, so the site is compliant by
accident. Two options: darken it until it passes everywhere, or keep it and
constrain it. I kept it, because at a passing ratio it goes brown and stops
reading as a caution, and the entire job of that colour is to say "hand this to
a human".

**Fix:** the constraint is now a comment above the token, so the next person to
reach for it for a paragraph, including me, is told first.

---

## Known limitations, not fixed

### `--rule` measures 1.44:1

`#C9D1D7` on paper is far below any text threshold. It is used exclusively for
decorative hairlines between sections and never for text or for the boundary of
an interactive control, which is where WCAG's 3:1 non-text requirement would
apply. Raising it would make the page louder to fix a problem it does not have.

### No sitemap.xml or robots.txt

One page, no crawl traps, linked from GitHub and LinkedIn. A sitemap listing a
single URL is ceremony. Revisit if the site ever gets a second page.

### No custom 404 page

GitHub Pages serves its own, which is functional and says nothing. A custom one
is a nice-to-have on a single-page site where the only way to reach a 404 is to
type a path by hand.

### LinkedIn returns HTTP 999 to automated checks

An automated link check reports `999` for `linkedin.com/in/nevtom`, which is
LinkedIn refusing bots rather than a dead link. Verified by hand in a browser.
Recording it so a future check does not "fix" a link that was never broken.

---

## Findability and speed

| | |
|---|---|
| HTML | 16,516 bytes |
| Time to first byte | 0.56s |
| Total load | 0.57s |
| Share card | 47,696 bytes, loaded only by crawlers |
| **External requests** | **0** |
| Fonts, frameworks, analytics, trackers | none |

There is no optimisation to do here, and that is the result of one decision
made early rather than a tuning pass: no webfont, no framework, no analytics,
one file. The share card is the only binary asset and no visitor's browser ever
fetches it.

Searching my own name plus "github" surfaces the GitHub profile, and the site
is now linked from it. The site itself is new enough not to rank, which is what
the canonical URL and the Open Graph tags are for: most people will arrive from
a link somebody pasted, not from a search.

## Responsive check, and what I did not do

Measured at 375x812 in a real browser engine:

- horizontal overflow: **0px**
- elements past the right edge: **none**
- body text 17px, line height 26.35px
- every tappable thing at or above 44px after the fixes

**I did not open it on a physical phone.** A 375px viewport in a desktop engine
is not an iPhone: it does not test the real touch target, Safari's rendering,
the address bar eating viewport height, or how the amber looks on an OLED
screen outdoors. What I checked, I checked properly; what I did not check, I am
not going to imply I did.

---

## What this pass actually taught me

Every one of the seven fixes was invisible from inside the code. The slider
looked fine because I have a mouse. The live region was missing because I was
reading the page rather than listening to it. The share card was absent because
I never pasted my own link anywhere. The `/cv.pdf` link looked correct because
the file exists on my disk.

The finding I would keep if I could only keep one is the live region, because
it is the one where I had already done the accessibility-shaped work, the
`aria-label` and the `<label>`, and stopped at the point where it felt done.
Feeling done is not a measurement, which is the same argument the rest of this
site makes about models.

---

*The favicon and the amber constraint: [the identity kit](04-identity-kit.md).
The share card: [curating the images](05-curate-your-images.md).*
