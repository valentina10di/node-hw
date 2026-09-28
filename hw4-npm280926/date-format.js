const moment = require('moment');

const currentDate = moment();

console.log('Дата в формате DD-MM-YYYY:', currentDate.format('DD-MM-YYYY'));
console.log('Дата в формате MMM Do YY:', currentDate.format('MMM Do YY'));
console.log('День недели в формате dddd:', currentDate.format('dddd'));



// Задание 1
// Использование moment для форматирования даты и времени
// 1 Создайте новый проект:
// В терминале перейдите в каталог, где хотите создать проект.
// Запустите команду `npm init -y`, чтобы создать файл `package.json`.
// 2 Установите moment:
// Выполните команду `npm install moment`.
// 3 Создайте файл `date-format.js`:
// Создайте файл `date-format.js` в корневом каталоге проекта.
// 4 Используйте moment для форматирования текущей даты и времени:
// Импортируйте модуль `moment`.
// Получите текущую дату и время.Отформатируйте текущую дату и время в форматах: `DD-MM-YYYY`, `MMM Do YY`, `dddd`.
// 5 Выведите результаты в консоль:
// Запустите скрипт командой `node date-format.js`.