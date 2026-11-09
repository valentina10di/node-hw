import { UserManagement } from "./utils/userManagement.js";
import { Finance } from "./utils/finance.js";
import { capitalize, reverseString } from "./utils/stringUtils.js";
import { generateFibonacci, generatePrimeNumbers } from "./utils/sequenceUtils.js";
const text1 = 'hello world';
console.log(capitalize(text1));
console.log(capitalize(''));
const text2 = 'TypeScript';
console.log(reverseString(text2));
console.log(reverseString(''));
// 1. Расчет кредита
const loanCalc = new Finance.LoanCalculator(250000, 5.5, 15);
const monthlyPayment = loanCalc.calculateMonthlyPayment();
console.log("Расчет кредита");
console.log(`Ежемесячный аннуитетный платеж: ${monthlyPayment.toFixed(2)} €\n`);
// 2. Расчет налога
const annualIncome = 48000;
const taxCalc = new Finance.TaxCalculator(annualIncome, 19);
const taxAmount = taxCalc.calculateIncomeTax();
console.log("Расчет налога");
console.log(`Сумма налога к уплате: ${taxAmount.toFixed(2)} €`);
console.log(`Доход после вычета налога: ${(annualIncome - taxAmount).toFixed(2)} €`);
// 1. Создаем нового администратора 
const admin = new UserManagement.Admin.AdminUser("Анна Смирнова", "anna.admin@example.com", false);
console.log("Информация при создании");
admin.getInfo();
// 2. делаем супер-администратором
console.log("Изменение прав доступа");
admin.setSuperAdminStatus(true);
// 3. Проверяем обновленный статус
console.log("Проверка после изменения");
admin.getInfo();
console.log(`Статус супер-администратора: ${admin.checkSuperAdminStatus()}`);
const fibLimit = 50;
const fibonacciSequence = generateFibonacci(fibLimit);
console.log(`Числа Фибоначчи до ${fibLimit}`);
console.log(fibonacciSequence.join(", "));
const primeLimit = 50;
const primeNumbers = generatePrimeNumbers(primeLimit);
console.log(`Простые числа до ${primeLimit}`);
console.log(primeNumbers.join(", "));
//# sourceMappingURL=main.js.map