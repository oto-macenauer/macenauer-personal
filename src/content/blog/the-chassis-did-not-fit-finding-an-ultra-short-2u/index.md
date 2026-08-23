---
title: 'The chassis did not fit: finding an ultra-short 2U'
date: 2026-08-23
summary: I published a parts list three days ago. Then I measured the rack, and two lines of that list turned out to be wrong — the chassis and the cooler.
tags: [homelab, self-hosting, hardware]
cover: media/hero.jpg
coverAlt: Black 2U rackmount server chassis at a three-quarter angle, with three hot-swap drive bays and blue latches at the left of the front panel, a perforated ventilation panel across the center, and rack-mounting ears with handles at each side
draft: false
---

I published [the parts list for this build](/blog/outgrowing-my-raspberry-pi-a-3u-home-server-parts-list/)
three days ago. Then I checked the depth of the rack it was going into.

It is a 12U Datacom wall cabinet — 440 mm deep on the outside, with a maximum
recommended usable depth of 390 mm. The Inter-Tech 3U-3508 I had picked is
528 mm deep. I was 138 mm out, and two lines of a parts list I had just
published in public were wrong.

## The measurement I did not take

Everything else about that build I checked obsessively. Socket compatibility,
cooler clearance inside the chassis, whether the PSU was a standard ATX unit,
whether the board was mATX, how many drives the bays would take in five years.

I never checked whether the box fits the hole.

It is the dumbest possible failure mode, and it is common because rack depth is
the dimension nobody leads with. Cases are sold by height — 1U, 2U, 3U — and
that number says nothing about the axis that stopped me. A wall-mount cabinet of
the kind that fits in a flat gives you under 400 mm to play with. Full-depth
chassis assume a datacenter cabinet.

The good news is that I caught it before ordering. The chassis was the one part
I had not yet paid for.

## Short-depth cases barely exist

I assumed this would be a filtering problem. Set depth under 390 mm, take
whatever comes back.

Almost nothing comes back. Short-depth rackmount cases are a genuine niche, and
most of the ones that exist are built for network gear and small ITX boards —
no room for an mATX motherboard, often no room for a standard ATX power supply
either. Insist on both and the list from mainstream European retailers gets
very close to empty. The manufacturers who do build them sell into industrial
and telecom channels that do not involve me buying one.

So I ended up on AliExpress.

## What I actually ordered

An [ultra-short 2U case, model INV2390-B](https://www.aliexpress.com/item/1005005962683223.html)
— no brand I recognize, a listing title that reads like a keyword dump, and
exactly the specification I needed.

| Spec | Value | Why it matters |
| --- | --- | --- |
| Dimensions (W×D×H) | 482 × 390 × 89 mm | Depth is exactly the rack's 390 mm usable maximum |
| Motherboard | Micro ATX, 245 × 245 mm | The B760M DS3H drops straight in |
| Power supply | Standard ATX | The Seasonic CORE GC-750 survives the redesign |
| Hot-swap bays | 3 × 3.5"/2.5" | Exactly the three-disk RAID 5 I had planned |
| Internal bays | 4 × 3.5" | Growth room, without hot-swap |
| Expansion slots | 4 × half-height | Low-profile cards only |
| Cooling | Three 80 mm fans | Two chassis, one on the rear of the hot-swap cage |
| Material | 1.2 mm zinc-coated SGCC steel | Not the flexing sheet metal I feared |

Every constraint that drove the original build survives. The ATX power supply
still fits, which was the reason I went 3U in the first place. The motherboard
still fits. The three hot-swap bays hold precisely the
[three-disk RAID 5 I had planned](/blog/outgrowing-my-raspberry-pi-a-3u-home-server-parts-list/#storage-start-small-grow-live),
and four more internal 3.5" positions sit behind them, so the ten-year storage
path is mostly intact.

What I lost is hot-swap: eight bays on two backplanes become three, with the
rest needing a shutdown to touch. The slots drop from five full-height to four
half-height, so an HBA would have to be low-profile.

The cooling is not a loss, which surprised me. I had assumed 2U meant smaller,
faster, louder fans. The Inter-Tech ships two 80 mm fans. This ships three —
same size, one more of them, with the extra sitting behind the hot-swap cage.

Nor did it save money. The case is US $100.43 and shipping is US $106.81 —
freight is 52% of the bill and costs more than the product. Total US $207.24,
about 4 275 Kč, against 4 426 Kč for the Inter-Tech I did not buy. Importing an
obscure case from the other side of the world came out 151 Kč cheaper, close
enough to identical that price never entered the decision. Only the 138 mm did.

:::warn
390 mm of case in 390 mm of usable depth is not clearance, it is a tie. Nothing
is left for the bend radius of a power cable behind the chassis. The rack's
rails are depth-adjustable and its cable cutouts are top and bottom rather than
rear, so I think this works — but "I think" is doing real work in that sentence,
and I will not know until the case is in the cabinet.
:::

## The cooler went with it

The NH-L9x65 is 65 mm tall. That was fine in a 3U rated for 100 mm of cooler
clearance. A 2U is 89 mm of external height in total — chassis floor, board
standoffs, cooler, lid — so it is not.

So the cooler changed too, to a
[Noctua NH-L9i-17xx](https://noctua.at/en/products/nh-l9i-17xx) — 37 mm tall,
95×95 mm, sized to sit inside the LGA1700 socket keep-out zone so it fouls
neither the RAM nor the first PCIe slot. It is the cooler you buy when height
has stopped being a preference and become a hard wall.

The trade is real and I do not love it. A 23 mm heatsink under a 14 mm fan has
far less thermal mass than four heatpipes. It will hold the i3-12100, a 60 W
part, but it will spin faster to do it — on top of the three 80 mm fans already
in the case.

Whether any of it is actually good, I have no idea. It ships from China, from a
seller I know nothing about, against a spec sheet I am taking on trust. The
listing also carries an AI-written summary claiming the case supports RGB
lighting, which I am confident is invented — nothing in the manufacturer's own
specification mentions it. I am reading the spec table and ignoring the prose.

## The takeaway

Check the rack before you choose anything that goes in it, and check the right
number. Not the height, not the external depth — the maximum usable depth,
which on my cabinet is 50 mm less than the figure printed on the box. That one
line in a spec sheet invalidates a build silently, while every case listing
shouts about U height.

If your rack is short, work outward from the case: pick the chassis that
physically fits, then the board, cooler and PSU that fit inside it. I did it in
the other order and got away with it only because one box had not shipped.

Next: whether any of this actually arrives in one piece.
