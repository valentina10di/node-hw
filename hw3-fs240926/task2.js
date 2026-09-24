const fs = require("fs");

  fs.writeFile('info.txt', 'Node.js is awesome!', 'utf8', (err) => {
        if (err) {
            console.error('Ошибка при записи файла:', err.message);
            return;
        }
        console.log('Файл info.txt успешно создан');

        fs.readFile('info.txt', 'utf8', (err, data)=>{
             if (err) {
            console.error('Ошибка при чтении файла:', err.message);
            return;
        }
        console.log(data);

        });
    });








// Задача 2
// Чтение и запись файла
// 1 Создайте новый файл для скрипта, например, `task2.js`.
// 2 Импортируйте модуль `fs`.**
// 3 Создайте файл с именем `info.txt` и запишите в него текст "Node.js is awesome!".

// Используйте метод `fs.writeFile` для записи текста в файл.
// В функции обратного вызова (callback) обработайте возможные ошибки и выведите сообщение о успешной записи.

// 4 Прочитайте содержимое файла `info.txt`.

// Используйте метод `fs.readFile` для чтения содержимого файла.

// В функции обратного вызова (callback) обработайте возможные ошибки и выведите содержимое файла на консоль.

