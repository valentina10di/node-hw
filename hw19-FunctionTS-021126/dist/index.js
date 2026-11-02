// Домашняя работа 19
// Задание 1
// Напишите стрелочную функцию `sumEvenNumbers`, которая принимает массив чисел и возвращает сумму всех четных чисел.
function sumEvenNumbers(arr) {
    return arr
        .filter(num => num % 2 === 0)
        .reduce((sum, num) => sum + num, 0);
}
;
console.log(sumEvenNumbers([1, 2, 3, 4, 5, 6]));
console.log(sumEvenNumbers([1, 3, 5]));
;
const stringToBooleanFunc = (text) => text.trim() === '';
console.log(stringToBooleanFunc(""));
console.log(stringToBooleanFunc("   "));
console.log(stringToBooleanFunc("Hello"));
const compareStrings = (a, b) => a.length === b.length;
console.log(compareStrings('helllo', 'привет'));
console.log(compareStrings('мир', 'world'));
// Задание 4
// Напишите обобщенную функцию `getLastElement`, которая принимает массив любого типа и возвращает последний элемент этого массива.
function getLastElement(arr) {
    return arr[arr.length - 1];
}
console.log(getLastElement([10, 20, 30, 40, 50]));
console.log(getLastElement(["яблоко", "банан", "апельсин"]));
console.log(getLastElement([{ id: 1, name: "Alex" }, { id: 2, name: "Lili" }]));
const makeTriple = (a, b, c) => {
    return [a, b, c];
};
console.log(makeTriple(10, 20, 30));
console.log(makeTriple("раз", "два", "три"));
console.log(makeTriple(true, false, true));
export {};
//# sourceMappingURL=index.js.map