// Главный файл приложения: Express сервер и REST API для таблицы products.
// Запуск: npm start (или node index.js)

// Подключаем переменные окружения из файла .env.
// ВАЖНО: этот импорт должен стоять ПЕРВЫМ, чтобы переменные успели загрузиться.
import 'dotenv/config';

import express from 'express';
import pool, { checkConnection } from './db.js'; // Пул соединений с MySQL и функция проверки подключения

// Порт берём из .env, а если его там нет, используем 3000
const PORT = process.env.PORT || 3000;

// Создаём экземпляр приложения Express
const app = express();

// ===================== MIDDLEWARE =====================
// Разбирает тело запроса в формате JSON и кладёт результат в req.body
app.use(express.json());

// Разбирает данные HTML-форм
app.use(express.urlencoded({ extended: true }));

// Логгер: выводит в консоль время, метод и адрес каждого запроса
app.use((req, _res, next) => {
    console.log(`${new Date().toISOString()}: ${req.method} ${req.url}`);
    next();
});

// ===================== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ =====================

// Создаёт объект ошибки с HTTP-статусом
function createError(status, message) {
    const error = new Error(message);
    error.status = status;
    return error;
}

// ===================== МАРШРУТЫ =====================

// GET /
// Главная страница, чтобы проверить, что сервер запущен
app.get('/', (_req, res) => {
    res.send('Product API is running!');
});

// GET /products
// Получить все продукты или найти их по названию (через query-параметр ?search=...)
// Пример: /products или /products?search=phone
app.get('/products', async (req, res, next) => {
    try {
        const { search } = req.query; // Получаем параметр поиска из адресной строки

        let sql = 'SELECT * FROM products';
        const params = [];

        // Если передан поисковый запрос, ищем по названию продукта (name)
        if (search) {
            sql += ' WHERE name LIKE ?';
            params.push(`%${search}%`); // % позволяет искать подстроку (например, "iph" найдёт "iPhone")
        }

        sql += ' ORDER BY id'; // Сортируем по ID

        // Выполняем запрос к базе данных через пул соединений
        const [rows] = await pool.query(sql, params);

        res.json(rows); // Отправляем клиенту список продуктов в формате JSON
    } catch (error) {
        next(error); // Передаем ошибку в общий обработчик
    }
});

// POST /products
// Добавить новый продукт в базу данных.
// Ожидает JSON в теле запроса: { "name": "Laptop", "price": 1200.50 }
app.post('/products', async (req, res, next) => {
    try {
        const { name, price } = req.body;

        // Проверяем, передано ли название и что оно не пустое
        if (!name || typeof name !== 'string' || !name.trim()) {
            throw createError(400, 'Field "name" is required and must be a non-empty string');
        }

        // Проверяем, что цена передана и является числом больше или равным 0
        const parsedPrice = Number(price);
        if (price === undefined || isNaN(parsedPrice) || parsedPrice < 0) {
            throw createError(400, 'Field "price" is required and must be a valid positive number');
        }

        // Выполняем SQL-запрос на вставку данных. 
        // Знак вопроса (?) защищает от SQL-инъекций.
        const [result] = await pool.query(
            'INSERT INTO products (name, price) VALUES (?, ?)',
            [name.trim(), parsedPrice]
        );

        // Статус 201 Created означает, что ресурс успешно создан
        res.status(201).json({
            message: 'Product added successfully',
            product: {
                id: result.insertId, // ID, который сгенерировала база данных
                name: name.trim(),
                price: parsedPrice
            },
        });
    } catch (error) {
        next(error);
    }
});

// ===================== ОБРАБОТКА ОШИБОК =====================

// Обработчик несуществующих маршрутов (404)
app.use((req, _res, next) => {
    next(createError(404, `Route ${req.method} ${req.url} not found`));
});

// Общий обработчик ошибок (должен быть последним!)
app.use((error, _req, res, _next) => {
    const status = error.status || 500;

    if (status === 500) {
        console.error(error.stack);
    }

    res.status(status).json({
        message: status === 500 ? 'Internal Server Error' : error.message,
    });
});

// ===================== ЗАПУСК СЕРВЕРА =====================

// Сначала проверяем подключение к базе данных, и только потом запускаем сервер
async function start() {
    try {
        await checkConnection(); // Проверяем, жива ли база данных

        app.listen(PORT, () => {
            console.log(`Server is running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Failed to connect to the database:', error.message);
        process.exit(1); // Завершаем процесс при ошибке подключения
    }
}

start();