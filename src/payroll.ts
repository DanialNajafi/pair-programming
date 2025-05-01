export type Salary = {
  born: Date;
  payday: Date;
  gross: number;
};

export type Deductions = Map<string, number>;

export const DEDUCTION_RATES: Deductions = new Map([
  ["AHV", 8.7],
  ["IV", 1.4],
  ["EO", 0.5],
  ["ALV", 1.1],
  ["NBU", 0.73],
  ["PK", 8.9],
]);

export type Payslip = {
  salary: Salary;
  deductions: Deductions;
  totalDeductions: number;
  net: number;
};

function getAHVStartDate(born: Date): Date{
return new Date(born.getFullYear() + 18, 0, 1);
}

export function calculatePayslip(salary: Salary): Payslip {
  // TODO: implement

const yearly = salary.gross * 12;
const over17 = salary.payday >= getAHVStartDate(salary.born);

const deductions: Deductions = new Map();

if (over17) {

deductions.set("AHV", salary.gross * DEDUCTION_RATES.get("AHV")! / 100);
deductions.set("IV", salary.gross * DEDUCTION_RATES.get("IV")! / 100);
deductions.set("EO", salary.gross * DEDUCTION_RATES.get("EO")! / 100);
}

if (yearly >= 2500) {
deductions.set("ALV", salary.gross * DEDUCTION_RATES.get("ALV")! / 100);
deductions.set("NBU", salary.gross * DEDUCTION_RATES.get("NBU")! / 100);
}

if (yearly >= 22680) {
deductions.set("PK", salary.gross * DEDUCTION_RATES.get("PK")! / 100);
}

let total = 0;

for (const v of deductions.values()){

total += v;

}

const net = salary.gross - total;

return {
salary, deductions, totalDeductions: total, net
};

}
