---
heroImage: '/images/guides/how-to-desolder.jpg'
title: 'How to Desolder: Removing Solder and Components Safely'
seoTitle: 'How to Desolder: Wick, Pump, Hot Air & SMD Parts'
description: 'How to desolder: using solder wick and a solder sucker, removing through-hole and SMD components, clearing stubborn holes, and avoiding lifted pads.'
pubDate: 2026-04-05
updatedDate: 2026-09-30
category: 'Technique'
relatedProducts:
  - viralloy-solder-sucker
  - towot-solder-wick-flux-kit
  - wep-882d-hot-air-rework-soldering-station
  - yihua-926-iii-soldering-station
faqs:
  - question: 'What is the best way to remove solder?'
    answer: 'For flat joints and excess solder, desoldering braid (solder wick) is cleanest. For clearing through-holes, a solder sucker (desoldering pump) is faster. Many jobs use both: a pump to remove the bulk, then braid to clean up the rest.'
  - question: 'How do you desolder without damaging the board?'
    answer: 'Use the right temperature, add fresh flux, and do not dwell too long on one spot — prolonged heat lifts pads and traces. Work in short bursts, let the area cool between attempts, and never force a component out while its solder is solid.'
  - question: 'Can you reuse desoldering braid?'
    answer: 'No. Once a section of braid is soaked with solder it is spent — snip it off and use a fresh length. Adding a little flux to the braid helps it wick solder faster.'
  - question: 'Why will the solder not melt when I try to desolder?'
    answer: 'Old joints, lead-free solder and joints connected to ground planes all resist melting. Add fresh flux and a little fresh leaded solder, use a larger tip for more heat transfer, and give the joint a moment longer before using wick or a pump.'
  - question: 'How do you remove a surface-mount component?'
    answer: 'Small two-terminal parts can be lifted by heating both ends alternately — or with two irons — while nudging the part with tweezers. Multi-pin chips are best removed with hot air, or by flooding the pins with solder and flux so they all melt together.'
  - question: 'What temperature should I use for desoldering?'
    answer: 'Start 10–30°C above your normal soldering temperature for that joint and add fresh flux. Increasing tip size is usually more effective than increasing temperature further.'
---

Everyone makes mistakes, and the ability to *undo* a joint is just as important as making one. Desoldering lets you fix bridges, remove wrong components and salvage parts. This guide covers every common method and when to use each.

## Which desoldering method to use

| Method | Best for | Strengths | Limits |
| --- | --- | --- | --- |
| **Desoldering braid (wick)** | Flat pads, bridges, SMD cleanup | Precise, cheap, leaves clean pads | Slow for filled through-holes; consumable |
| **Solder sucker (pump)** | Through-hole joints | Fast, reusable, no consumables | Struggles on flat pads and SMD |
| **Hot air** | Multi-pin SMD parts | Melts every pin at once | More skill; can overheat nearby parts |
| **Desoldering station / gun** | Heavy through-hole rework | Heated nozzle plus built-in vacuum | Expensive for a hobbyist |
| **Tweezers and heat** | Two-terminal SMD parts | Quick for resistors and capacitors | Needs practice |

For most hobbyists a [solder sucker and wick](/solder-sucker-vs-solder-wick) cover nearly everything. Hot air — in a combined station like the [WEP 882D](/reviews/wep-882d-hot-air-rework-soldering-station) — becomes worthwhile once you work with surface-mount parts regularly.

## How to use desoldering braid

1. Lay the braid flat over the joint or bridge. Add a dab of [flux](/guides/how-to-use-flux) first — it makes a dramatic difference.
2. Press the hot iron tip down on top of the braid.
3. As both heat up, the solder melts and wicks into the braid.
4. Lift the braid and iron together — do not let the braid cool stuck to the pad.
5. Snip off the used, solder-filled section.

Match braid width to the job: narrow braid for fine pads, wider braid for big joints. Do not drag or scrub the braid across the board; that lifts pads.

## How to use a solder sucker

1. Prime (cock) the pump.
2. Melt the joint with your iron until the solder is fully liquid.
3. Bring the pump nozzle to the molten solder and trigger it in one smooth movement.
4. Repeat if needed, then clean any remainder with braid.

If the pump barely picks anything up, the solder probably was not fully molten, or the nozzle needs clearing. Our [VIRALLOY review](/reviews/viralloy-solder-sucker) covers pump care.

## Removing through-hole components

- **Two-leg parts (resistors, capacitors, diodes):** heat one joint and ease that leg out, then the other. Alternating heat between the two joints while rocking the part also works.
- **Multi-pin parts (ICs, headers, connectors):** clear every hole with a pump or wick until each leg moves freely, *then* lift the part. Never pull while any joint is still solid — that tears the pad and track.
- **Salvaging the board, not the part:** if the component is scrap anyway, clip its legs off first and remove each leg separately. It is far easier than freeing a many-pin part in one piece.

## Removing surface-mount components

- **Small two-terminal parts:** heat both ends alternately with the iron while pushing gently with tweezers, or add a blob of solder across both pads so they melt together. Two irons, one per end, work well too.
- **Multi-pin chips:** hot air is the cleanest method — preheat the area, keep the nozzle moving, and lift the chip once all the solder is molten. Without hot air, flood all the pins with solder and flux so they melt together, then clean the pads with wick afterwards.
- **Clean-up:** wick the pads flat before fitting a new part, so it sits level. Our [SMD rework guide](/guides/smd-rework-hot-air-and-reflow) covers hot air settings in detail.

## Stubborn joints

Some joints refuse to let go:

- **Ground planes and big pads** pull heat away. Use a larger tip and a little more time.
- **Lead-free joints** melt higher and flow poorly. Adding a little fresh leaded solder lowers the melting point and makes removal much easier — see [lead-free vs leaded solder](/guides/lead-free-vs-leaded-solder).
- **Old, oxidized joints** need fresh flux before anything will flow.
- **Blocked holes after removal:** heat the pad and use the pump from the component side, or feed wick from the other side. A heated wooden toothpick pushed through a hole also clears it without damaging plating.

## Avoiding damage

- **Add fresh flux** — old joints desolder much more easily with new flux.
- **Do not dwell.** Long heat lifts pads and traces. Work in short bursts and let things cool.
- **Use enough heat, not maximum heat.** Start 10–30°C above your soldering setting — see the [temperature guide](/guides/soldering-iron-temperature-guide).
- **Support the board** in [helping hands or a holder](/guides/helping-hands-and-pcb-holders) so both hands are free for iron and tool.
- **Check afterwards.** A [multimeter](/best-multimeters-for-electronics) on continuity confirms that neighbouring pads are not bridged and tracks are intact.

## Practise before it matters

Desoldering is a skill of its own. A cheap [practice board](/reviews/dzrcoxi-smd-smt-practice-kit-3-pack) lets you remove and re-fit parts until it feels routine — and once no mistake is permanent, you solder with far more confidence. Next, brush up on the joints themselves with our [beginner guide](/guides/how-to-solder-for-beginners) and [common mistakes](/guides/common-soldering-mistakes).
