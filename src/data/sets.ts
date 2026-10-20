import type { ProductSet } from '@/lib/types';

/**
 * Curated shopping sets. Each `ref` is the slug of a reviewed product
 * (src/data/products.ts) or an extra (src/data/extras.ts). Order matters:
 * the first item is the one shown on cards.
 */
export const SETS: ProductSet[] = [
  {
    id: 'beginner-soldering-bench',
    title: 'Complete Beginner Soldering Bench',
    tagline: 'A temperature-controlled station, consumables, safety gear and a first board — everything a first session needs.',
    intro:
      'This is the set we would hand to someone who has never held an iron. It leans on a station kit that already bundles tips, helping hands and a stand, then adds the consumables and safety items that kits leave out. Nothing here is a luxury; every line fixes a problem beginners actually hit.',
    body: [
      'The most common beginner mistake is spending the whole budget on the iron and then having nothing to solder with. A station that bundles tips and helping hands solves half of that, but you still need thin rosin-core solder, flux for the stubborn joints, a way to undo mistakes, and glasses before the first spit of flux reaches your eye.',
      'We chose the YIHUA 926 III as the iron because it regulates temperature properly and arrives with most of the small accessories a beginner would otherwise forget. Pair it with the amomii Testudo practice kit so the first joints go onto a board that is designed to be forgiving — and that ends as three working gadgets rather than a bare test board.',
      'If the budget is tighter, swap the station for the Plusivo 60W digital iron kit from our best soldering irons roundup and keep everything else; the consumables and safety gear are the same whatever iron you learn on.',
    ],
    items: [
      { ref: 'yihua-926-iii-soldering-station', role: 'Iron', why: 'Regulated 60W station that bundles six tips, helping hands, a stand and tweezers, so the first shopping trip is also the last.' },
      { ref: 'hgmzzq-60-40-rosin-core-solder', role: 'Solder', why: 'Thin 60/40 rosin-core wire that melts at a forgiving temperature and wets pads easily — the right solder to learn on.' },
      { ref: 'kester-951-no-clean-flux-pen', role: 'Flux', why: 'For the joints that will not take: a stroke of flux makes solder flow instead of balling up.' },
      { ref: 'viralloy-solder-sucker', role: 'Desoldering', why: 'Every beginner bridges a pad. A sucker undoes it in seconds.' },
      { ref: 'towot-solder-wick-flux-kit', role: 'Wick', why: 'Cleans the last traces of solder off a pad after the sucker has done the heavy lifting.' },
      { ref: 'hakko-599b-brass-tip-cleaner', role: 'Tip cleaner', why: 'Brass wool keeps the tip shiny without the thermal shock of a wet sponge, which is why tips last longer.' },
      { ref: 'nocry-anti-fog-safety-glasses', role: 'Safety glasses', why: 'Flux spits. ANSI-rated glasses that do not fog are the cheapest insurance on this list.' },
      { ref: 'pafowo-silicone-soldering-mat', role: 'Work mat', why: 'Protects the table from the iron and keeps dropped components from rolling away.' },
      { ref: 'amomii-testudo-soldering-practice-kit', role: 'First project', why: 'A practice kit that finishes as three working gadgets, so the learning curve has a payoff.' },
    ],
    faqs: [
      {
        question: 'Do I really need all nine items to start soldering?',
        answer: 'You can start with the iron, solder, glasses and a board. The flux, sucker, wick and tip cleaner are what make the second and third sessions go well — they fix mistakes and keep the iron working — so we include them rather than have you order them separately a week later.',
      },
      {
        question: 'Can I swap the station for a cheaper iron?',
        answer: 'Yes. Any temperature-controlled iron works; the Plusivo 60W kit is the budget choice in our rankings. Avoid unregulated fixed-temperature irons, which overheat small joints and burn flux before it can do its job.',
      },
      {
        question: 'Is 60/40 leaded solder safe for a beginner?',
        answer: 'Used sensibly — ventilation, no eating at the bench, wash hands afterwards — yes, and it is easier to learn on. If you prefer lead-free, pick a lead-free wire and run the iron about 30°C hotter. Our lead-free vs leaded guide covers the trade-off.',
      },
    ],
    readMore: { label: 'Soldering tools checklist for beginners', href: '/guides/soldering-tools-checklist-for-beginners' },
    updatedAt: '2026-10-20',
  },
  {
    id: 'kids-first-soldering-kit',
    title: "A Child's First Soldering Set",
    tagline: 'A short, rewarding first build plus the safety gear and a sensible iron, chosen for ages 8–12 with an adult.',
    intro:
      'Built for a supervised first session with a younger child: a project with only a handful of joints that works at the end, an iron that will not run hotter than it needs to, and the three things that make parents comfortable — glasses, a heat-proof mat and a fume extractor.',
    body: [
      'With children the goal of the first session is a working result inside half an hour. The Jitterbug has very few joints and ends as a vibrating bug they can play with immediately, which is far more motivating than a bare practice board. Our Jitterbug vs robot car comparison explains why we pick it over longer builds for a first go.',
      'The iron matters more here than for adults. A temperature-controlled iron with a proper stand keeps the tip at a sensible heat and gives the hot end somewhere safe to live between joints. The Plusivo 60W kit is inexpensive, digital and includes a stand and spare tips.',
      'Fume extraction is optional for an adult in a ventilated room; for a child leaning close over the board it is worth having. The KOTTO extractor is small and quiet enough to sit right beside the work.',
    ],
    items: [
      { ref: 'learn-to-solder-jitterbug-kit', role: 'First project', why: 'A handful of large joints and a wiggling bug at the end — finishable in one short sitting.' },
      { ref: 'plusivo-60w-digital-soldering-iron-kit', role: 'Iron', why: 'Temperature-controlled with a readable display, a stable stand and spare tips, at a price that suits a first try.' },
      { ref: 'hgmzzq-60-40-rosin-core-solder', role: 'Solder', why: 'Thin wire that flows easily so small hands do not have to hold the iron on for long. Wash hands afterwards.' },
      { ref: 'nocry-anti-fog-safety-glasses', role: 'Safety glasses', why: 'Adjustable temples let them fit a smaller face; the anti-fog coating means they stay on.' },
      { ref: 'pafowo-silicone-soldering-mat', role: 'Work mat', why: 'A heat-proof surface the hot iron can touch without damage, with trays for the tiny parts.' },
      { ref: 'kotto-solder-fume-extractor', role: 'Fume extractor', why: 'Pulls flux smoke away from a face that is inevitably close to the board.' },
    ],
    faqs: [
      {
        question: 'What age is this set for?',
        answer: 'Roughly 8 to 12 with an adult doing the first joint and guiding the hand on the next. Maturity and patience matter more than the number; our soldering for kids guide has a table by age.',
      },
      {
        question: 'Should kids use lead-free solder?',
        answer: 'Lead-free is the cautious choice and works fine with a temperature-controlled iron set about 30°C hotter. Leaded 60/40 is easier to learn on; if you use it, keep food away from the bench and wash hands afterwards. Either way, the fume extractor and ventilation matter more than the alloy.',
      },
      {
        question: 'What comes after the Jitterbug?',
        answer: 'A build with a bigger payoff — the MiOYOOW line-following robot or the PEMENOL retro game console. Our best soldering kits for kids roundup ranks the next steps.',
      },
    ],
    readMore: { label: 'Soldering for kids: age, safety and first projects', href: '/guides/best-soldering-kits-for-kids-and-teens' },
    updatedAt: '2026-10-20',
  },
  {
    id: 'teen-maker-soldering-set',
    title: 'Teen Maker Soldering Set',
    tagline: 'A proper station, a weekend-sized project and the tools to finish it cleanly — a set that grows with a 13–17 year old.',
    intro:
      'Teens can handle a longer build and will outgrow a toy-grade iron within a month. This set pairs a real temperature-controlled station with a retro game console kit, then adds the cutters, mat and fume extractor that turn a kit into a tidy finished gadget.',
    body: [
      'The difference between this and the kids set is ambition. The PEMENOL console has enough joints to teach consistency and ends as a handheld with seven games — the kind of result that gets shown to friends. The YIHUA 926 III station gives steady heat for a long session and bundles helping hands, tips and tweezers.',
      'Flush cutters are the one tool teens never think to buy and immediately appreciate: trimming leads flush is what makes the back of a board look professional. The mat and extractor make the bedroom desk a safe place to work.',
      'For a teenager who already has an iron, our best soldering kits for teens roundup lists more project kits at every level.',
    ],
    items: [
      { ref: 'pemenol-retro-game-console-soldering-kit', role: 'Project', why: 'A handheld console with seven games and selectable difficulty — a build worth the weekend.' },
      { ref: 'yihua-926-iii-soldering-station', role: 'Iron', why: 'A regulated station that will still be the right iron years from now, with helping hands and tips in the box.' },
      { ref: 'hgmzzq-60-40-rosin-core-solder', role: 'Solder', why: 'Enough thin rosin-core wire for the console and the next few projects.' },
      { ref: 'kata-mini-flush-cutters', role: 'Flush cutters', why: 'Trims leads flush after soldering so the finished board looks clean and nothing shorts.' },
      { ref: 'nocry-anti-fog-safety-glasses', role: 'Safety glasses', why: 'ANSI-rated and comfortable enough to actually wear for the whole build.' },
      { ref: 'pafowo-silicone-soldering-mat', role: 'Work mat', why: 'Protects a desk from the iron and from dropped solder.' },
      { ref: 'kotto-solder-fume-extractor', role: 'Fume extractor', why: 'Keeps flux smoke out of a bedroom.' },
    ],
    faqs: [
      {
        question: 'Is a full station too much for a teenager?',
        answer: 'No — it is the iron most adults end up buying anyway. A station holds temperature better during a long build and includes the accessories a teen would otherwise have to buy separately.',
      },
      {
        question: 'Can a teen do this without supervision?',
        answer: 'Most teens can solder independently once they have been shown the basics, but a first session with an adult nearby is still sensible. The iron runs over 300°C and the mat, stand and glasses are not optional.',
      },
    ],
    readMore: { label: 'Best soldering kits for teens', href: '/best-soldering-kits-for-teens' },
    updatedAt: '2026-10-20',
  },
  {
    id: 'smd-rework-bench',
    title: 'SMD and Hot Air Rework Bench',
    tagline: 'A 2-in-1 iron and hot air station, flux, tweezers, a vise and a graded practice board for surface-mount work.',
    intro:
      'Surface-mount parts are too small to hold with fingers and too close together to solder without flux. This set is built around a combined iron and hot air station so you can both place parts and remove them, with the hand tools that make 0805 parts manageable and a practice board to learn on before touching a real device.',
    body: [
      'Hot air is what separates rework from assembly: it lets you lift a chip with all its legs at once instead of fighting one pad at a time. The WEP 882D puts an iron and a hot air gun in one unit, which saves bench space and money compared with two stations.',
      'The rest of the set is about control. ESD-safe tweezers to place parts, a Stickvise to hold the board flat, a flux pen because surface-mount joints simply do not work dry, and wick for cleaning bridges off fine-pitch legs. Isopropyl alcohol cleans the flux residue off afterwards so the finished board does not stay sticky.',
      'Start on the Gikfun SMD practice board rather than a real device: it has a range of footprints from large to very small so you can find your limit before it costs you a phone.',
    ],
    items: [
      { ref: 'wep-882d-hot-air-rework-soldering-station', role: 'Iron + hot air', why: 'Iron and hot air in one station — place parts with the iron, lift chips with the air.' },
      { ref: 'kester-951-no-clean-flux-pen', role: 'Flux', why: 'Surface-mount joints do not work dry; a stroke of flux pulls the solder onto the pad.' },
      { ref: 'xool-esd-precision-tweezers-set', role: 'Tweezers', why: 'Fine ESD-safe tips for picking up and holding parts the size of a grain of rice.' },
      { ref: 'stickvise-pcb-vise', role: 'Board holder', why: 'Holds the board flat and still so both hands are free for tweezers and iron.' },
      { ref: 'towot-solder-wick-flux-kit', role: 'Wick', why: 'The only sensible way to clear a bridge between fine-pitch legs.' },
      { ref: 'gikfun-smd-smt-welding-practice-board-ek7028', role: 'Practice board', why: 'Graded footprints from easy to tiny — learn where your limit is before it matters.' },
      { ref: 'mg-chemicals-824-isopropyl-alcohol', role: 'Cleaner', why: 'Electronics-grade IPA that removes flux residue without leaving a film.' },
      { ref: 'kaisiking-helping-hands-magnifier', role: 'Magnifier', why: 'Lit magnification for inspecting joints that are hard to judge with the naked eye.' },
    ],
    faqs: [
      {
        question: 'Do I need hot air to solder SMD parts?',
        answer: 'Not to solder them — a fine tip and flux handle most passives and chips with legs. You need hot air to remove multi-leg parts cleanly and to work with leadless packages, which is what rework usually means.',
      },
      {
        question: 'What hot air temperature should I start at?',
        answer: 'Low: around 300–330°C with low airflow for small passives, more for larger chips. Add flux, keep the nozzle moving, and increase gradually. Our SMD rework guide has a starting-settings table.',
      },
    ],
    readMore: { label: 'SMD rework: hot air and reflow explained', href: '/guides/smd-rework-hot-air-and-reflow' },
    updatedAt: '2026-10-20',
  },
  {
    id: 'rc-drone-soldering-kit',
    title: 'RC and Drone Soldering Kit',
    tagline: 'A 100W iron for thick leads and connectors, plus the wire, XT60s, heat-shrink and multimeter a build needs.',
    intro:
      'RC soldering is about heat capacity: battery leads and XT60 connectors soak up heat that a small iron cannot deliver, which is where cold joints come from. This set starts with a 100W iron and adds the connectors, silicone wire and heat-shrink you actually use, plus a multimeter to check for shorts before the first battery goes on.',
    body: [
      'The FNIRSI HS-02A is compact but puts 100W into the tip, which is what a 12 AWG lead and a brass XT60 pin need. A large chisel tip and plenty of flux do the rest; pre-tin both sides and the final joint takes seconds instead of melting the connector housing.',
      'Silicone-insulated wire is standard in RC because it stays flexible and does not melt back from the joint. The heat-shrink kit covers the splices and connector tails; buy the sheathed XT60H version of the connector so the shrink has somewhere to sit.',
      'The multimeter is the item people skip and regret. A continuity check between the main power leads, before plugging in a full LiPo, turns a short from a destroyed ESC into a beep. Pair it with a current-limited bench supply from our bench power supply roundup for the first power-up.',
    ],
    items: [
      { ref: 'fnirsi-hs-02a-soldering-iron', role: 'Iron', why: '100W in a pencil-sized body — enough thermal headroom for XT60 pins and 12 AWG leads.' },
      { ref: 'hgmzzq-60-40-rosin-core-solder', role: 'Solder', why: 'Rosin-core wire that flows quickly on pre-tinned leads and connector cups.' },
      { ref: 'kester-951-no-clean-flux-pen', role: 'Flux', why: 'Extra flux on big connectors is the difference between a shiny joint and a dull cold one.' },
      { ref: 'ertzinla-xt60h-connectors-12-pair', role: 'Connectors', why: 'Sheathed XT60H pairs, with spares to practise on before the real battery lead.' },
      { ref: 'tuofeng-22-awg-silicone-wire-kit', role: 'Signal wire', why: 'Flexible silicone wire for receiver, VTX and camera runs; the insulation does not melt back.' },
      { ref: 'ginsco-heat-shrink-tubing-kit', role: 'Heat-shrink', why: 'Eleven sizes so every splice and connector tail gets a sleeve that fits.' },
      { ref: 'astroai-am33d-digital-multimeter', role: 'Multimeter', why: 'Continuity check across the power leads before the first plug-in — a beep instead of a dead ESC.' },
      { ref: 'kaisiking-helping-hands-magnifier', role: 'Third hand', why: 'Holds the connector body still while you feed solder and iron into the cup.' },
    ],
    faqs: [
      {
        question: 'What wattage iron do I need for XT60 connectors?',
        answer: 'Around 80–100W with a large chisel tip handles XT60 comfortably. Tip size matters as much as wattage: a fine conical tip cannot transfer heat into a brass pin fast enough no matter how powerful the iron.',
      },
      {
        question: 'Why silicone wire instead of PVC?',
        answer: 'Silicone insulation tolerates the heat of soldering without melting back and stays flexible under vibration, which is why RC and drone builders standardise on it.',
      },
    ],
    readMore: { label: 'Soldering for RC and drones', href: '/guides/soldering-for-rc-and-drones' },
    updatedAt: '2026-10-20',
  },
  {
    id: 'esd-safe-electronics-bench',
    title: 'ESD-Safe Electronics Bench',
    tagline: 'A grounded station, mat and strap, anti-static tweezers and a multimeter for working on static-sensitive boards.',
    intro:
      'If you repair phones, laptops or anything with a microcontroller, static is a real risk even when nothing visibly sparks. This set grounds everything that touches the board — the iron tip, the work surface, your wrist and the tweezers — so a charge drains away instead of into a chip.',
    body: [
      'The Hakko FX-888DX is the ESD-safe station we recommend for a bench you will keep: its tip is grounded, it holds temperature precisely, and the range of T18 tips covers fine electronics work. The YIHUA 939D+ is the value alternative if the Hakko is more than the budget allows.',
      'The HPFIX mat does two jobs: it is a heat-resistant silicone work surface and a grounded one, with a wrist strap and grounding wire included. Add ESD-safe tweezers so the tool that actually touches the part is not the weak link.',
      'A multimeter belongs in this set for a specific reason: it lets you check that the wrist strap really connects to ground. You should read roughly 1 MΩ through the strap — not zero and not open — and cords do break inside their insulation. Our ESD safety guide explains the check.',
    ],
    items: [
      { ref: 'hakko-fx888dx-digital-soldering-station', role: 'Iron', why: 'ESD-safe, precisely regulated, and backed by the widest tip range in hobby electronics.' },
      { ref: 'hpfix-esd-soldering-mat-kit', role: 'Mat + strap', why: 'Grounded, heat-resistant work surface with the wrist strap and grounding wire in the box.' },
      { ref: 'xool-esd-precision-tweezers-set', role: 'Tweezers', why: 'Anti-static tips so the tool holding the part cannot deliver a charge to it.' },
      { ref: 'astroai-am33d-digital-multimeter', role: 'Multimeter', why: 'Verifies the strap actually reaches ground — about 1 MΩ through the safety resistor.' },
      { ref: 'kester-951-no-clean-flux-pen', role: 'Flux', why: 'No-clean flux for the fine-pitch joints repair work involves.' },
      { ref: 'mg-chemicals-824-isopropyl-alcohol', role: 'Cleaner', why: 'Removes flux residue from a repaired board so it does not attract dirt.' },
    ],
    faqs: [
      {
        question: 'Do I need ESD protection for simple LED kits?',
        answer: 'Not really — LEDs, resistors and most through-hole parts are robust. ESD gear earns its place once you handle microcontrollers, sensors, memory and modern repair work, where damage can be invisible and show up weeks later.',
      },
      {
        question: 'Why does the wrist strap have a resistor in it?',
        answer: 'The built-in resistor, typically around 1 megohm, lets static drain slowly while protecting you from a direct path to ground if you touch something live. Never replace the strap cord with plain wire.',
      },
    ],
    readMore: { label: 'ESD safety for soldering', href: '/guides/esd-safety-for-soldering' },
    updatedAt: '2026-10-20',
  },
  {
    id: 'battery-pack-tabbing-kit',
    title: 'Battery Tab Soldering Kit',
    tagline: 'A 100W iron, pure nickel strip, flux, a multimeter and the safety items for tabbing cells when a spot welder is not an option.',
    intro:
      'Soldering to cells is a compromise — spot-welding is the right tool — but when you must, the way to limit damage is heat for the shortest possible time. That means a powerful iron, plenty of flux, pure nickel strip that wets quickly, and a multimeter to match cells before you connect them.',
    body: [
      'The FNIRSI HS-02A delivers 100W, which sounds counter-intuitive for a heat-sensitive cell but is exactly the point: a hot, high-capacity tip makes the joint in a second or two, while a weak iron sits on the cell for ten seconds and cooks it. Flux first, tin the strip, tin the terminal briefly, then join.',
      'Pure nickel strip wets far better than nickel-plated steel and carries current without heating up. Match the strip width and thickness to the pack current; the 0.15 × 8 mm roll here suits most hobby packs.',
      'Safety items are not optional with lithium cells: glasses, a non-flammable mat, and a multimeter to check that every cell is at a similar voltage before they are joined. If the cells you buy come with pre-welded tabs, solder your wire to the tab and keep the heat off the cell entirely — our battery tab guide explains when to choose each approach.',
    ],
    items: [
      { ref: 'fnirsi-hs-02a-soldering-iron', role: 'Iron', why: '100W means the joint is made in seconds, which is how you keep heat out of the cell.' },
      { ref: 'shonan-pure-nickel-strip', role: 'Nickel strip', why: '99.6% pure nickel wets quickly and carries current without warming up.' },
      { ref: 'kester-951-no-clean-flux-pen', role: 'Flux', why: 'Flux on strip and terminal is what makes the joint take on the first touch.' },
      { ref: 'hgmzzq-60-40-rosin-core-solder', role: 'Solder', why: 'Rosin-core wire that flows at a lower temperature than lead-free, shortening contact time.' },
      { ref: 'astroai-am33d-digital-multimeter', role: 'Multimeter', why: 'Checks every cell is at a similar voltage before they are connected in parallel.' },
      { ref: 'tuofeng-22-awg-silicone-wire-kit', role: 'Lead wire', why: 'Silicone-insulated leads that survive the heat of the joint.' },
      { ref: 'ginsco-heat-shrink-tubing-kit', role: 'Heat-shrink', why: 'Insulates the finished joints and lead ends.' },
      { ref: 'nocry-anti-fog-safety-glasses', role: 'Safety glasses', why: 'Non-negotiable when working near lithium cells.' },
      { ref: 'pafowo-silicone-soldering-mat', role: 'Work mat', why: 'A non-flammable surface under the cells and the hot iron.' },
    ],
    faqs: [
      {
        question: 'Can I solder directly to an 18650 cell?',
        answer: 'It is possible with a powerful iron, flux and very short contact, but heat can damage the cell. Buying cells with pre-welded tabs, or spot-welding nickel strip, is safer. If you solder, this set is built to keep the contact time as short as possible.',
      },
      {
        question: 'Pure nickel or nickel-plated steel strip?',
        answer: 'Pure nickel. Plated steel is cheaper but has higher resistance, heats up under load and does not wet as well, so the joint takes longer and the cell gets hotter.',
      },
    ],
    readMore: { label: 'How to solder battery tabs (and when not to)', href: '/guides/how-to-solder-battery-tabs' },
    updatedAt: '2026-10-20',
  },
  {
    id: 'wire-splicing-kit',
    title: 'Wire Splicing and Repair Kit',
    tagline: 'A compact iron, hook-up wire, heat-shrink, cutters and a third hand for joining and repairing cables.',
    intro:
      'Most real-world soldering is not circuit boards — it is a broken charger lead, a speaker wire or a sensor cable that needs joining. This set is the kit for that: an iron that heats fast and stores small, wire to practise and repair with, heat-shrink to finish the splice properly and a holder so the two wires stay put while you work.',
    body: [
      'The FNIRSI HS-02A heats in seconds and has the power to tin a thick stranded wire quickly; it also packs into a case, which suits a kit that lives in a drawer rather than on a bench. A regulated budget iron works too if you already own one.',
      'The technique is simple once the wire is held still: strip, twist, tin both ends, lay them together and reflow. Helping hands hold each wire about two centimetres from the joint so the clips do not steal heat. Slide the heat-shrink on before you solder — everyone forgets once.',
      'Flush cutters make a cleaner strip and a tidier trim than scissors, and the silicone wire kit gives you six colours of flexible wire to repair with or to practise splices on. Our wire soldering guide walks through the steps with the Western Union splice.',
    ],
    items: [
      { ref: 'fnirsi-hs-02a-soldering-iron', role: 'Iron', why: 'Heats in seconds, has the power to tin thick stranded wire, and stores in its own case.' },
      { ref: 'hgmzzq-60-40-rosin-core-solder', role: 'Solder', why: 'Rosin-core wire wicks into twisted strands cleanly.' },
      { ref: 'ginsco-heat-shrink-tubing-kit', role: 'Heat-shrink', why: 'The proper way to insulate a splice — eleven sizes so one always fits.' },
      { ref: 'tuofeng-22-awg-silicone-wire-kit', role: 'Hook-up wire', why: 'Flexible wire in six colours for repairs and for practising the splice itself.' },
      { ref: 'kata-mini-flush-cutters', role: 'Cutters', why: 'A clean cut and trim; far better than scissors on stranded wire.' },
      { ref: 'kaisiking-helping-hands-magnifier', role: 'Third hand', why: 'Holds both wires still so your hands are free for iron and solder.' },
      { ref: 'kester-951-no-clean-flux-pen', role: 'Flux', why: 'Helps solder flow through a twisted splice instead of sitting on top.' },
    ],
    faqs: [
      {
        question: 'Do I need heat-shrink, or is electrical tape fine?',
        answer: 'Heat-shrink. Tape unwinds, gets sticky and leaves the joint unsupported. Adhesive-lined heat-shrink also seals the splice against moisture if the cable lives outdoors.',
      },
      {
        question: 'Why does my wire joint look dull and crumbly?',
        answer: 'That is a cold joint: the wire was not hot enough when the solder flowed, usually because the iron was too small or the clips were too close to the joint and acted as heat sinks. Tin both ends first and keep the holder clips a couple of centimetres back.',
      },
    ],
    readMore: { label: 'How to solder wires together', href: '/guides/how-to-solder-wires-together' },
    updatedAt: '2026-10-20',
  },
  {
    id: 'desoldering-kit',
    title: 'Desoldering and Rework Kit',
    tagline: 'Sucker, wick, flux, tip cleaner and cleaner — the small tools that undo mistakes and salvage parts.',
    intro:
      'You do not need a desoldering station to fix mistakes. A spring-loaded sucker for the bulk of the solder, wick for the last film, flux to make both work, and alcohol to clean up afterwards handle almost every through-hole repair a hobbyist meets.',
    body: [
      'Sucker and wick are not alternatives; they are a sequence. The sucker pulls most of the solder off a through-hole joint in one pull; the wick then lifts the thin film that is left so the lead comes free without prying. Our solder sucker vs wick comparison explains when each shines.',
      'Flux is what most people miss. Old solder has lost its flux and does not flow; a stroke from the pen revives it so the sucker gets a clean pull and the wick actually wicks. Keep the tip clean on brass wool between joints — a dirty tip transfers heat badly and makes every removal slower.',
      'Finish with isopropyl alcohol to clean the residue, especially after wick, which leaves a sticky film that attracts dust. Add this kit to any iron; it is the second thing to buy after the iron itself.',
    ],
    items: [
      { ref: 'viralloy-solder-sucker', role: 'Sucker', why: 'One pull removes most of the solder from a through-hole joint.' },
      { ref: 'towot-solder-wick-flux-kit', role: 'Wick + flux', why: 'Lifts the last film of solder so the lead comes free without prying at the pad.' },
      { ref: 'kester-951-no-clean-flux-pen', role: 'Flux', why: 'Revives old, flux-starved solder so it flows again.' },
      { ref: 'hakko-599b-brass-tip-cleaner', role: 'Tip cleaner', why: 'A clean tip transfers heat; a dirty one makes every removal slow.' },
      { ref: 'mg-chemicals-824-isopropyl-alcohol', role: 'Cleaner', why: 'Removes the sticky residue wick and flux leave behind.' },
      { ref: 'kaisiking-helping-hands-magnifier', role: 'Third hand', why: 'Holds the board while one hand works the iron and the other the sucker.' },
    ],
    faqs: [
      {
        question: 'Solder sucker or wick — which should I buy first?',
        answer: 'Both are cheap enough to buy together, which is why this set exists. If it must be one: the sucker for through-hole work, the wick for surface-mount and for cleaning pads.',
      },
      {
        question: 'Why will the solder not come off even with the sucker?',
        answer: 'Usually the joint is not fully molten when you trigger the sucker, or the solder has no flux left. Add flux, give the iron a moment longer, and trigger while the iron is still on the joint.',
      },
    ],
    readMore: { label: 'How to desolder', href: '/guides/how-to-desolder' },
    updatedAt: '2026-10-20',
  },
  {
    id: 'electronics-workbench-starter',
    title: 'Electronics Workbench Starter Set',
    tagline: 'The four bench tools in order — iron, multimeter, power supply, oscilloscope — plus the small tools that make them usable.',
    intro:
      'This is the bench we describe in our workbench essentials guide, assembled as one list. It is deliberately a buy-once set: a station with a long tip ecosystem, a true-RMS multimeter, a current-limited supply that protects new builds, and a scope that can actually show you what a circuit is doing.',
    body: [
      'The order matters. The iron comes first because nothing gets built without it; the multimeter next because it answers most "why doesn\'t it work" questions; the power supply third because its current limit turns a short into a warning instead of smoke; and the oscilloscope last, when you start needing to see signals rather than measure them.',
      'The Hakko FX-888DX is the station to keep for a decade. The AstroAI TRMS 6000 reads accurately on the mains and switching circuits a basic meter gets wrong. The Jesverty supply offers a proper adjustable current limit, and the FNIRSI 2C53T is a scope and meter in one that is good enough to learn on.',
      'The hand tools are the part people under-buy: a grounded mat, ESD tweezers, flush cutters and a vise are what make the bench pleasant to use every day rather than once a month.',
    ],
    items: [
      { ref: 'hakko-fx888dx-digital-soldering-station', role: 'Iron', why: 'The buy-once station: precise, ESD-safe, with the widest tip range in the hobby.' },
      { ref: 'astroai-trms-6000-auto-ranging-multimeter', role: 'Multimeter', why: 'True-RMS and auto-ranging, so readings on real-world circuits are trustworthy.' },
      { ref: 'jesverty-sps-3010-bench-power-supply', role: 'Power supply', why: 'An adjustable current limit that protects every new build on first power-up.' },
      { ref: 'fnirsi-2c53t-oscilloscope-multimeter', role: 'Oscilloscope', why: 'Scope and meter in one handheld — enough to see what a signal is doing while you learn.' },
      { ref: 'hpfix-esd-soldering-mat-kit', role: 'Mat + strap', why: 'A grounded, heat-resistant surface for the whole bench.' },
      { ref: 'xool-esd-precision-tweezers-set', role: 'Tweezers', why: 'Fine ESD-safe tips for small parts.' },
      { ref: 'kata-mini-flush-cutters', role: 'Cutters', why: 'Lead trimming and wire work.' },
      { ref: 'stickvise-pcb-vise', role: 'Board holder', why: 'Holds boards flat for soldering, probing and inspection.' },
    ],
    faqs: [
      {
        question: 'Do I need all four bench tools at once?',
        answer: 'No — buy in the order listed. Iron first, multimeter second, supply third, scope only when you start working with signals. The set is arranged so each line is the next sensible purchase.',
      },
      {
        question: 'Is a handheld scope good enough?',
        answer: 'For learning and hobby debugging, yes. A benchtop scope like the Rigol DS1054Z from our oscilloscope roundup is the step up when you need more bandwidth and channels.',
      },
    ],
    readMore: { label: 'Electronics workbench essentials', href: '/electronics-workbench-essentials' },
    updatedAt: '2026-10-20',
  },
];
