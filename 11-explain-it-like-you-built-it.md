# Explain It Like You Built It

**AI Fluency, Week 6 | Nevin Tom**

---

## The piece I picked

**How the curve on my front page gets drawn.**

I picked it because it is the part I understood least well while writing it. I
had the six measurements, I knew I wanted a line, and I got a working plot
faster than I got an understanding of why it worked. For a while the two
functions at the heart of it were things I had written and could not have
explained to anyone, which is exactly the gap this assignment is about.

Here is the explanation, for a friend who has never built a site.

---

## Start with the problem

I have six measurements from a real run of my defect inspector. Each one is a
pair of numbers:

```
answers 100% of parts  →  wrong on 3.7% of them
answers  90%           →  wrong on 2.9%
answers  80%           →  wrong on 1.62%
answers  70%           →  wrong on 1.6%
answers  60%           →  wrong on 1.9%
answers  50%           →  wrong on 1.5%
```

I want a line on the page that shows this shape, and a dot on that line that
moves when you drag a slider.

## The thing I did not understand at first

A picture on a web page does not have to be a picture.

I assumed a chart meant making an image somewhere else and putting the image on
the page. It does not. There is a kind of drawing browsers do natively, called
SVG, where instead of sending pixels you send **instructions**: put a line from
here to here, put a circle at this spot. The browser follows the instructions
and draws it, at whatever size and sharpness the screen has.

So the chart is not a photograph of my data. It is a set of directions, and I
can write those directions with code while the page is loading.

## The one genuinely confusing part: two different grids

This is the bit that took the longest, and it is the whole trick.

My numbers live on one grid. Coverage runs from 0.5 to 1.0. Risk runs from 0
to about 0.045.

The drawing lives on a completely different grid, measured in the drawing's own
units, where the left edge of my plot is at 52 and the right edge is at 400,
and, **counterintuitively, the top is 40 and the bottom is 248.**

That last part is what confused me. In the drawing, y counts *downwards*. Zero
is the top of the picture, and bigger numbers are further down the page. On a
graph, up means more. So the two grids disagree about which way is up.

Everything else is just converting between the two grids. Two small functions
do it:

```js
function px(c){ return X0 + ((c - 0.5) / 0.5) * (X1 - X0); }
function py(r){ return Y0 - (r / RMAX) * (Y0 - Y1); }
```

**`px` turns a coverage into a horizontal position.** Take the coverage, work
out how far along the range from 0.5 to 1.0 it sits, as a fraction. Coverage
0.5 gives a fraction of 0, coverage 1.0 gives 1, coverage 0.75 gives 0.5. Then
walk that fraction of the way across the plot's width, starting from the left
edge.

**`py` turns a risk into a vertical position**, and it is the same idea with one
difference: it **subtracts**. It starts at the bottom edge and moves *up* by
the right fraction, because in the drawing's grid, moving up means getting
smaller. That minus sign is the entire reason my first attempt came out
upside down, with the good results at the top and the bad results at the bottom.

## Then the line is just a sentence

An SVG line is described by a string that reads almost like directions:

```
M 52 243   L 121 240   L 191 240   ...
```

`M` means move here without drawing. `L` means draw a line to here. So the code
walks through my six measurements, converts each pair with `px` and `py`, and
glues the results into one long string. The first point gets `M`, every point
after it gets `L`. Then it hands the finished string to the browser and the line
appears.

The shaded area underneath is the same string with two extra instructions: go
down to the bottom edge, then back to where you started, then close the shape.
Once a path returns to its own start it encloses an area, and the browser fills
it.

## The slider is the easy part

The slider is an ordinary form control with six positions. When you move it, a
function runs. It looks up which of the six measurements you landed on, calls
`px` and `py` on that pair to get a position, and moves the dot there. Then it
rewrites the two big numbers and the sentence underneath.

That is genuinely all it is. The reason the chart feels alive is not that the
slider is clever, it is that the same two conversion functions are used for
drawing the line and for placing the dot, so the dot cannot land anywhere the
line is not.

## What I got wrong while building it

**The upside-down plot.** My first version had `py` adding instead of
subtracting, so the shape was inverted. It looked plausible, which is what made
it slow to spot. I only caught it by checking a value I knew: 100% coverage has
the worst risk, so its dot has to sit highest on the graph, and it was sitting
lowest.

**Hard-coded numbers.** In the first version I worked out the six positions
myself and typed them in. It drew the right picture and it was the wrong thing
to do, because the numbers on the page were then a copy of my data rather than
my data. Change a measurement and the plot would keep showing the old shape,
silently. Now the six pairs sit in one array and the path is computed from
them at load time, so the picture cannot disagree with the numbers.

That mattered more than it looks. The site's whole claim is that its figures
are real, and a reader who presses view-source can now find the array and check
that the curve came from it.

## The one-sentence version

The chart is a list of drawing instructions that the browser follows, and my
code writes those instructions by converting each measurement from the grid the
data lives on to the grid the picture lives on, remembering that pictures count
downwards and graphs count upwards.

---

*The file: [index.html](https://github.com/Nevvyboi/Nevvyboi.github.io/blob/main/index.html),
the plot is the `<svg>` near the top and the script at the bottom.*
