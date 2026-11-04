---
title: 'Finished: the server is built, and it purrs'
date: 2026-10-21
summary: The ultra-short 2U case arrived and everything fit. Then I switched it on and heard the fans. Here is the final build, the fan swap, and the one part I would choose differently.
tags: [homelab, self-hosting, hardware]
cover: media/hero.jpg
coverAlt: Top-down view inside an open 2U rackmount chassis, with an ATX power supply at the top left, a Gigabyte micro-ATX motherboard with two Kingston FURY memory sticks and a low-profile Noctua cooler at the right, sleeved black cables between them, and drive cages and two black 80 mm fans along the front edge
draft: false
---

The case from AliExpress arrived, and
[the worry from part two](/blog/the-chassis-did-not-fit-finding-an-ultra-short-2u/)
turned out to be unfounded. Every part went in, the board lined up with the
standoffs, and the lid closed. Then I pressed the power button and the server
sounded like it was trying to take off.

## It went together without a fight

I had braced for a cheap chassis from a seller I knew nothing about to be the
hard part. It was the easy part. The micro-ATX board went straight in, the ATX
power supply bolted into its bay, and the
[Noctua NH-L9i-17xx](https://noctua.at/en/products/nh-l9i-17xx) sat inside
the socket keep-out zone exactly as advertised, clear of the RAM and the PCIe
slot.

The final configuration is the parts list from
[part one](/blog/outgrowing-my-raspberry-pi-a-3u-home-server-parts-list/),
minus the two lines part two replaced: an Intel Core i3-12100 on a GIGABYTE
B760M DS3H DDR4, 16 GB of Kingston FURY, a 1 TB WD_BLACK SN7100 for the OS and
the databases, and the Seasonic CORE GC-750 feeding all of it, inside the
INV2390-B 2U case.

## The fans had to go

The case ships with three 80 mm fans. In the spec table that read as a cooling
win over the 3U I nearly bought. In the room it read as a vacuum cleaner.

The stock fans hang off a Molex adapter chain, which means they get the full
supply voltage and spin at whatever speed that gives them. There is no curve,
no idle and no quiet. For a box whose whole design brief included "quiet enough
to live in a flat", that was a failed requirement on the first boot.

I replaced them with [Noctua NF-A8 PWM](https://noctua.at/en/products/fan/nf-a8-pwm)
fans. Same 80 mm frame, so they drop into the existing mounts, but with a
four-pin PWM connector the speed can follow the load instead of sitting at
maximum. The difference is the whole reason this post has the title it has.
Where the stock fans roared, the server now purrs like a kitten.

:::tip
If a case's fans connect over Molex, budget for replacing them. A fan with no
speed control is only quiet if it is slow at full voltage, and the fans that
ship in cheap rackmount cases rarely are.
:::

## The power supply was the wrong shape of right

The Seasonic was chosen in part one for good reasons: quality capacitors, quiet
at low load, a long warranty, and a standard ATX form factor I could replace
in five years. All of that is still true. What I did not think about was which
way it breathes.

Like most desktop power supplies, the GC-750 pulls air through a fan on its
broad face, a side vent rather than the front or back. In a tower that face
points at open space or a vent in the case floor. Lying flat in a 2U chassis,
it points straight at the lid, with very little room between the two.

Rackmount gear is designed around one airflow direction: in at the front, out
at the back. A power supply that takes its air from the side fights that
design rather than joining it. It fits, in the sense that the screws go in.
It is not a good fit.

The lesson is cheap to apply before you buy and expensive after. When the
chassis is a rack case, check the PSU's airflow path, not just its form factor.

## Two more drives, and a change of plan

Part one planned to start with a single 4 TB WD Red Plus and grow to a
three-disk RAID 5 with `mdadm`, adding drives as money and need allowed.

That plan did not survive. I have decided to go with ZFS instead, and I
ordered two more drives now rather than later, so the array starts life with
all three hot-swap bays filled. Why ZFS, and what it changes, is a story of
its own, and it is the next one.

## The takeaway

Plan for the noise you will hear, not the airflow on the spec sheet. Before you
order a rack case, find out how its fans connect and which way your power
supply breathes. Molex-powered fans and a side-intake PSU both pass every
compatibility check you will think to run, and both show up the moment you
switch the machine on.

Next: why I traded `mdadm` for ZFS before a single byte landed on the array.
