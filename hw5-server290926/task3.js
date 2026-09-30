import http from 'http';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) =>{
    res.setHeader('Content-Type', 'text/plain; charset=utf8')

    console.log(`Получен запрос методом: ${req.method} на адрес: ${req.url}`);

    if(req.method === 'PUT'){
        res.statusCode = 200;
        res.end('PUT-запрос обработан')
    }else{
        if(req.method === 'DELETE'){
            res.statusCode = 200;
        res.end('DELETE-запрос обработан')
        }else{
            res.statusCode = 404;
            res.end('Метод не найден')
        }
    }
})

server.listen(PORT, ()=>{
    console.log(`Server running at http://localhost:${PORT}`);
    
});








// Задание 3
// Обработка PUT и DELETE запросов
// 1 Создание сервера:
// Импортируйте модуль `http`.
// Создайте сервер с использованием метода `http.createServer()`.
// 2 Обработка PUT и DELETE запросов:
// В функции обратного вызова для сервера проверяйте метод запроса (`req.method`).
// Если метод запроса `PUT`, возвращайте статус ответа `200` и сообщение "PUT-запрос обработан".
// Если метод запроса `DELETE`, возвращайте статус ответа `200` и сообщение "DELETE-запрос обработан".
// 3 Формирование ответа:
// Установите соответствующий статус ответа и заголовок `Content-Type` в `text/plain`.
// Отправьте текстовый ответ в зависимости от метода запроса.
// 4 Запуск сервера:
// Настройте сервер на прослушивание порта `3000`.
// Добавьте сообщение в консоль, которое будет выводиться при успешном запуске сервера.