# Decide Once: the Identity Kit

**AI Fluency, Week 3 | Nevin Tom**

Live: **https://nevvyboi.github.io/**

---

## Type

| Role | Family | Why |
|---|---|---|
| Headings and body | `system-ui, -apple-system, "Segoe UI", Helvetica, Arial, sans-serif` | Already on the reader's device. Zero bytes, zero requests, no flash of unstyled text. |
| Data, labels, axes | `ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace` | Every number on this site is a measurement. Monospace says so before the reader has read it. |

Two families. Neither is downloaded.

This is a real constraint and not a shortcut. The footer of the site claims it
loads nothing: no frameworks, no fonts, no analytics. A webfont would be one
network request and would make that sentence false, and a portfolio arguing for
honest measurement cannot have a false claim in its own footer. So the type
choice was settled by the claim rather than by taste.

What I give up: the site looks like the operating system it is read on rather
than like a designed object. That is the trade, made knowingly. The
distinctiveness has to come from the plot and the layout instead, which is
where I would rather spend it anyway.

The two families do different jobs and never swap. Sans for anything a human
wrote. Mono for anything a machine measured. A reader can tell which is which
without being told.

## Palette

| Token | Hex | Job |
|---|---|---|
| `--paper` | `#F6F7F8` | Background. Off white, so the plot's white card lifts off it. |
| `--ink` | `#14181C` | Text and the curve itself. Near black, not black. |
| `--steel` | `#5C6B78` | Secondary text, axis labels, captions. |
| `--rule` | `#C9D1D7` | Hairlines and borders. Structure, never text. |
| `--accept` | `#1F7A5A` | The number the system stands behind. |
| `--reject` | `#A9762A` | The number it hands to a human. |

Four structural colours and one semantic pair.

`--accept` and `--reject` are not decoration and not a second and third accent.
They are the argument. Green is what the system will answer, amber is what it
refuses to answer, and they appear together in the readout, on the curve, and
in the one italicised word of the headline. If you removed them the page would
still be legible and would have stopped saying anything.

**Contrast, measured rather than assumed:**

| Pair | Ratio | Verdict |
|---|---|---|
| `--ink` on `--paper` | 16.63:1 | AA and AAA for all text |
| `--steel` on `--paper` | 5.11:1 | AA for all text |
| `--steel` on white | 5.48:1 | AA for all text |
| `--accept` on white | 5.26:1 | AA for all text |
| `--reject` on white | **3.95:1** | **AA for large text only, fails as body text** |
| `--rule` on `--paper` | 1.44:1 | Decorative hairline, not text, not a control boundary |

The amber is the interesting row. It passes as large text and fails as body
text, and I did not know that until I measured it. It happens to be used only
at 30px and above, so the site is compliant by accident rather than by
decision. That accident is now written into the stylesheet as a comment above
the token, so the next person to reach for it, including me in six months, is
told before they use it for a paragraph.

Two options were on the table: darken the amber until it passes everywhere, or
keep the colour and constrain its use. I kept it, because at a passing ratio it
goes brown and stops reading as a caution, and the whole point of the colour is
that it means "hand this to a human".

## The mark

A favicon rather than a logo. Sixteen pixels of the same curve the page plots:
flat while coverage is low, rising as the system answers everything, with the
amber dot at the operating point.

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" fill="#F6F7F8"/>
  <path d="M4 22 L11 21 L18 21.5 L25 10" fill="none" stroke="#14181C"
        stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="18" cy="21.5" r="3.4" fill="#A9762A"/>
</svg>
```

It ships as an inline `data:` URI, so it costs no request and the footer's
claim survives. A monogram was the obvious alternative and I did not use one:
initials tell a reader who I am, and this tells them what I do, in a tab strip
where they will see it before they see anything else.

Before this pass the site had no favicon at all, so `/favicon.ico` returned 404
on every visit. That was found by
[trying to break the site](07-break-your-own-site.md), not by looking at it.

## Style note

> Sans for anything a human wrote, mono for anything a machine measured. Off
> white paper, near black ink, one hairline grey, and a green and amber pair
> that mean accepted and rejected and are never used decoratively.

That is the standing instruction. Everything on the site inherits it, and so
does the share card, which is generated from the same six tokens and the same
six rows of `metrics.json` the hero plots.

## What this rules out

A kit is only worth having if it forbids things:

- No webfont, ever, while the footer claims the page loads nothing.
- No amber body text.
- No third accent colour. If something needs to stand out and is neither
  accepted nor rejected, it uses weight or space, not hue.
- No gradients, no shadows, no rounded corners on anything structural. The page
  is laid out like a calibration report because that is what it contains.
- No colour used decoratively. Every non-neutral pixel on the page is carrying
  a meaning that is defined in this table.

---

*The share card and the rest of the image set:
[curate your images](05-curate-your-images.md). The audit that found the missing
favicon: [break your own site](07-break-your-own-site.md).*
