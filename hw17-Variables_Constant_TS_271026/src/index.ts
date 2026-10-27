// Домашняя работа 17
// Задание 1
// Типизация функции с несколькими параметрами
// 1 Напишите функцию `calculateTotal`, которая принимает три параметра:  
// `price` (число)  
// `quantity` (число)  
// `discount` (число, по умолчанию равен 0)
// 2 Функция должна возвращать общую стоимость товаров с учетом скидки. Если скидка не указана, она считается равной нулю.
const calculateTotal = (price: number, quantity: number, discount: number = 0): number => {
  return price * quantity * (1 - discount / 100);
};

console.log(calculateTotal(100, 2, 10))


// Задание 2
// Использование Union типов
// 1 Создайте переменную `id`, которая может быть либо строкой, либо числом.  
// 2 Напишите функцию `displayId`, которая принимает эту переменную и выводит сообщение, содержащее значение ID. Если `id` — строка, выведите её в верхнем регистре. Если `id` — число, умножьте его на 10 перед выводом.

let id: string | number;

function displayId(idParam: string | number): void {
  if (typeof idParam === "string") {
    console.log(idParam.toUpperCase());
  } else {
    console.log(idParam * 10);
  }
}

id = "abc123";
displayId(id); 

id = 5;
displayId(id); 


// Задание 3
// Объявление и типизация массивов объектов
// 1 Создайте массив объектов `orders`, где каждый объект описывает заказ и содержит следующие свойства:  
// `orderId` (строка)  
// `amount` (число)  
// `status` (строка, может принимать значения "pending", "shipped" или "delivered")
// 2 Напишите функцию `filterOrdersByStatus`, которая принимает этот массив и строку `status`, и возвращает массив заказов, соответствующих указанному статусу.

type OrderStatus = "pending" | "shipped" | "delivered";

interface Order {
  orderId: string;
  amount: number;
  status: OrderStatus;
}

const orders: Order[] = [
  { orderId: "A1", amount: 150, status: "pending" },
  { orderId: "B2", amount: 400, status: "shipped" },
  { orderId: "C3", amount: 250, status: "delivered" },
  { orderId: "D4", amount: 100, status: "pending" }
];


function filterOrdersByStatus(ordersArray: Order[], targetStatus: OrderStatus): Order[] {
  return ordersArray.filter(order => order.status === targetStatus);
}

const pendingOrders = filterOrdersByStatus(orders, "pending");
console.log("Заказы в ожидании (pending):", pendingOrders);

const deliveredOrders = filterOrdersByStatus(orders, "delivered");
console.log("Доставленные заказы (delivered):", deliveredOrders);


// Задание 4
// Работа с кортежами и объектами
// 1 Создайте кортеж `productInfo`, который содержит:  
// название товара (строка)  
// его цену (число)  
// количество на складе (число)
// 2 Напишите функцию `updateStock`, которая принимает объект `inventory` (где ключ — это название товара, а значение — количество на складе) и кортеж `productInfo`. Функция должна прибавить изменение количества из кортежа к текущему значению в inventory (если товара ещё нет, добавить его с этим количеством) и вернуть обновлённый объект.

type ProductTuple = [string, number, number];

const productInfo: ProductTuple = ["ноутбук", 1200, 5];

type Inventory = {
  мышь: number;
  клавиатура: number;
  ноутбук: number;
};

function updateStock(invt: Inventory, product: ProductTuple): Inventory {

  const [name, , quantityChange] = product;

  // Приводим название к ключу объекта
  const key = name.toLowerCase() as keyof Inventory;

  if (invt[key]) {
    invt[key] += quantityChange;

  } else {
    invt[key] = quantityChange;
  }

  return invt;
}

const myInventory: Inventory = {
  мышь: 10,
  клавиатура: 4,
  ноутбук: 0 ,
};

console.log("До:", myInventory); 

updateStock(myInventory, productInfo);

console.log("После:", myInventory); 
