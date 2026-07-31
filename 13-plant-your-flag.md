# Plant Your Flag: Domain, Analytics, Badge

**AI Fluency, Week 9 | Nevin Tom**

Live: **https://nevvyboi.github.io/**

---

## Honest status first

This assignment has four parts. Two are done and verified, one is a deliberate
refusal with reasoning, and one is blocked on something that does not exist yet.

| Part | Status |
|---|---|
| Custom domain, or a clean free subdomain | **Free subdomain, live over HTTPS** |
| Launch hygiene: share preview, favicon, titles | **Done and verified** |
| Free analytics installed | **Deliberately not installed.** Reasoning below |
| FlyRank graduate badge in the footer | **Blocked.** There is no verification page to link to yet |

---

## The address

`nevvyboi.github.io`. The brief allows a clean free subdomain as a fallback
when budget is truly zero, and mine is: the whole build has cost nothing, which
is one of the four constraints in [Three Roads](10-three-roads.md).

I am also not going to buy a domain on somebody else's behalf, and it is worth
saying plainly rather than dressing it up as a principled stand about
minimalism. A personal domain is a genuinely better answer here and it is a
purchase, so it is a decision for the person whose name is on it.

**Verified live:**

```
$ curl -sI https://nevvyboi.github.io/
HTTP/2 200
strict-transport-security: max-age=31556952

$ curl -sI http://nevvyboi.github.io/
301 → https://nevvyboi.github.io/
```

**If a domain is bought later**, the migration is already written up: the
[DNS walkthrough](https://github.com/Nevvyboi/flyrank-pf04) from PF-04 covers
the CNAME, the resolver walk, TTLs, and the certificate step people forget.
Nothing about the site itself changes. A custom domain is a pointer, not a
migration.

## Launch hygiene, verified rather than assumed

Every one of these was checked against the deployed page, not the local file.

```
<title>Nevin Tom, AI engineering</title>
rel="canonical"
rel="icon"
property="og:title"  content="Nevin Tom, AI engineering"
property="og:image"  content="https://nevvyboi.github.io/share-card.png"
name="twitter:card"  content="summary_large_image"

share card: 200, 47,696 bytes, image/png
```

All of it came out of [the hardening pass](07-break-your-own-site.md), where
the finding was that the site had **no favicon at all** and **no share preview
at all**, so every link pasted anywhere rendered as a grey rectangle and
`/favicon.ico` returned 404 on every visit.

The favicon is an inline `data:` URI so it costs no request. The share card is
generated from the site's own colour tokens and the same six operating points
the hero plots, so it is a picture of the run rather than a picture of nothing.

## Analytics: deliberately not installed

This is the part where I am refusing something the brief asks for, so here is
the reasoning rather than a shrug.

**The footer of my site says: "Built by hand. No frameworks, no fonts loaded,
no analytics."** That sentence is checkable in view-source, and the entire
argument of the site is that its claims are true and verifiable. Installing an
analytics script would make my own footer a lie, on a portfolio whose thesis is
about honest measurement. That is a worse outcome than not knowing my visitor
count.

It also costs the visitor something real. Every analytics script is a request
to a third party, a cookie question, and a record of a stranger's reading habits
kept somewhere they did not choose. The site currently makes **zero external
requests**, which means a visitor's browser tells nobody they were here. I would
rather keep that than have a dashboard.

**What I use instead.** GitHub already records traffic to the repository the
site is served from, without a script, without a cookie, and without the
visitor's browser contacting a third party:

```
$ gh api repos/Nevvyboi/Nevvyboi.github.io/traffic/views
views (14 days): 0 | unique: 0
```

**Zero, and it should be.** The site went live a matter of hours before this was
written and is not linked from anywhere yet. Reporting a real zero is more use
to me than a number I would have had to install a tracker to get, and it names
the actual problem: the site has no inbound links, which is the [content map's
"still to gather"](06-through-line-content-map.md) item about linking it from
LinkedIn and the CV.

**If this reasoning is judged insufficient**, the honest alternative is a
privacy-preserving, cookieless analytics service, all of which need an account I
would have to create on someone else's behalf. That is the same wall as the
domain purchase, and the same answer: it is a decision for the person whose site
it is.

## The graduate badge

**Blocked, and not on anything I can work around.**

The brief asks for the FlyRank graduate badge in the footer, linking to a
verification page. Both tracks are currently at "capstone in review", so there
is no certificate and therefore no verification page for the badge to point at.

Installing a graduate badge before graduating would be a false claim in the
footer of a site whose footer I have just spent several paragraphs refusing to
make false. It goes in the day a certificate is issued, and the site's README
already carries a queue of pending changes for exactly this kind of thing.

## What I did not do

**Open the final address on a phone once more.** The brief asks for it and I
cannot. A 375px viewport in a desktop engine is not a handset, and the iOS
Simulator, which runs genuine Mobile Safari, is blocked on an Xcode
configuration change on this machine that needs a password I do not have:

```
sudo xcode-select -s /Applications/Xcode.app/Contents/Developer
```

Same gap as [Empty but Live](12-empty-but-live.md), same honest description:
checked at mobile width, not opened on a phone.

---

## Summary

Live over HTTPS on a free subdomain with the insecure address redirecting.
Share preview, favicon, canonical URL and titles all correct and verified on the
deployed page. Analytics deliberately absent, with GitHub's own traffic data
used instead, because a tracker would make my footer false and cost my visitors
their privacy for a number I can get another way. Badge pending a certificate
that does not exist yet.
