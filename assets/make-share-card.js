// The share card, built from the site's own tokens and the same operating
// table the hero plots. Nothing on it is decoration: the curve is the run.
//
//   node assets/make-share-card.js
//
// Needs sharp. It is not a dependency of this repo, so this borrows the one
// installed for social-media-studio rather than adding a package.json here.

const fs = require("fs");
const path = require("path");

const sharp = require(path.join(__dirname, "..", "..", "social-media-studio", "node_modules", "sharp"));

const PAPER = "#F6F7F8";
const INK = "#14181C";
const STEEL = "#5C6B78";
const RULE = "#C9D1D7";
const REJECT = "#A9762A";

// outputs/metrics.json, the same six rows the site plots
const POINTS = [
  { cov: 0.5, risk: 0.015 },
  { cov: 0.6, risk: 0.019 },
  { cov: 0.7, risk: 0.016 },
  { cov: 0.8, risk: 0.0162 },
  { cov: 0.9, risk: 0.029 },
  { cov: 1.0, risk: 0.037 },
];

const W = 1200;
const H = 630;
const X0 = 660;
const X1 = 1110;
const Y0 = 470;
const Y1 = 210;
const RMAX = 0.045;

const px = (c) => X0 + ((c - 0.5) / 0.5) * (X1 - X0);
const py = (r) => Y0 - (r / RMAX) * (Y0 - Y1);

const curve = POINTS.map((p, i) => `${i ? "L" : "M"} ${px(p.cov)} ${py(p.risk)}`).join(" ");
const band = `M ${px(0.5)} ${Y0} ${POINTS.map((p) => `L ${px(p.cov)} ${py(p.risk)}`).join(" ")} L ${px(1)} ${Y0} Z`;

const svg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${W}" height="${H}" fill="${PAPER}"/>
  <line x1="72" y1="104" x2="${W - 72}" y2="104" stroke="${RULE}" stroke-width="1"/>
  <text x="72" y="92" font-family="Helvetica, Arial, sans-serif" font-size="20" font-weight="600"
        letter-spacing="3.2" fill="${INK}">NEVIN TOM</text>
  <text x="${W - 72}" y="92" text-anchor="end" font-family="ui-monospace, Menlo, monospace"
        font-size="16" fill="${STEEL}" letter-spacing="0.6">nevvyboi.github.io</text>

  <text x="72" y="248" font-family="Helvetica, Arial, sans-serif" font-size="52" font-weight="640"
        letter-spacing="-1" fill="${INK}">I build systems</text>
  <text x="72" y="312" font-family="Helvetica, Arial, sans-serif" font-size="52" font-weight="640"
        letter-spacing="-1" fill="${INK}">that know when <tspan fill="${REJECT}">not</tspan></text>
  <text x="72" y="376" font-family="Helvetica, Arial, sans-serif" font-size="52" font-weight="640"
        letter-spacing="-1" fill="${INK}">to trust themselves.</text>

  <text x="72" y="446" font-family="ui-monospace, Menlo, monospace" font-size="17" fill="${STEEL}"
        letter-spacing="0.4">3.7% error answering everything</text>
  <text x="72" y="476" font-family="ui-monospace, Menlo, monospace" font-size="17" fill="${STEEL}"
        letter-spacing="0.4">1.6% holding back the least certain fifth</text>

  <line x1="${X0}" y1="${Y0}" x2="${X1 + 30}" y2="${Y0}" stroke="${RULE}" stroke-width="1"/>
  <line x1="${X0}" y1="${Y1 - 30}" x2="${X0}" y2="${Y0}" stroke="${RULE}" stroke-width="1"/>
  <path d="${band}" fill="${REJECT}" opacity="0.09"/>
  <path d="${curve}" fill="none" stroke="${INK}" stroke-width="2.5"/>
  <circle cx="${px(0.8)}" cy="${py(0.0162)}" r="9" fill="${REJECT}" stroke="${PAPER}" stroke-width="4"/>
  <text x="${X0}" y="${Y0 + 26}" font-family="ui-monospace, Menlo, monospace" font-size="14"
        fill="${STEEL}" letter-spacing="1.2">COVERAGE 50%</text>
  <text x="${X1 + 30}" y="${Y0 + 26}" text-anchor="end" font-family="ui-monospace, Menlo, monospace"
        font-size="14" fill="${STEEL}" letter-spacing="1.2">100%</text>
  <text x="${X0}" y="${Y1 - 44}" font-family="ui-monospace, Menlo, monospace" font-size="14"
        fill="${STEEL}" letter-spacing="1.2">RISK</text>

  <line x1="72" y1="${H - 76}" x2="${W - 72}" y2="${H - 76}" stroke="${RULE}" stroke-width="1"/>
  <text x="72" y="${H - 44}" font-family="ui-monospace, Menlo, monospace" font-size="15" fill="${STEEL}"
        letter-spacing="0.4">Figures from a real run, not illustrative.</text>
</svg>`;

const out = path.join(__dirname, "..", "..", "flyrank-pf04", "site", "share-card.png");

sharp(Buffer.from(svg))
  .png({ compressionLevel: 9 })
  .toFile(out)
  .then((info) => console.log(`wrote ${out}, ${info.width}x${info.height}, ${Math.round(info.size / 1024)} KB`))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
