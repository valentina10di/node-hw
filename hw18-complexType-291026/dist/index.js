"use strict";
const admin = {
    name: "Алексей",
    permissions: ["read", "write", "delete"],
    email: "alex@example.com"
};
console.log(admin);
const myCar = {
    make: "Toyota",
    model: "Camry",
    engine: {
        type: "Бензин",
        horsepower: 249
    },
    year: 2023
};
// const myCar: Car = {
//    make: "Tesla",
//    model: "Model 3",
//    engine: {
//       type: "Электро",
//       horsepower: 283
//    },
// };
function printCarInfo(car) {
    console.log(`Автомобиль: ${car.make} ${car.model}`);
    console.log(`Двигатель: ${car.engine.type}, ${car.engine.horsepower} л.с.`);
    if (car.year !== undefined) {
        console.log(`Год выпуска: ${car.year}`);
    }
    else {
        console.log(`Год выпуска: не указан`);
    }
}
printCarInfo(myCar);
;
const laptop = {
    name: "Ноутбук",
    price: 10000
};
;
const calculateDiscount = (product, discount) => {
    const discountAmount = (product.price * discount) / 100;
    return product.price - discountAmount;
};
const finalPrice = calculateDiscount(laptop, 15);
console.log(`Товар: ${laptop.name}, Цена со скидкой: ${finalPrice}`);
const employees = [
    { name: "Alex", salary: 60000 },
    { name: "Rozi", salary: 85000 },
    { name: "Jon", salary: 50000 }
];
function getSalaries(empList) {
    return empList.map(employee => employee.salary);
}
const salaries = getSalaries(employees);
console.log(salaries);
;
;
const student = {
    firstName: "Максим",
    lastName: "Смирнов",
    grade: 4
};
function printStudentInfo(stud) {
    console.log(`Студент: ${stud.firstName} ${stud.lastName}`);
    console.log(`Оценка: ${stud.grade}`);
}
printStudentInfo(student);
;
const concatStrings = (str1, str2) => {
    return str1 + str2;
};
const result1 = concatStrings("Hello, ", "TypeScript!");
console.log(result1);
const result2 = concatStrings("Привет, ", "мир!");
console.log(result2);
//# sourceMappingURL=index.js.map