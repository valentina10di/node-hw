// Домашняя работа 19
// Задание 1

import { text } from "node:stream/consumers";

// Напишите стрелочную функцию `sumEvenNumbers`, которая принимает массив чисел и возвращает сумму всех четных чисел.
function sumEvenNumbers(arr: number[]): number{
    return arr
    .filter(num => num % 2 === 0)       
    .reduce((sum, num) => sum + num, 0);
};
console.log(sumEvenNumbers([1, 2, 3, 4, 5, 6]));
console.log(sumEvenNumbers([1, 3, 5]));

// Задание 2
// Определите интерфейс `StringToBooleanFunction` для функции, которая принимает строку и возвращает `boolean` (например, проверяет, является ли строка пустой). Реализуйте такую функцию.
interface StringToBooleanFunction{
    (text: string): boolean
};

const stringToBooleanFunc: StringToBooleanFunction = (text) => text.trim() === '' ; 

console.log(stringToBooleanFunc(""));     
console.log(stringToBooleanFunc("   "));   
console.log(stringToBooleanFunc("Hello"));


// Задание 3
// Создайте тип `CompareStrings` для функции, принимающей две строки и возвращающей `boolean` (например, для проверки равенства строк). Напишите функцию, соответствующую этому типу.
type CompareStrings = (a: string, b: string) => boolean;
const compareStrings: CompareStrings = (a, b) => a.length === b.length;

console.log(compareStrings('helllo', 'привет'));
console.log(compareStrings('мир', 'world'))


// Задание 4
// Напишите обобщенную функцию `getLastElement`, которая принимает массив любого типа и возвращает последний элемент этого массива.

function getLastElement<T> (arr: T[]): T {
    return arr[arr.length - 1];
}
console.log(getLastElement([10, 20, 30, 40, 50]));
console.log(getLastElement(["яблоко", "банан", "апельсин"]));
console.log(getLastElement([{ id: 1, name: "Alex" }, { id: 2, name: "Lili" }]));

// Задание 5
// Создайте обобщенную функцию `make Triple`, которая принимает три аргумента одного типа и возвращает массив из этих трёх элементов.
// 1. Объявляем интерфейс, описывающий функцию, которая принимает три аргумента типа T
// и возвращает массив из трех элементов T[]
interface MakeTriple {
  <T>(a: T, b: T, c: T): T[];
}

const makeTriple: MakeTriple = (a, b, c) => {
  return [a, b, c];
};

console.log(makeTriple(10, 20, 30)); 
console.log(makeTriple("раз", "два", "три")); 
console.log(makeTriple(true, false, true)); 