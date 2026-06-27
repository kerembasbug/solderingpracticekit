/**
 * Generates hero images for all guide pages via fal.ai FLUX Schnell.
 * Usage: FAL_API_KEY=xxx node scripts/gen-guide-images.mjs
 * Or: with .env already containing FAL_API_KEY, just run: node --env-file=.env scripts/gen-guide-images.mjs
 */

import fs from 'node:fs';
import path from 'node:path';

const FAL_API_KEY = process.env.FAL_API_KEY;
if (!FAL_API_KEY) {
  console.error('FAL_API_KEY is required. Add it to .env or pass as env var.');
  process.exit(1);
}

const OUT_DIR = path.resolve('public/images/guides');
fs.mkdirSync(OUT_DIR, { recursive: true });

/** One prompt per guide slug. 16:9 hero — no text in image. */
const GUIDES = [
  {
    slug: 'how-to-solder-for-beginners',
    prompt:
      'Close-up photograph of hands soldering a green PCB circuit board on a wooden workbench, soldering iron tip glowing, warm workshop lighting, electronics hobby, photorealistic, no text',
  },
  {
    slug: 'common-soldering-mistakes',
    prompt:
      'Macro photo of a green circuit board showing cold solder joints and a solder bridge between two pins, soft side lighting, sharp focus on the defective joints, photorealistic, no text',
  },
  {
    slug: 'how-to-choose-a-soldering-iron',
    prompt:
      'Flat-lay of three soldering irons and a temperature-controlled soldering station arranged neatly on a dark workshop mat, product photography style, clean composition, no text',
  },
  {
    slug: 'how-to-clean-and-tin-a-soldering-iron-tip',
    prompt:
      'Close-up of a shiny tinned soldering iron tip above a brass wire tip cleaner on a workbench, warm metallic tones, shallow depth of field, photorealistic, no text',
  },
  {
    slug: 'how-to-desolder',
    prompt:
      'Person using a blue solder sucker desoldering pump on a through-hole component on a green PCB, electronics repair, bright work light, detailed and photorealistic, no text',
  },
  {
    slug: 'lead-free-vs-leaded-solder',
    prompt:
      'Two spools of silver solder wire side by side on a wooden workbench, one thicker than the other, soft natural light, clean product photography, no text',
  },
  {
    slug: 'soldering-iron-temperature-guide',
    prompt:
      'Digital soldering station with a glowing LCD display showing 320 degrees Celsius, soldering iron resting in holder, electronics lab background, photorealistic, no text',
  },
  {
    slug: 'soldering-tools-checklist-for-beginners',
    prompt:
      'Organized flat-lay of beginner soldering tools: soldering iron, rosin-core solder, flux, tweezers, helping hands, wire strippers on a dark grey surface, overhead shot, no text',
  },
  {
    slug: 'through-hole-vs-surface-mount-soldering',
    prompt:
      'Macro photograph of a circuit board half populated with through-hole components and half with tiny SMD surface-mount components, high detail, electronics engineering, no text',
  },
  {
    slug: 'best-soldering-kits-for-kids-and-teens',
    prompt:
      'Smiling teenager assembling a colorful DIY electronic kit at a desk with LED components spread out, bright learning environment, educational, photorealistic, no text',
  },
  {
    slug: 'how-to-use-flux',
    prompt:
      'Macro photo of a flux pen and a tube of solder flux paste beside a green PCB, a bright shiny solder joint flowing, warm workshop light, shallow depth of field, photorealistic, no text',
  },
  {
    slug: 'solder-wire-types-and-gauge',
    prompt:
      'Several spools of solder wire of different thicknesses arranged on a dark workbench, close-up product photography, soft directional light, photorealistic, no text',
  },
  {
    slug: 'how-to-solder-wires-together',
    prompt:
      'Close-up of two stripped copper wires being soldered together with a soldering iron, helping-hands clamp holding them, heat-shrink tubing nearby, warm light, photorealistic, no text',
  },
  {
    slug: 'how-to-fix-a-cold-solder-joint',
    prompt:
      'Extreme macro of a dull grainy cold solder joint next to a shiny smooth one on a green circuit board, sharp comparison, soft side lighting, photorealistic, no text',
  },
  {
    slug: 'soldering-fume-safety',
    prompt:
      'A solder fume extractor fan beside a soldering iron with a thin wisp of smoke being drawn sideways away from the work, electronics bench, soft light, photorealistic, no text',
  },
  {
    slug: 'helping-hands-and-pcb-holders',
    prompt:
      'A helping-hands soldering tool with flexible arms and a magnifier holding a green circuit board on a workbench, clean product photography, soft light, photorealistic, no text',
  },
  {
    slug: 'esd-safety-for-soldering',
    prompt:
      'An anti-static wrist strap on a wrist resting on a grey ESD mat with electronic components and a circuit board, clean tidy workbench, soft light, photorealistic, no text',
  },
  {
    slug: 'smd-rework-hot-air-and-reflow',
    prompt:
      'A hot air rework station nozzle above a circuit board with tiny surface-mount components, tweezers placing a chip, detailed electronics rework, bright light, photorealistic, no text',
  },
  {
    slug: 'how-to-solder-battery-tabs',
    prompt:
      'Close-up of nickel tabs and 18650 lithium battery cells with a powerful soldering iron, battery pack building on a workbench, careful detailed shot, photorealistic, no text',
  },
  {
    slug: 'soldering-for-rc-and-drones',
    prompt:
      'Close-up of soldering an XT60 connector and motor wires on an FPV drone flight controller, thick red and black battery leads, electronics workbench, photorealistic, no text',
  },
  {
    slug: 'soldering-vs-welding-vs-brazing',
    prompt:
      'Three side-by-side metal joining processes: a soldering iron on a circuit board, a brazing torch on copper pipe, and a welding arc on steel, split composition, photorealistic, no text',
  },
  {
    slug: 'how-to-read-a-schematic',
    prompt:
      'An electronic schematic circuit diagram on paper beside a populated green circuit board and a pencil on a wooden desk, warm study light, photorealistic, no text',
  },
];

async function generateImage(prompt) {
  const res = await fetch('https://fal.run/fal-ai/flux/schnell', {
    method: 'POST',
    headers: {
      Authorization: `Key ${FAL_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt,
      image_size: 'landscape_16_9',
      num_inference_steps: 4,
      num_images: 1,
      enable_safety_checker: true,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`fal.ai error ${res.status}: ${text}`);
  }

  const data = await res.json();
  return data.images[0].url;
}

async function downloadImage(url, destPath) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed: ${res.status}`);
  const buf = await res.arrayBuffer();
  fs.writeFileSync(destPath, Buffer.from(buf));
}

async function updateFrontmatter(slug, imagePath) {
  const mdPath = path.resolve(`src/content/guides/${slug}.md`);
  if (!fs.existsSync(mdPath)) return;

  let content = fs.readFileSync(mdPath, 'utf8');
  const relativeImagePath = imagePath.replace(/^public/, '');

  // Already has heroImage — update it
  if (content.includes('heroImage:')) {
    content = content.replace(/heroImage:.*/, `heroImage: '${relativeImagePath}'`);
  } else {
    // Insert after the first ---\n block (after opening ---)
    content = content.replace(/^(---\n)/, `$1heroImage: '${relativeImagePath}'\n`);
  }

  fs.writeFileSync(mdPath, content, 'utf8');
}

(async () => {
  for (const guide of GUIDES) {
    const destPath = path.join(OUT_DIR, `${guide.slug}.jpg`);

    if (fs.existsSync(destPath)) {
      console.log(`⏭  ${guide.slug} — already exists, skipping`);
      continue;
    }

    process.stdout.write(`⏳ ${guide.slug} — generating...`);
    try {
      const imageUrl = await generateImage(guide.prompt);
      await downloadImage(imageUrl, destPath);
      await updateFrontmatter(guide.slug, `public/images/guides/${guide.slug}.jpg`);
      console.log(' ✅');
    } catch (err) {
      console.log(` ❌ ${err.message}`);
    }

    // Small delay to avoid rate limiting
    await new Promise((r) => setTimeout(r, 500));
  }

  console.log('\nDone. Commit public/images/guides/ and the updated .md frontmatter.');
})();
