"use strict";
// Домашняя работа 17
// Задание 1
// Типизация функции с несколькими параметрами
// 1 Напишите функцию `calculateTotal`, которая принимает три параметра:  
// `price` (число)  
// `quantity` (число)  
// `discount` (число, по умолчанию равен 0)
// 2 Функция должна возвращать общую стоимость товаров с учетом скидки. Если скидка не указана, она считается равной нулю.
const calculateTotal = (price, quantity, discount = 0) => {
    return price * quantity * (1 - discount / 100);
};
console.log(calculateTotal(100, 2, 10));
// Задание 2
// Использование Union типов
// 1 Создайте переменную `id`, которая может быть либо строкой, либо числом.  
// 2 Напишите функцию `displayId`, которая принимает эту переменную и выводит сообщение, содержащее значение ID. Если `id` — строка, выведите её в верхнем регистре. Если `id` — число, умножьте его на 10 перед выводом.
let id;
function displayId(idParam) {
    if (typeof idParam === "string") {
        console.log(idParam.toUpperCase());
    }
    else {
        console.log(idParam * 10);
    }
}
id = "abc123";
displayId(id);
id = 5;
displayId(id);
const orders = [
    { orderId: "A1", amount: 150, status: "pending" },
    { orderId: "B2", amount: 400, status: "shipped" },
    { orderId: "C3", amount: 250, status: "delivered" },
    { orderId: "D4", amount: 100, status: "pending" }
];
function filterOrdersByStatus(ordersArray, targetStatus) {
    return ordersArray.filter(order => order.status === targetStatus);
}
const pendingOrders = filterOrdersByStatus(orders, "pending");
console.log("Заказы в ожидании (pending):", pendingOrders);
const deliveredOrders = filterOrdersByStatus(orders, "delivered");
console.log("Доставленные заказы (delivered):", deliveredOrders);
const productInfo = ["ноутбук", 1200, 5];
function updateStock(invt, product) {
    // Достаем название и количество из кортежа (пропускаем цену с помощью пустой запятой)
    const [name, , quantityChange] = product;
    // Приводим название к ключу объекта
    const key = name.toLowerCase();
    if (invt[key]) {
        invt[key] += quantityChange;
    }
    else {
        invt[key] = quantityChange;
    }
    return invt;
}
// --- Проверяем работу ---
const myInventory = {
    мышь: 10,
    клавиатура: 4,
    ноутбук: 0 // Изначально товара нет (количество 0)
};
console.log("До:", myInventory);
updateStock(myInventory, productInfo);
console.log("После:", myInventory);
//# sourceMappingURL=index.js.map