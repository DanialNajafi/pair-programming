import { isLeapYear } from './utils';

export interface Employment {
  startDate: Date;
  untilDate: Date;
  percentage: number;
}

export function calculateProRataVacationDays(employment: Employment, vacationDays: number): number {
  const year = employment.startDate.getFullYear();
  const firstDay = new Date(year, 0, 1);      // 1. Januar
  const lastDay = new Date(year, 11, 31);       // 31. Dezember

  // Volle Ferientage, wenn die Anstellung das ganze Jahr umfasst und 100% beträgt
  if (
    employment.startDate.getTime() === firstDay.getTime() &&
    employment.untilDate.getTime() === lastDay.getTime() &&
    employment.percentage === 100
  ) {
    return vacationDays;
  }

  // Berechnung der gearbeiteten Tage (inklusive Start- und Enddatum)
  const startUTC = Date.UTC(employment.startDate.getFullYear(), employment.startDate.getMonth(), employment.startDate.getDate());
  const endUTC = Date.UTC(employment.untilDate.getFullYear(), employment.untilDate.getMonth(), employment.untilDate.getDate());
  const daysWorked = Math.floor((endUTC - startUTC) / (1000 * 60 * 60 * 24)) + 1;

  // Bestimme die Anzahl der Tage im Jahr (Schaltjahr beachten)
  const totalDaysInYear = isLeapYear(year) ? 366 : 365;

  // Pro-Rata-Berechnung der Ferientage
  return vacationDays * (daysWorked / totalDaysInYear) * (employment.percentage / 100);
}
