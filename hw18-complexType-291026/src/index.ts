// Домашняя работа 18
// Задание 1
// Объединение и пересечение типов
// 1 Создайте два типа: `Admin` и `User`.
// 2 Тип `Admin` должен включать поля `name` (строка) и `permissions` (массив строк), а тип `User` должен включать поля `name` (строка) и `email` (строка).
// 3 Создайте тип `AdminUser`, который объединяет свойства обоих типов, и создайте объект этого типа.
type Admin = {
   name: string;
   permissions: string [];
};

type User = {
   name: string;
   email: string;
};

type AdminUser = Admin & User;

const admin: AdminUser= {
   name: "Алексей",
   permissions: ["read", "write", "delete"], 
   email: "alex@example.com"
}
console.log(admin);


// Задание 2
// Вложенные объекты и опциональные поля
// 1 Создайте объект `Car` с полями `make` (строка), `model` (строка), и вложенным объектом `engine`, который имеет поля `type` (строка) и `horsepower` (число).
// 2 Добавьте опциональное поле `year` (число) для года выпуска машины.
// 3 Напишите функцию, которая выводит информацию о машине.
type Car = {
   make: string;
   model: string;
   engine: {
      type: string;
      horsepower: number;
   };
   year?: number; 
};

const myCar: Car = {
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

function printCarInfo(car: Car): void {
   console.log(`Автомобиль: ${car.make} ${car.model}`);
   console.log(`Двигатель: ${car.engine.type}, ${car.engine.horsepower} л.с.`);
   
   if (car.year !== undefined) {
      console.log(`Год выпуска: ${car.year}`);
   } else {
      console.log(`Год выпуска: не указан`);
   }
}
printCarInfo(myCar);

// Задание 3
// Интерфейс для функции с объектом
// 1 Создайте интерфейс для функции `calculateDiscount`, которая принимает объект `Product` с полями `name` (строка) и `price` (число), а также параметр `discount` (число).
// 2 Функция должна возвращать новую цену продукта с учетом скидки.
interface Product {
   name: string;
   price: number;
};
const laptop: Product = {
   name: "Ноутбук",
   price: 10000
};

interface CalculateDiscountFunc {
   (product: Product, discount: number): number;
};
const calculateDiscount: CalculateDiscountFunc = (product, discount) => {
   const discountAmount = (product.price * discount) / 100;
   return product.price - discountAmount;
};
const finalPrice = calculateDiscount(laptop, 15)
console.log(`Товар: ${laptop.name}, Цена со скидкой: ${finalPrice}`);


// Задание 5
// Массив объектов и функции
// 1 Создайте интерфейс `Employee`, который включает поля `name` (строка) и `salary` (число).
// 2 Создайте массив объектов `Employee`, затем напишите функцию, которая принимает этот массив и возвращает массив зарплат всех сотрудников.

interface Employee {
   name: string;
   salary: number;
}

const employees: Employee[] = [
   { name: "Alex", salary: 60000 },
   { name: "Rozi", salary: 85000 },
   { name: "Jon", salary: 50000 }
];

function getSalaries(empList: Employee[]): number[] {
   return empList.map(employee => employee.salary);
}

const salaries = getSalaries(employees);
console.log(salaries); 



// Задание 5
// Наследование интерфейсов и работа с объектами
// 1 Создайте интерфейс `Person` с полями `firstName` (строка) и `lastName` (строка).
// 2 Создайте интерфейс `Student`, который наследует `Person` и добавляет поле `grade` (число).
// 3 Создайте объект `student` этого типа и напишите функцию, которая выводит полное имя студента и его оценку.
interface Person {
   firstName: string;
   lastName: string;
};
interface Student extends Person {
   grade: number; // Оценка или курс
};
const student: Student = {
   firstName: "Максим",
   lastName: "Смирнов",
   grade: 4
};
function printStudentInfo(stud: Student): void {
   console.log(`Студент: ${stud.firstName} ${stud.lastName}`);
   console.log(`Оценка: ${stud.grade}`);
}
printStudentInfo(student);


// Задание 6
// Интерфейс для функции с несколькими параметрами
// 1 Создайте интерфейс для функции `concatStrings`, которая принимает два параметра: `str1` и `str2` (оба строки) и возвращает их объединение.
// 2 Реализуйте эту функцию и протестируйте её.
interface ConcatFunc {
   (str1: string, str2: string): string;
};
const concatStrings: ConcatFunc = (str1, str2) => {
   return str1 + str2;
};
const result1 = concatStrings("Hello, ", "TypeScript!");
console.log(result1);
const result2 = concatStrings("Привет, ", "мир!");
console.log(result2);