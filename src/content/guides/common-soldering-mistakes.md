---
heroImage: '/images/guides/common-soldering-mistakes.jpg'
title: '10 Common Soldering Mistakes (and How to Fix Them)'
seoTitle: '10 Common Soldering Mistakes and How to Fix Them'
description: 'Cold joints, solder bridges, lifted pads and more — the most common soldering mistakes beginners make, why they happen, and how to fix and avoid them.'
pubDate: 2026-02-26
updatedDate: 2026-09-30
category: 'Troubleshooting'
relatedProducts:
  - dzrcoxi-smd-smt-practice-kit-3-pack
  - gikfun-led-chaser-soldering-kit
faqs:
  - question: 'What is a cold solder joint?'
    answer: 'A cold joint is one where the solder didn''t fully melt and bond to both surfaces. It looks dull, grainy or blobby instead of shiny, and it''s electrically unreliable. Reheat the joint with a clean, hot tip and add a touch of fresh solder and flux.'
  - question: 'How do I fix a solder bridge?'
    answer: 'A solder bridge is unwanted solder connecting two points. Add flux, then drag a clean hot tip across the bridge, or use desoldering braid to wick away the excess.'
  - question: 'Why do my joints look dull instead of shiny?'
    answer: 'Dull joints usually mean not enough heat, a dirty tip, or movement while the joint cooled. Make sure the iron is up to temperature, the tip is clean and tinned, and the joint is held still as it solidifies.'
  - question: 'Why does my soldering kit not work after building it?'
    answer: 'Usually a cold joint, a solder bridge, a missed joint or a component fitted the wrong way round. Inspect every joint, check orientation against the silkscreen, then test suspect joints with a multimeter before assuming a part is faulty.'
  - question: 'How do I know if I used too much solder?'
    answer: 'A good joint has concave sides that follow the shape of the lead. A rounded blob hides whether the solder actually bonded to the pad and can bridge to neighbouring pins; remove the excess with wick.'
---

Every solderer makes these mistakes early on. The good news: each has a clear cause and an easy fix. Practice spotting them on a cheap [practice board](/best-soldering-practice-kits) and they'll soon disappear.

## 1. Cold solder joints

**The problem:** Dull, grainy or blobby joints that crack or fail. The solder never fully melted and flowed.

**The fix:** Use enough heat, heat the *joint* (not just the solder), and hold steady while it cools. Reheat bad joints with fresh solder and flux.

## 2. Heating the solder instead of the joint

**The problem:** You melt solder onto the iron and dab it on. It won't bond properly.

**The fix:** Press the tip to both surfaces first, let them heat, then feed solder into the joint.

## 3. A dirty or un-tinned tip

**The problem:** A blackened, dull tip won't transfer heat, so nothing flows.

**The fix:** Wipe on brass wool and re-tin with a little solder until shiny. Do this often.

## 4. Too much solder

**The problem:** Giant blobs that can hide cold joints or bridge to neighbours.

**The fix:** A joint needs just enough to form a small cone. Feed less; you can always add more.

## 5. Solder bridges

**The problem:** Solder accidentally connects two adjacent pads or pins.

**The fix:** Add flux and drag a clean tip across the bridge, or wick it away with desoldering braid.

## 6. Lifted or burned pads

**The problem:** Too much heat for too long lifts the copper pad off the board.

**The fix:** Work quickly (2–3 seconds per joint) at the right temperature. If a pad lifts, you may need to repair the trace.

## 7. Wrong temperature

**The problem:** Too cold and solder won't flow; too hot and you damage parts and burn flux instantly.

**The fix:** Around 315–340°C (600–650°F) for leaded solder; a bit hotter for lead-free. Use the lowest temp that makes a clean joint in a couple of seconds.

## 8. No flux

**The problem:** Solder beads up and refuses to wet the surfaces.

**The fix:** Use rosin-core solder, and add extra flux for tricky or surface-mount joints. Flux cleans the metal so solder can bond.

## 9. Moving the joint while it cools

**The problem:** A disturbed joint solidifies fractured and unreliable.

**The fix:** Hold everything still for a second after you remove the iron. Helping hands make this easy.

## 10. Skipping safety

**The problem:** Burns, breathing flux smoke, or eye injuries from spitting solder.

**The fix:** Ventilate, wear safety glasses, keep the iron in its stand, and never touch the tip. See our [beginner guide](/guides/how-to-solder-for-beginners) for a full safety rundown.

---

## When a finished board does not work

Most "dead kit" faults come from the mistakes above. Work through them in this order before assuming a component is faulty:

1. **Look first.** Under good light or a magnifier, check every joint for dull cold joints, solder bridges and pins that were never soldered at all.
2. **Check orientation.** LEDs, diodes, electrolytic capacitors and chips only work one way round. Compare each with the silkscreen marking.
3. **Check values.** A resistor in the wrong position is easy to miss — our [resistor color code calculator](/tools/resistor-color-code-calculator) decodes the bands.
4. **Test continuity.** With power off, a [multimeter](/best-multimeters-for-electronics) confirms each suspect joint connects and neighbouring pins do not.
5. **Power up carefully.** A current-limited [bench power supply](/best-bench-power-supplies) shows a short straight away as a high current reading instead of a burnt part.
6. **Reflow anything doubtful.** A dab of flux and a quick reheat fixes most intermittent faults — see [how to fix a cold solder joint](/guides/how-to-fix-a-cold-solder-joint).

## Mistakes that are easy to make with lead-free solder

- **Judging joints by shine.** Lead-free joints are naturally satin; check the shape instead.
- **Turning the heat up instead of using a bigger tip.** More temperature mostly burns flux and wears the tip.
- **Skipping flux.** Lead-free wets less readily and needs it more.

The [lead-free vs leaded guide](/guides/lead-free-vs-leaded-solder) covers hand-soldering lead-free in detail.


The cure for all of these is repetition on cheap boards where mistakes don't matter. A [multi-pack practice kit](/reviews/dzrcoxi-smd-smt-practice-kit-3-pack) or a high-joint-count project like the [LED chaser](/reviews/gikfun-led-chaser-soldering-kit) gives you plenty of reps to build clean, confident technique.
