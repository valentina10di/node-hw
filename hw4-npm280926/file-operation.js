const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

const fileName = process.env.FILENAME;
const fileContent = 'Привет! Это тестовый текст, записанный в файл с использованием переменных окружения и модуля fs.';

fs.writeFile(fileName, fileContent, 'utf8', (err) => {
    if (err) {
        console.error('Ошибка при записи файла:', err);
        return;
    }
    console.log(`Файл "${fileName}" успешно создан и записан.`);

    
    fs.readFile(fileName, 'utf8', (err, data) => {
        if (err) {
            console.error('Ошибка при чтении файла:', err);
            return;
        }
        console.log('Содержимое файла:');
        console.log(data);
    });
});


// Задание 2
// Создание и чтение текстового файла с использованием fs и dotenv
// 1 Создайте новый проект:
// В терминале перейдите в каталог, где хотите создать проект.
// Запустите команду `npm init -y`, чтобы создать файл `package.json`.
// 2 Установите dotenv:
// Выполните команду `npm install dotenv`.
// 3 Создайте файл `.env`:
// Создайте файл `.env` в корневом каталоге проекта.
// Добавьте строку `FILENAME=myfile.txt`, чтобы задать имя файла.
// 4 Создайте файл `file-operation.js`:
// Импортируйте модули `fs` и `dotenv`.
// Загрузите переменные окружения из файла `.env`.
// Создайте текстовый файл с именем, указанным в переменной окружения `FILENAME`, и запишите в него любой текст.
// Прочитайте содержимое файла и выведите его в консоль.
// 5 Запустите скрипт командой `node file-operation.js`.

