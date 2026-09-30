import http from 'http';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res)=>{
    const date = new Date().toLocaleString();
    const logMessage = ` Метод: ${req.method}, URL: ${req.url}, время: ${date}`;

    try {
        throw new Error('Что-то пошло не так на сервере!');
    } catch (error) {
        fs.appendFile('errors.log', logMessage, (err) => {
            if (err) {
                console.error('Ошибка при записи в файл логов:', err);
            }
        });

        res.statusCode = 500;
        res.setHeader("Content-Type", `text/plain; charset= utf8`);
        res.end('Internal Server Error');
    }
});

server.listen(PORT, ()=>{
    console.log(`Server running at http://localhost:${PORT}`);
    
});








// Задание 2
// Логирование ошибок сервера
// 1 Создание сервера:
// Импортируйте модули `http` и `fs`.
// Создайте сервер с использованием метода `http.createServer()`.
// 2 Обработка запросов:
// В функции обратного вызова для сервера специально вызывайте ошибку для тестирования.
// Используйте конструкцию `try-catch` для перехвата ошибок.
// Логируйте ошибки в файл `errors.log` с помощью метода `fs.appendFile()`.
// 3 Формирование ответа:
// Установите статус ответа `500` и заголовок `Content-Type` в `text/plain`.
// Отправьте текстовый ответ с сообщением "Internal Server Error".
// 4 Запуск сервера:
// Настройте сервер на прослушивание порта `3000`.
// Добавьте сообщение в консоль, которое будет выводиться при успешном запуске сервера.

