// Импортируем настройку dotenv, чтобы прочитать параметры из файла .env
import 'dotenv/config';

// Импортируем наш пул соединений с базой данных из файла db.js
import pool from './db.js';

async function setupDatabase() {
    try {
        console.log('🔄 Запуск процесса создания таблицы products...');

        // SQL-запрос на создание таблицы.
        // IF NOT EXISTS защищает от ошибки, если таблица уже создана.
        const createTableSql = `
            CREATE TABLE IF NOT EXISTS products (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                price DECIMAL(10, 2) NOT NULL
            );
        `;

        // Выполняем SQL-запрос с помощью пула соединений
        await pool.query(createTableSql);

        console.log('✅ Таблица "products" успешно создана (или уже существовала)!');

    } catch (error) {
        console.error('Ошибка при создании таблицы:', error.message);
    } finally {
        // Обязательно закрываем подключение к базе данных, 
        // чтобы скрипт завершил свою работу и не зависал в терминале.
        await pool.end();
        console.log('Соединение с базой данных закрыто.');
    }
}

// Запускаем функцию создания таблицы
setupDatabase();