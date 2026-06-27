---
title: 'SMD Rework Basics: Hot Air and Reflow Soldering Explained'
seoTitle: 'SMD Rework: Hot Air & Reflow Basics'
description: 'An introduction to surface-mount rework: how hot air rework stations and reflow work, when you need them, and how to remove and replace SMD components.'
pubDate: 2026-06-23
updatedDate: 2026-06-23
category: 'Technique'
heroImage: '/images/guides/smd-rework-hot-air-and-reflow.jpg'
relatedProducts:
  - towot-solder-wick-flux-kit
  - banria-color-recognition-soldering-kit
  - gikfun-smd-smt-welding-practice-board-ek7028
faqs:
  - question: 'Do I need a hot air station for SMD work?'
    answer: 'For hand-soldering individual surface-mount parts with legs, a fine-tipped iron, flux and wick are often enough. A hot air rework station becomes essential for removing or fitting leadless parts (QFN, BGA) and multi-pin chips where you need to heat all the joints at once.'
  - question: 'What is the difference between soldering and reflow?'
    answer: 'Hand-soldering heats one joint at a time with an iron. Reflow heats the whole board (or a region) so solder paste melts on all joints simultaneously — using a hot air station, a hot plate, or a reflow oven. Reflow is how surface-mount boards are assembled at scale.'
  - question: 'Can a beginner learn SMD soldering?'
    answer: 'Yes. Start with larger surface-mount parts (0805 resistors, SOIC chips) on a practice board using just a fine iron, flux and wick. The technique — flux, tack one corner, solder the rest, wick away bridges — is very learnable before you ever touch hot air.'
---

Surface-mount (SMD/SMT) components are everywhere in modern electronics: tiny, leadless, packed tight. Working with them feels like a different craft from through-hole soldering, but the fundamentals carry over — and you can go a long way before you need any special equipment.

## Hand-soldering vs reflow

There are two broad ways to solder surface-mount parts:

- **Hand-soldering** heats one joint at a time with a fine-tipped iron, just like through-hole — it works well for parts with accessible legs (resistors, capacitors, SOIC chips).
- **Reflow** applies solder *paste* to the pads, places the parts on top, then heats everything at once until the paste melts and every joint forms simultaneously. This is how factories build boards, and how you handle leadless parts that an iron cannot reach.

For learning, start with hand-soldering. You can solder a surprising amount of surface-mount work with nothing more than a fine iron, [flux and wick](/reviews/towot-solder-wick-flux-kit), and a [practice board](/reviews/gikfun-smd-smt-welding-practice-board-ek7028).

## Hand-soldering an SMD part

The technique that makes SMD click for most people:

1. **Add flux** to the pads — surface-mount work needs far more flux than solder wire carries.
2. **Tin one pad** with a little solder.
3. **Tack one corner** — hold the part in place with tweezers and reflow that one tinned pad to anchor it.
4. **Solder the remaining pins.** Drag-soldering or one pin at a time both work; flux keeps it flowing.
5. **Wick away any bridges.** If two pins join, lay desoldering braid over them and lift the excess.

It is fiddlier than through-hole, but a [magnifier and helping hands](/guides/helping-hands-and-pcb-holders) and good flux make it very approachable. Practising on a [dedicated SMD board](/best-soldering-practice-kits) builds the steady hand it needs.

## When you need hot air

A **hot air rework station** blows a controlled stream of hot air to heat all of a part's joints at once. You need it when an iron simply cannot reach the joints:

- **Removing multi-pin chips** without damaging the board — heat all the legs together and lift the part off.
- **Leadless packages (QFN, DFN)** whose pads are underneath the body.
- **BGA work** — though ball-grid arrays are an advanced topic in their own right.

Hot air also makes removing and replacing parts dramatically faster than struggling with an iron and wick.

## Reflow on a budget

You do not need an industrial oven to try reflow. Hobbyists use:

- **A hot air station** to reflow a small area or a single part.
- **A hot plate** to heat a whole small board from below until the paste melts.
- **Dedicated mini reflow ovens** for repeatable, whole-board runs.

All rely on the same idea: solder paste plus even heat equals every joint forming at once.

## Where to start

Do not buy a hot air station on day one. Learn clean through-hole joints first, then practise [hand-soldering larger SMD parts](/guides/through-hole-vs-surface-mount-soldering) with flux and wick on a cheap board. Add hot air when your projects genuinely call for leadless parts. By then the fundamentals — flux, heat control, patience — will already be second nature.
