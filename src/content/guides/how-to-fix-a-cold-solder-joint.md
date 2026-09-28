---
title: 'How to Fix a Cold Solder Joint (Spot It and Reflow It)'
seoTitle: 'Cold Solder Joint: How to Spot, Test and Fix It'
description: 'What a cold solder joint looks like, how to test for one, why it happens, how to reflow it — and how it differs from cracked joints caused by solder cold flow (creep).'
pubDate: 2026-06-23
updatedDate: 2026-09-28
category: 'Troubleshooting'
heroImage: '/images/guides/how-to-fix-a-cold-solder-joint.jpg'
relatedProducts:
  - viralloy-solder-sucker
  - towot-solder-wick-flux-kit
  - tingbowie-soldering-practice-kit
faqs:
  - question: 'How do I know if a solder joint is cold?'
    answer: 'A cold joint looks dull, grainy or lumpy rather than smooth and shiny, and often forms a ball that sits on top of the pad instead of a concave fillet flowing into it. It may work intermittently or not at all, and can often be wiggled.'
  - question: 'What causes a cold solder joint?'
    answer: 'The two main causes are not enough heat — the joint never fully melted the solder — and movement while the solder was cooling. A dirty or oxidised surface and a lack of flux also contribute by stopping the solder from wetting properly.'
  - question: 'Can a cold joint be fixed without removing the old solder?'
    answer: 'Often yes. Add a little flux, then reheat the joint with a clean, hot tip until the existing solder melts and flows into a smooth fillet. If there is too much solder or it is badly oxidised, remove it with a solder sucker or wick first, then resolder fresh.'
  - question: 'What is solder cold flow?'
    answer: 'Cold flow, or creep, is the slow deformation of solder under sustained mechanical stress or repeated heating and cooling, even at room temperature. It is a different fault from a cold joint: a joint can be made perfectly and still crack years later from creep, typically at heavy components, connectors and parts that flex or run hot.'
  - question: 'Why are cold solder joints common in guitars?'
    answer: 'Guitar wiring involves soldering to pot casings and jack lugs, which are large pieces of metal that pull heat away quickly. With a small tip or low temperature the solder never properly wets the casing. Use a larger tip, scuff and flux the casing, and hold the iron until the solder flows onto it.'
  - question: 'How do you test for a cold solder joint?'
    answer: 'With the power off, use a multimeter on continuity between the component lead and the track it should connect to, then gently flex the part while watching or listening for the reading to drop out. Visual inspection under magnification catches most cold joints before testing.'
---

A cold solder joint is the most common fault a beginner makes — and the most common reason a project that "should work" does not. The good news is they are easy to spot once you know what to look for, and usually trivial to fix.

## What a cold joint is

A good solder joint is a proper metallurgical bond: the solder has flowed into and wetted both the pad and the component lead, forming a smooth, shiny, concave fillet. A **cold joint** is one where that bond never properly formed — the solder cooled before it flowed, or it never got hot enough to wet the surfaces. The result is a weak, often intermittent connection that just sits on top of the metal rather than bonding to it.

## How to spot one

Look closely (a [magnifier or helping-hands tool](/reviews/kaisiking-helping-hands-magnifier) helps):

- **Dull, grainy or frosty surface** instead of bright and shiny
- **A ball or blob** sitting on the pad rather than a smooth fillet flowing into it
- **Cracks or a ring** around the component lead
- The joint can sometimes be **wiggled** or the part moves

Electrically, cold joints cause flaky behaviour: a circuit that works when you press on it, then stops; intermittent faults; or no connection at all.

## Why cold joints happen

1. **Not enough heat** — the iron was too cool, too low-powered, or not held on the joint long enough to melt everything fully. Work at around 315–340°C (600–650°F) for leaded solder.
2. **Movement while cooling** — the joint was disturbed during the second or two it takes to solidify. Hold parts still until the solder sets.
3. **No flux / dirty surfaces** — without [flux](/guides/how-to-use-flux), oxide stops the solder wetting the metal, so it beads up instead of flowing.

## How to fix a cold joint

Most cold joints reflow in seconds:

1. **Add a little flux** to the joint. This is the step beginners skip, and it makes all the difference — it lets the existing solder flow again.
2. **Clean and heat your tip**, then press it firmly against the joint so it heats both the pad and the lead.
3. **Wait for the solder to melt and flow** into a smooth, shiny fillet. Add a touch of fresh solder if there is not enough.
4. **Remove the iron and hold still** until the joint solidifies — no blowing on it, no moving the board.

If there is **too much solder**, or it is badly oxidised, remove the old solder first with [a solder sucker](/reviews/viralloy-solder-sucker) or [desoldering wick](/reviews/towot-solder-wick-flux-kit), then make a fresh joint.

## Cold joint vs good joint at a glance

| | Good joint | Cold joint |
| --- | --- | --- |
| Surface (leaded solder) | Smooth and shiny | Dull, grainy or frosty |
| Shape | Concave fillet flowing up the lead | Ball or blob sitting on the pad |
| Edge where solder meets pad | Thin and feathered — it has wetted | Rounded edge, like water on wax |
| Around the lead | Solder hugs the lead | A ring or gap around the lead |
| Mechanical | Solid | Part can sometimes move |

One caution: **lead-free solder naturally looks satin or dull** even when the joint is perfect. With lead-free, judge the shape and the wetted edge rather than the shine — see [lead-free vs leaded solder](/guides/lead-free-vs-leaded-solder).

## How to test a suspected cold joint

1. **Inspect under magnification** — most cold joints are visible once you know the signs above.
2. **Check continuity** with a [multimeter](/best-multimeters-for-electronics), power off, from the component lead to the track or pad it should reach.
3. **Flex while you measure.** Gently press or wiggle the component while watching the reading; an intermittent joint drops in and out.
4. **Check the neighbours.** Test adjacent pins for continuity too — the same rushed joint often comes with a solder bridge next door.

## Where cold joints are most likely

Cold joints cluster wherever the metal pulls heat away faster than your tip can supply it:

- **Ground planes and large pads**, which spread heat across the board.
- **Connectors, jacks and battery terminals**, which are chunky pieces of metal.
- **Guitar pots and output jacks** — soldering to a pot casing is a classic cold-joint trap. Use a large chisel tip, scuff and flux the casing, and hold the iron until the solder visibly flows onto it.
- **Thick wires**, where the copper soaks up heat. Tin each wire first, as in [how to solder wires together](/guides/how-to-solder-wires-together).

The fix in each case is more heat *capacity* — a bigger tip and a higher-wattage iron — rather than simply a higher temperature setting.

## Cold joints vs "cold flow" cracking

People searching for cold joints often come across **solder cold flow**, which is a different problem. Cold flow — also called **creep** — is the slow deformation of solder under sustained stress. Solder is soft metal operating surprisingly close to its melting point, so over months or years, a joint under constant load or repeated heating and cooling can deform and eventually crack.

| | Cold joint | Cold flow / creep cracking |
| --- | --- | --- |
| When it happens | At the moment of soldering | Gradually, over time in use |
| Cause | Too little heat, movement, no flux | Mechanical stress, vibration, thermal cycling |
| Typical location | Anywhere, especially large pads | Heavy parts, connectors, hot components, flexing boards |
| Appearance | Dull ball, poor wetting | A fine circular crack around the lead of an otherwise good joint |
| Fix | Reflow with flux | Reflow, then relieve the stress (support, strain relief, better mounting) |

A cracked ring around the lead of a large capacitor, a power connector or a heatsinked regulator on an older board is usually creep, not a soldering mistake. Reflowing it restores the connection, but adding mechanical support stops it recurring.

## Prevent them in the first place

Cold joints almost vanish once you do three things consistently: keep your [tip clean and tinned](/guides/how-to-clean-and-tin-a-soldering-iron-tip), work at the right temperature, and heat the joint — not the solder — so everything melts together. A cheap [practice board](/reviews/tingbowie-soldering-practice-kit) is the perfect place to drill the habit until shiny joints come automatically.

For more faults and fixes, see our roundup of [common soldering mistakes](/guides/common-soldering-mistakes).
