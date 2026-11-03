// Домашняя работа 20
// Задание 1
// Класс `Animal` и его наследник `Dog`
// 1 Создайте класс `Animal`, который содержит свойства `name` (имя животного) и `species` (вид животного).
// 2 Добавьте метод `sound()`, который выводит в консоль `"The animal makes a sound"`.
// 3 Затем создайте класс-наследник `Dog`, который добавляет новое свойство `breed` (порода собаки) и переопределяет метод `sound()`, чтобы он выводил `"The dog barks"`.
// 1. Создаем базовый класс Animal
class Animal {
  name: string;
  species: string;

  constructor(name: string, species: string) {
    this.name = name;
    this.species = species;
  }

  sound(): void {
    console.log(`The ${this.name} makes a sound`);
  }
}

class Dog extends Animal {
  breed: string;

  constructor(name: string, breed: string) {
    //  'super' вызывает конструктор родительского класса (Animal).
    super(name, "Dog");
    this.breed = breed;
  }

  override sound(): void {
    console.log("The dog barks");
  }
}

const genericAnimal = new Animal("Лев", "Млекопитающее");
genericAnimal.sound(); 

const myDog = new Dog("Бобик", "Овчарка");

console.log(myDog.name);    
console.log(myDog.species); 
console.log(myDog.breed);   
myDog.sound(); 


// Задание 2
// Статическое свойство для учета всех книг
// 1 Создайте класс `Library`, который имеет статическое свойство `totalBooks` (общее количество книг).
// 2 При каждом добавлении книги это свойство должно увеличиваться.
// 3 В классе также должен быть метод `addBook()`, который увеличивает счетчик книг.
// 4 Создайте несколько объектов класса и проверьте, как изменяется общее количество книг.
    class Library {
  static totalBooks: number = 0;
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  addBook(count: number = 1): void {
    Library.totalBooks += count;
    console.log(`В библиотеку "${this.name}" добавлено книг: ${count}. Всего в системе: ${Library.totalBooks}`);
  }
}

console.log(`Начальное количество книг: ${Library.totalBooks}`); 

const centralLibrary = new Library("Центральная");
const schoolLibrary = new Library("Школьная");

centralLibrary.addBook(5); 
schoolLibrary.addBook(3); 
centralLibrary.addBook(2); 
console.log(`Итого во всех библиотеках: ${Library.totalBooks}`); 

// Задание 3
// Переопределение конструктора в классе `Vehicle`
// 1 Создайте класс `Vehicle`, который содержит свойства `make` (марка) и `model` (модель).
// 2 Добавьте конструктор, который инициализирует эти свойства.
// 3 Затем создайте класс-наследник `Motorcycle`, который добавляет новое свойство `type` (тип мотоцикла) и переопределяет конструктор для инициализации всех трех свойств.
// 4 Убедитесь, что данные правильно инициализируются при создании объекта.

class Vehicle {
  make: string;
  model: string;

  constructor(make: string, model: string) {
    this.make = make;
    this.model = model;
  }
}

class Motorcycle extends Vehicle {
  type: string;

  constructor(make: string, model: string, type: string) {
    super(make, model);
    this.type = type;
  }
}

const genericVehicle = new Vehicle("Toyota", "Camry");
console.log(genericVehicle.make);  
console.log(genericVehicle.model); 

const myMotorcycle = new Motorcycle("Yamaha", "YZF-R1", "Спортивный");

console.log(myMotorcycle.make);  
console.log(myMotorcycle.model); 
console.log(myMotorcycle.type);  