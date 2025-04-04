import { calculateProRataVacationDays, Employment } from './vacation-days';

describe('calculateProRataVacationDays', () => {
  it('Vollzeitanstellung über das ganze Jahr', () => {
    const employment: Employment = {
      startDate: new Date(2025, 0, 1),   // 1. Januar 2025
      untilDate: new Date(2025, 11, 31),   // 31. Dezember 2025
      percentage: 100,
    };
    expect(calculateProRataVacationDays(employment, 25)).toBe(25);
  });

  it('Teilzeitanstellung über das ganze Jahr', () => {
    const employment: Employment = {
      startDate: new Date(2025, 0, 1),
      untilDate: new Date(2025, 11, 31),
      percentage: 50,
    };
    // Berechnung: 25 * (365/365) * 0.5 = 12.5 Ferientage
    expect(calculateProRataVacationDays(employment, 25)).toBeCloseTo(12.5, 2);
  });

  it('Vollzeitanstellung über weniger als das ganze Jahr', () => {
    // Beispiel: 1. Januar 2025 bis 31. März 2025 (31 + 28 + 31 = 90 Tage, da 2025 kein Schaltjahr ist)
    const employment: Employment = {
      startDate: new Date(2025, 0, 1),
      untilDate: new Date(2025, 2, 31),
      percentage: 100,
    };
    expect(calculateProRataVacationDays(employment, 25)).toBeCloseTo(25 * (90 / 365), 2);
  });

  it('Teilzeitanstellung über weniger als das ganze Jahr', () => {
    // Beispiel: 1. Januar 2025 bis 31. März 2025, 70% Pensum
    const employment: Employment = {
      startDate: new Date(2025, 0, 1),
      untilDate: new Date(2025, 2, 31),
      percentage: 70,
    };
    expect(calculateProRataVacationDays(employment, 25)).toBeCloseTo(25 * (90 / 365) * 0.7, 2);
  });
});
