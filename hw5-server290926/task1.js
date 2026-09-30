import http from "http";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/plain; charset=utf8");

  if (!req.headers["authorization"]) {
    res.statusCode = 401;
    res.end("Unauthorized");
  } else {
    res.statusCode = 200;
    res.end("Authorization header received");
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// Задание 1
// Работа с заголовком Authorization
// 1 Создание сервера:
// Импортируйте модуль `http`.
// Создайте сервер с использованием метода `http.createServer()`.
// 2 Проверка заголовка Authorization:
// В функции обратного вызова для сервера проверяйте наличие заголовка `Authorization` в объекте `req.headers`.
// Если заголовок отсутствует, возвращайте статус ответа `401` и сообщение "Unauthorized".
// Если заголовок присутствует, возвращайте статус ответа `200` и сообщение "Authorization header received".
// 3 Формирование ответа:
// Установите соответствующий статус ответа и заголовок `Content-Type` в `text/plain`.
// Отправьте текстовый ответ в зависимости от наличия заголовка `Authorization`.
// 4 Запуск сервера:
// Настройте сервер на прослушивание порта `3000`.
// Добавьте сообщение в консоль, которое будет выводиться при успешном запуске сервера.
