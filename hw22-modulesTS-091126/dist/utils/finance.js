// Задание 2
// Пространства имен для финансовых операций
// 1 Создайте файл `finance.ts`, в котором определите пространство имен `Finance`. 
// 2 Внутри него создайте классы:
// `LoanCalculator`, который рассчитывает ежемесячные платежи по кредиту по формуле аннуитета.
// `TaxCalculator`, который рассчитывает налог на доход.
// 3 Используйте эти классы в файле `main.ts` для расчета платежей по кредиту и налога на примерных данных.
export var Finance;
(function (Finance) {
    // расчет ежемесячных платежей по кредиту
    class LoanCalculator {
        loanAmount;
        annualInterestRate;
        loanTermYears;
        constructor(loanAmount, annualInterestRate, loanTermYears) {
            this.loanAmount = loanAmount;
            this.annualInterestRate = annualInterestRate;
            this.loanTermYears = loanTermYears;
            if (loanAmount <= 0 || annualInterestRate < 0 || loanTermYears <= 0) {
                throw new Error('Некорректные данные кредита');
            }
        }
        // Расчет ежемесячного платежа по формуле аннуитета
        calculateMonthlyPayment() {
            const monthlyInterestRate = this.annualInterestRate / 100 / 12;
            const totalPayments = this.loanTermYears * 12;
            if (monthlyInterestRate === 0) {
                return this.loanAmount / totalPayments;
            }
            const monthlyPayment = (this.loanAmount *
                monthlyInterestRate *
                Math.pow(1 + monthlyInterestRate, totalPayments)) /
                (Math.pow(1 + monthlyInterestRate, totalPayments) - 1);
            return monthlyPayment;
        }
    }
    Finance.LoanCalculator = LoanCalculator;
    // расчет налога на доход
    class TaxCalculator {
        annualIncome;
        taxRate;
        constructor(annualIncome, taxRate) {
            this.annualIncome = annualIncome;
            this.taxRate = taxRate;
            if (annualIncome < 0 || taxRate < 0 || taxRate > 100) {
                throw new Error('Некорректные данные для расчета налога');
            }
        }
        // Расчет налога на доход
        calculateIncomeTax() {
            return (this.annualIncome * this.taxRate) / 100;
        }
    }
    Finance.TaxCalculator = TaxCalculator;
})(Finance || (Finance = {}));
//# sourceMappingURL=finance.js.map