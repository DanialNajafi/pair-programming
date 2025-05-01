import { calculatePayslip } from "./payroll";

test ("16 jähriger Lernender mit 700.-", () => {
const result = calculatePayslip ({
born: new Date("2009-05-01"),
payday: new Date("2025-04-01"),
gross: 700,
});
expect(result.totalDeductions).toBe(0);
expect(result.net).toBe(700);
});

test ("18 jähriger Lernender mit 1200.-", () => {
const result = calculatePayslip ({
born: new Date("2006-01-01"),
payday: new Date("2025-04-01"),
gross: 1200,
});
expect(result.totalDeductions).toBeGreaterThan(0);
});

test ("21 jähriger Lernender mit 5900.-", () => {
const result = calculatePayslip ({
born: new Date("2004-01-01"),
payday: new Date("2025-04-01"),
gross: 5900,
});
expect(result.totalDeductions).toBeGreaterThan(0);
expect(result.net).toBeCloseTo(5900 - result.totalDeductions);
});
