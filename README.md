# flyrank-ai-fluency

Deliverables for eight AI Fluency assignments on the FlyRank internship.

Everything here is about one live site, **https://nevvyboi.github.io/**, and
the work behind it. Nothing in this repository describes a plan for a site that
does not exist: the audit lists findings from the deployed page, the identity
kit documents tokens that are in the stylesheet, and the reminder is a
scheduled workflow that has already fired once.

| | Assignment | Deliverable |
|---|---|---|
| 1 | What Are You Proving? | [proof statement](01-what-are-you-proving.md), and the five rounds it survived |
| 2 | The Prompt Ladder | [v0 to v5](02-the-prompt-ladder.md), scored against six requirements from shipped code |
| 3 | Frame It as Cases | [voice card and three case studies](03-frame-it-as-cases.md) |
| 4 | Decide Once: Identity Kit | [type, palette, mark, style note](04-identity-kit.md), with measured contrast |
| 5 | Kill Your Darlings: Curate Your Images | [the keepers, and what was rejected](05-curate-your-images.md) |
| 6 | The Through-Line | [one-line claim, content map, what is still missing](06-through-line-content-map.md) |
| 7 | Break Your Own Site | [eleven findings, seven fixed](07-break-your-own-site.md) |
| 8 | The Plan to Keep Building | [how to add the next case, and a reminder that fires](08-the-plan-to-keep-building.md) |
| 9 | Make It Do Something | [a live demo running the real detector](09-make-it-do-something.md), verified against the Python on 998 records |
| 10 | Three Roads | [three stacks, scored against what the choice actually cost](10-three-roads.md) |
| 11 | Explain It Like You Built It | [how the curve on the front page gets drawn](11-explain-it-like-you-built-it.md) |
| 12 | Empty but Live | [the deployment record, and what going public taught me](12-empty-but-live.md) |
| 13 | Plant Your Flag | [address, launch hygiene, and why analytics is deliberately absent](13-plant-your-flag.md) |

## What changed in the world because of these

Not documents about intentions. Things that are now true:

- The site has a favicon, a share card, a canonical URL and Open Graph tags.
  Before this it rendered as a grey rectangle everywhere it was pasted.
- The slider, which carries the site's whole argument, went from a 16px target
  to a 44px one, and now announces itself to a screen reader instead of
  changing two numbers silently.
- A link that would have shipped a 404, pointing at a PDF carrying an ID number
  and a mobile number, was caught before it deployed.
- Two projects built during the internship are on the front page, each with the
  limitation that matters.
- Two real defects in already-shipped retry code were found by the prompt
  ladder and written into that project's README.
- A scheduled workflow opens a "add the next case study" issue every quarter,
  and [issue #1](https://github.com/Nevvyboi/Nevvyboi.github.io/issues/1) is
  open now.
- The site has a live feature: the scraper's de-duplicator, running client side
  on whatever you paste. Porting it caught a bug in the original that no test
  would have found, and both implementations now agree on all 998 records.

## Related repositories

- [Nevvyboi.github.io](https://github.com/Nevvyboi/Nevvyboi.github.io) the site
- [polite-scraper](https://github.com/Nevvyboi/polite-scraper)
- [social-media-studio](https://github.com/Nevvyboi/social-media-studio)

## Assets

`images/` holds the share card, the platform variants the studio's pipeline
emitted, and a screenshot of the task API running.
`assets/make-share-card.js` generates the share card from the site's own colour
tokens and the same six operating points the hero plots.
