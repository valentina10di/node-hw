import 'dotenv/config';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const PORT = process.env.PORT || 3000;

// 2. Настройка серверной части: Создаем сервер на основе Express и Socket.io
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Настраиваем Express для обслуживания статических файлов из папки public
app.use(express.static('public'));
app.use(express.json());

// 2. Реализация обработки событий подключения и отключения пользователей
io.on('connection', (socket) => {
    // При подключении нового пользователя выводим сообщение в консоль
    console.log(`A user connected. ID: ${socket.id}`);

    // 2. Обработка пользовательских сообщений
    // Когда клиент отправляет сообщение, сервер получает его, отображает в консоли 
    // и отправляет обратно клиенту подтверждение о получении (ack)
    socket.on('message', (text, ack) => {
        console.log(`Получено сообщение от клиента (${socket.id}): ${text}`);
        
        // Отправляем подтверждение о получении обратно клиенту
        if (typeof ack === 'function') {
            ack({ status: 'received', text });
        }

        // Опционально: можно рассылать сообщение всем, но по заданию главное — подтверждение
        // io.emit('message', text);
    });

    // Обработка отключения пользователя
    socket.on('disconnect', () => {
        console.log(`A user disconnected. ID: ${socket.id}`);
    });
});

// Запуск сервера
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});