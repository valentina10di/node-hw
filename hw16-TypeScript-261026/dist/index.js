"use strict";
// Задание 1
// Функция приветствия
// 1 Напишите функцию `greetUser`, которая принимает имя пользователя (строка) и выводит приветственное сообщение в консоль: `"Привет, <name>!"`. Используйте строгую типизацию.
function greetUser(name) {
    return (`Привет, ${name}`);
}
console.log(greetUser('Nataly'));
function printPersonInfo(person) {
    console.log(`Имя: ${person.name}, Возраст: ${person.age}, Город: ${person.city}`);
}
const person = {
    name: 'Jon',
    age: 24,
    city: 'London'
};
printPersonInfo(person);
// Задание 3
// Простая типизация для числового параметра
// 1 Напишите функцию `squareNumber`, которая принимает число и возвращает его квадрат. Используйте строгую типизацию.
function squareNumber(a) {
    return a * a;
}
console.log(squareNumber(10));
// Задание 4
// Типизация функции с boolean
// 1 Напишите функцию `isEven`, которая принимает число и возвращает `true`, если число четное, и `false`, если нечетное. Используйте строгую типизацию.
function isEven(num) {
    return num % 2 === 0;
}
console.log(isEven(8));
console.log(isEven(7));
function printStudentInfo(student) {
    console.log(`Студент: ${student.name}, Оценка: ${student.grade}`);
}
const student = {
    name: 'Mark',
    grade: 7,
};
printStudentInfo(student);
// Задание 6
// Функция с типом `void`
// 1 Напишите функцию `logMessage`, которая принимает строку и выводит её в консоль без возвращаемого значения. Используйте тип `void`.
function logMessage(message) {
    console.log(message);
}
logMessage("Привет, TypeScript!");
//# sourceMappingURL=index.js.map