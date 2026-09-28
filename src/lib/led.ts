import { nextStandard } from '@/lib/resistor';

/** Typical forward voltages; always prefer the LED's datasheet when you have it. */
export const LED_PRESETS = [
  { name: 'Red', vf: 2.0 },
  { name: 'Orange', vf: 2.0 },
  { name: 'Yellow', vf: 2.1 },
  { name: 'Green (standard)', vf: 2.2 },
  { name: 'Green (bright / true green)', vf: 3.1 },
  { name: 'Blue', vf: 3.1 },
  { name: 'White', vf: 3.1 },
] as const;

export interface LedResult {
  ok: boolean;
  exact: number;
  standard: number;
  /** Current in mA through the chosen standard resistor. */
  actualmA: number;
  /** Power dissipated in the resistor, watts. */
  resistorW: number;
  /** Suggested resistor rating with a 2x safety margin. */
  rating: string;
}

export function ledResistor(supplyV: number, vf: number, count: number, mA: number): LedResult {
  const drop = supplyV - vf * count;
  const amps = mA / 1000;
  if (!(drop > 0) || !(amps > 0) || !(count >= 1)) {
    return { ok: false, exact: 0, standard: 0, actualmA: 0, resistorW: 0, rating: '' };
  }
  const exact = drop / amps;
  const standard = nextStandard(exact);
  const actual = drop / standard;
  const watts = actual * actual * standard;
  const need = watts * 2;
  // 1/4 W is the everyday through-hole size, so nothing smaller is suggested.
  const rating = need <= 0.25 ? '1/4 W (standard)' : need <= 0.5 ? '1/2 W' : need <= 1 ? '1 W' : '2 W or more';
  return { ok: true, exact, standard, actualmA: actual * 1000, resistorW: watts, rating };
}
