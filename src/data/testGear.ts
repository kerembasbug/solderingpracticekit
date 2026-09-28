/** Test & measurement products grouped by the roundup that ranks them. */
export const TEST_GEAR_GROUPS = [
  {
    key: 'multimeters',
    label: 'Multimeters',
    href: '/best-multimeters-for-electronics',
    slugs: [
      'astroai-trms-6000-auto-ranging-multimeter',
      'astroai-am33d-digital-multimeter',
      'klein-tools-mm325-multimeter',
      'fluke-17b-plus-digital-multimeter',
    ],
  },
  {
    key: 'oscilloscopes',
    label: 'Oscilloscopes',
    href: '/best-oscilloscopes-for-beginners',
    slugs: [
      'fnirsi-2c53t-oscilloscope-multimeter',
      'fnirsi-dso152-handheld-oscilloscope',
      'hantek-dso2c10-digital-oscilloscope',
      'rigol-ds1054z-digital-oscilloscope',
    ],
  },
  {
    key: 'power-supplies',
    label: 'Bench Power Supplies',
    href: '/best-bench-power-supplies',
    slugs: [
      'jesverty-sps-3010-bench-power-supply',
      'nankadf-30v-10a-bench-power-supply',
      'wanptek-30v-10a-bench-power-supply',
      'wanptek-tps-c3010h-bench-power-supply',
    ],
  },
] as const;

export function testGearGroupFor(slug: string) {
  return TEST_GEAR_GROUPS.find((g) => (g.slugs as readonly string[]).includes(slug));
}
