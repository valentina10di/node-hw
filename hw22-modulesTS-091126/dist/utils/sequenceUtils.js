// Задание 4
// Модули для работы с числовыми последовательностями
// 1 Создайте файл `sequenceUtils.ts`, в котором определите функции:
// `generateFibonacci`, которая генерирует последовательность Фибоначчи до указанного числа.
// `generatePrimeNumbers`, которая генерирует простые числа до указанного числа.
// 2 В файле `main.ts` импортируйте эти функции и протестируйте их на примерах.
// sequenceUtils.ts
export function generateFibonacci(limit) {
    if (typeof limit !== 'number') {
        throw new TypeError("Лимит должен быть числом.");
    }
    if (limit < 0) {
        throw new Error("Лимит не может быть отрицательным числом.");
    }
    const fibonacci = [];
    if (limit >= 0) {
        fibonacci.push(0);
    }
    if (limit >= 1) {
        fibonacci.push(1);
    }
    while (true) {
        const nextValue = fibonacci[fibonacci.length - 1] + fibonacci[fibonacci.length - 2];
        if (nextValue > limit) {
            break;
        }
        fibonacci.push(nextValue);
    }
    return fibonacci;
}
export function generatePrimeNumbers(limit) {
    // Проверка корректности входных данных
    if (typeof limit !== 'number') {
        throw new TypeError("Лимит должен быть числом.");
    }
    if (limit < 2) {
        return []; // Простых чисел меньше 2 не существует
    }
    const primes = [];
    // Проверяем каждое число от 2 до limit
    for (let num = 2; num <= limit; num++) {
        let isPrime = true;
        // Проверяем, делится ли число на какое-либо число от 2 до квадратного корня из num
        for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i === 0) {
                isPrime = false;
                break;
            }
        }
        if (isPrime) {
            primes.push(num);
        }
    }
    return primes;
}
//# sourceMappingURL=sequenceUtils.js.map