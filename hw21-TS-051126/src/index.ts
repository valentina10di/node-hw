// Домашняя работа 21
// Задание 1
// Абстрактный класс Animal
// 1 Создайте абстрактный класс `Animal` с абстрактным методом `makeSound()`.
// 2 Затем создайте классы `Dog` и `Cat`, которые наследуют `Animal` и реализуют метод `makeSound()` по-своему (`Dog` должен возвращать "Bark", а `Cat` — "Meow").
// 3 Создайте массив типа `Animal[]`, включающий объекты `Dog` и `Cat`, и вызовите метод `makeSound()` для каждого элемента массива.
abstract class  Animal {
   abstract makeSound(): void;
}
class Dog extends Animal {
  makeSound(): void {
    console.log("Bark");
  }
}
class Cat extends Animal {
 makeSound(): void {
    console.log("Meow");
  }
}
const animals: Animal[] = [
  new Dog(),
  new Cat(),
  new Dog(),
  new Cat()
];
animals.forEach((animal) => {
  animal.makeSound();
});



// Задание 2
// Абстрактный класс Shape с цветом
// 1 Создайте абстрактный класс `ColoredShape`, который наследует `Shape` (из задания 4 на уроке) и добавляет абстрактное поле `color`.
// 2 Реализуйте классы `ColoredCircle` и `ColoredRectangle`, которые наследуют `ColoredShape`, задают `color` и реализуют метод `calculateArea()`.
// 3 Выведите площадь и цвет для каждого объекта.
abstract class Shape {
    abstract name: string;
    abstract calculateArea(): number;
    describe(): void {
        console.log(`${this.name}: Area = ${this.calculateArea().toFixed(2)}`);
    }
}
abstract class ColoredShape extends Shape {
    abstract color: string;
}

class ColoredCircle extends ColoredShape {
    name: string = 'Circle';
    color: string; 
    
    constructor(public radius: number, color: string) {
        super();
        this.color = color;
    }

    calculateArea(): number {
        return Math.PI * Math.pow(this.radius, 2);
    }
}
class ColoredRectangle extends ColoredShape {
    name: string = "Rectangle";
    color: string;

    constructor(public width: number, public height: number, color: string) {
        super();
        this.color = color;
    }

    calculateArea(): number {
        return this.height * this.width;
    }
}

const coloredShapes: ColoredShape[] = [
    new ColoredCircle(2, "Red"), 
    new ColoredRectangle(2, 3, "Blue")
];

coloredShapes.forEach((shape) => {
    shape.describe();
    console.log(`Color: ${shape.color}`);
});


// Задание 3
// Абстрактный класс Appliance
// 1 Создайте абстрактный класс `Appliance` с абстрактными методами `turnOn()` и `turnOff()`.
// 2 Затем создайте классы `WashingMachine` и `Refrigerator`, которые наследуют `Appliance` и реализуют методы `turnOn()` и `turnOff()`, выводя соответствующие сообщения.
// 3 Создайте массив типа `Appliance[]`, добавьте в него объекты `WashingMachine` и `Refrigerator`, и вызовите методы `turnOn()` и `turnOff()` для каждого элемента.
// 1. Создаем абстрактный класс `Appliance` с абстрактными методами `turnOn()` и `turnOff()`
abstract class Appliance {
  abstract turnOn(): void;
  abstract turnOff(): void;
}

class WashingMachine extends Appliance {
  override turnOn(): void {
    console.log("Стиральная машина включена. Начинается стирка.");
  }
   turnOff(): void {
    console.log("Стиральная машина выключена.");
  }
}

class Refrigerator extends Appliance {
  override turnOn(): void {
    console.log("Холодильник включен. Компрессор запущен.");
  }
  turnOff(): void {
    console.log("Холодильник выключен.");
  }
}

const appliances: Appliance[] = [
  new WashingMachine(),
  new Refrigerator()
];

appliances.forEach((appliance) => {
  appliance.turnOn();
  appliance.turnOff();
});



// Задание 4
// Абстрактный класс Account
// 1 Создайте абстрактный класс `Account` с абстрактными методами `deposit(amount: number)` и `withdraw(amount: number)`.
// 2 Реализуйте классы `SavingsAccount` и `CheckingAccount`, которые наследуют `Account`.
// 3 В классе `SavingsAccount` добавьте логику для начисления процентов на остаток.
// 4 В классе `CheckingAccount` реализуйте снятие средств с учетом комиссии. 
// 5 Проверьте работу методов на объектах обоих классов.
abstract class Account {
  protected balance: number = 0;

  abstract deposit(amount: number): void;
  abstract withdraw(amount: number): void;

  getBalance(): number {
    return this.balance;
  }
}

class SavingsAccount extends Account {

  constructor( public interestRate: number) {
    super();
    this.interestRate = interestRate;
  }

  deposit(amount: number): void {
    if (amount <= 0|| !Number.isFinite(amount)){
        throw new Error('Invalid amount')
    }
    this.balance += amount;
    console.log(`Внесено: ${amount} . Баланс: ${this.balance} .`);
  }

  withdraw(amount: number): void {
    if (amount <= 0 || !Number.isFinite(amount) || amount > this.balance) {
      console.log(`Ошибка: недостаточно средств для снятия ${amount}.`);
    }
    this.balance -= amount;
    console.log(`Снято: ${amount}. Баланс: ${this.balance}.`);
  }

  addInterest(): void {
    const interest = this.balance * (this.interestRate / 100);
    this.balance += interest;
    console.log(`Начислены проценты (${this.interestRate}%): +${interest}. Текущий баланс: ${this.balance}.`);
  }
}

class CheckingAccount extends Account {

  constructor(public fee: number) {
    super();
    this.fee = fee;
  }

    deposit(amount: number): void {
    if (amount <= 0) return;
    this.balance += amount;
    console.log(`Внесено: ${amount}. Баланс: ${this.balance}.`);
  }

    withdraw(amount: number): void {
    const totalAmount = amount + this.fee;

    if (amount <= 0 || totalAmount > this.balance) {
      console.log(`Ошибка: недостаточно средств (с учетом комиссии ${this.fee}.)`);
      return;
    }

    this.balance -= totalAmount;
    console.log(`Снято: ${amount}. (комиссия: ${this.fee}.). Баланс: ${this.balance}.`);
  }
}
const mySavings = new SavingsAccount(5);
mySavings.deposit(20000); 
mySavings.addInterest(); 
mySavings.withdraw(5000);

const myChecking = new CheckingAccount(50);
myChecking.deposit(1000); 
myChecking.withdraw(200);
myChecking.withdraw(500);

// Задание 5
// Абстрактный класс Media
// 1 Создайте абстрактный класс `Media` с абстрактным методом `play()`.
// 2 Затем создайте классы `Audio` и `Video`, которые наследуют `Media` и реализуют метод `play()` по-своему (например, `Audio` выводит "Playing audio", а `Video` — "Playing video").
// 3 Создайте массив типа `Media[]`, включающий объекты `Audio` и `Video`, и вызовите метод `play()` для каждого элемента массива.
// --- 1. АБСТРАКТНЫЙ КЛАСС MEDIA ---
abstract class Media {
  abstract play(): void;
}

class Audio extends Media {
    play(): void {
    console.log("Playing audio");
  }
}

class Video extends Media {
    play(): void {
    console.log("Playing video");
  }
}

const mediaList: Media[] = [
  new Audio(),
  new Video(),
  new Audio(),
  new Video()
];

mediaList.forEach((media) => {
  media.play();
});

