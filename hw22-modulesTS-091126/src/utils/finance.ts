// Задание 2
// Пространства имен для финансовых операций
// 1 Создайте файл `finance.ts`, в котором определите пространство имен `Finance`. 
// 2 Внутри него создайте классы:
// `LoanCalculator`, который рассчитывает ежемесячные платежи по кредиту по формуле аннуитета.
// `TaxCalculator`, который рассчитывает налог на доход.
// 3 Используйте эти классы в файле `main.ts` для расчета платежей по кредиту и налога на примерных данных.
export namespace Finance {

  // расчет ежемесячных платежей по кредиту
  export class LoanCalculator {

    constructor(
      private readonly loanAmount: number,
      private readonly annualInterestRate: number,
      private readonly loanTermYears: number
    ) {
      if (loanAmount <= 0 || annualInterestRate < 0 || loanTermYears <= 0) {
        throw new Error('Некорректные данные кредита');
      }
    }

    // Расчет ежемесячного платежа по формуле аннуитета
    public calculateMonthlyPayment(): number {
      const monthlyInterestRate = this.annualInterestRate / 100 / 12;
      const totalPayments = this.loanTermYears * 12;

      if (monthlyInterestRate === 0) {
        return this.loanAmount / totalPayments;
      }

      const monthlyPayment =
        (this.loanAmount *
          monthlyInterestRate *
          Math.pow(1 + monthlyInterestRate, totalPayments)) /
        (Math.pow(1 + monthlyInterestRate, totalPayments) - 1);

      return monthlyPayment;
    }
  }


  // расчет налога на доход
  export class TaxCalculator {

    constructor(
      private readonly annualIncome: number,
      private readonly taxRate: number
    ) {
      if (annualIncome < 0 || taxRate < 0 || taxRate > 100) {
        throw new Error('Некорректные данные для расчета налога');
      }
    }

    // Расчет налога на доход
    public calculateIncomeTax(): number {
      return (this.annualIncome * this.taxRate) / 100;
    }
  }
}