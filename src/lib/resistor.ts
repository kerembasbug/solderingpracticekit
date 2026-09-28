/** Resistor colour code data (IEC 60062) and helpers shared by the tool pages. */
export interface BandColor {
  name: string;
  /** Swatch used to draw the band; these are the physical code colours, not theme colours. */
  hex: string;
  digit?: number;
  multiplier?: number;
  tolerance?: number;
}

export const COLORS: BandColor[] = [
  { name: 'Black', hex: '#1f1f1f', digit: 0, multiplier: 1 },
  { name: 'Brown', hex: '#7a4a24', digit: 1, multiplier: 10, tolerance: 1 },
  { name: 'Red', hex: '#d0312d', digit: 2, multiplier: 100, tolerance: 2 },
  { name: 'Orange', hex: '#ef7d18', digit: 3, multiplier: 1e3 },
  { name: 'Yellow', hex: '#f4c20d', digit: 4, multiplier: 1e4 },
  { name: 'Green', hex: '#2e8b3d', digit: 5, multiplier: 1e5, tolerance: 0.5 },
  { name: 'Blue', hex: '#1f6fd1', digit: 6, multiplier: 1e6, tolerance: 0.25 },
  { name: 'Violet', hex: '#7b3fb8', digit: 7, multiplier: 1e7, tolerance: 0.1 },
  { name: 'Grey', hex: '#8c8c8c', digit: 8, multiplier: 1e8, tolerance: 0.05 },
  { name: 'White', hex: '#f4f4f4', digit: 9, multiplier: 1e9 },
  { name: 'Gold', hex: '#c8a23a', multiplier: 0.1, tolerance: 5 },
  { name: 'Silver', hex: '#b9bec4', multiplier: 0.01, tolerance: 10 },
];

export const byName = (name: string) => COLORS.find((c) => c.name === name);

/** Format ohms as a readable value: 4700 -> "4.7 kΩ". */
export function formatOhms(ohms: number): string {
  const trim = (n: number) => String(Number(n.toPrecision(4)));
  if (ohms >= 1e9) return `${trim(ohms / 1e9)} GΩ`;
  if (ohms >= 1e6) return `${trim(ohms / 1e6)} MΩ`;
  if (ohms >= 1e3) return `${trim(ohms / 1e3)} kΩ`;
  return `${trim(ohms)} Ω`;
}

/** Value from digit bands plus a multiplier band. */
export function bandsToOhms(digits: string[], multiplier: string): number | null {
  const d = digits.map((n) => byName(n)?.digit);
  const m = byName(multiplier)?.multiplier;
  if (d.some((x) => x === undefined) || m === undefined) return null;
  return Number(d.join('')) * m;
}

/** 4-band colours for a value (2 significant digits), e.g. 4700 -> Yellow Violet Red. */
export function ohmsToFourBand(ohms: number): string[] | null {
  for (const c of COLORS) {
    if (c.multiplier === undefined) continue;
    const sig = ohms / c.multiplier;
    if (Number.isInteger(Math.round(sig * 1e6) / 1e6) && sig >= 10 && sig <= 99) {
      const [a, b] = String(Math.round(sig)).split('').map(Number);
      const ca = COLORS.find((x) => x.digit === a);
      const cb = COLORS.find((x) => x.digit === b);
      if (ca && cb) return [ca.name, cb.name, c.name];
    }
  }
  return null;
}

/** E12 and E24 preferred values within one decade. */
export const E12 = [1.0, 1.2, 1.5, 1.8, 2.2, 2.7, 3.3, 3.9, 4.7, 5.6, 6.8, 8.2];
export const E24 = [1.0, 1.1, 1.2, 1.3, 1.5, 1.6, 1.8, 2.0, 2.2, 2.4, 2.7, 3.0, 3.3, 3.6, 3.9, 4.3, 4.7, 5.1, 5.6, 6.2, 6.8, 7.5, 8.2, 9.1];

/** The nearest standard value at or above `ohms` in the given series. */
export function nextStandard(ohms: number, series: number[] = E12): number {
  if (ohms <= 0) return 0;
  const decade = 10 ** Math.floor(Math.log10(ohms));
  for (const v of [...series.map((s) => s * decade), 10 * decade]) {
    if (v >= ohms * 0.9999) return Number(v.toPrecision(3));
  }
  return 10 * decade;
}
