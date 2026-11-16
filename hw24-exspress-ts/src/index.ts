






// Homework 24
// Задание
// Создать простое Express-приложение с маршрутами GET и POST, используя TypeScript
// 1 Инициализация проекта
// Создайте новую папку проекта и откройте её в текстовом редакторе или IDE.
// Инициализируйте проект с помощью npm.
// 2 Установка TypeScript и других зависимостей
// Установите TypeScript как зависимость разработки: выполните команду `npm install typescript --save-dev`.
// Установите необходимые типы для Express: `npm install @types/express --save-dev`.
// Установите Express и ts-node для выполнения TypeScript кода: выполните команду `npm install express ts-node`.
// Создайте файл `tsconfig.json`, который будет управлять настройками компиляции TypeScript. Чтобы сгенерировать его автоматически, выполните команду `npx tsc --init`.
// 3bНастройка TypeScript
// Откройте файл `tsconfig.json` и убедитесь, что включены следующие настройки:
// `"target": "ES6"` для поддержки современных возможностей JavaScript.
// `"module": "commonjs"` для использования стандартов модулей Node.js.
// `"rootDir": "./src"` и `"outDir": "./dist"` для указания мест хранения исходных и скомпилированных файлов.
// `"strict": true` для строгой проверки типов.
// `"esModuleInterop": true` для корректной работы импортов
// 4 Создание файлов проекта
// Создайте папку `src`, где будут находиться исходные файлы TypeScript.
// Внутри папки `src` создайте файл `index.ts`, который будет содержать код вашего Express-приложения.
// 5 Создание Express-приложения
// Инициализируйте Express приложение в файле `index.ts`. Для этого потребуется импортировать модуль Express и создать экземпляр приложения.
// Настройте маршруты GET и POST:
// GET-маршрут должен обрабатывать запросы по определенному пути (например, `/`) и возвращать простой текстовый ответ.
// POST-маршрут должен принимать данные из тела запроса и возвращать ответ с полученными данными.
// 6 Запуск и проверка
// В `package.json` добавьте новый скрипт для запуска приложения с использованием `ts-node`. Например, в разделе `"scripts"` добавьте строку `"start": "ts-node src/index.ts"`.
// Запустите приложение командой `npm start`.
// Проверьте работу маршрутов GET и POST, отправив запросы через браузер или инструменты вроде Postman.
// 7 Заключительные шаги
// Убедитесь, что все зависимости работают корректно и приложение не содержит ошибок.

import express, { Application, Request, Response, NextFunction } from 'express';


const app: Application = express();

const PORT: number = 3000;

app.use(express.json());


app.get('/', (req: Request, res: Response) => {
    res.status(200).send('Home page!');
});

app.post('/data', (req: Request, res: Response) => {
    const data = req.body;

    if (!data || Object.keys(data).length === 0) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'Тело запроса не может быть пустым. Передайте данные в формате JSON.',
        });
    }


    res.status(201).json({
        message: 'Data received successfully',
        data,
    });
});

// Обработка несуществующих маршрутов (404 Not Found)
app.use((req: Request, res: Response) => {
    res.status(404).json({
        error: 'Not Found',
        message: `Маршрут ${req.method} ${req.originalUrl} не найден`,
    });
});

// Глобальный обработчик ошибок (например, если клиент прислал невалидный JSON)
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof SyntaxError && 'body' in err) {
        return res.status(400).json({
            error: 'Invalid JSON',
            message: 'Некорректный формат JSON в теле запроса.',
        });
    }

    console.error('Server error:', err);
    res.status(500).json({
        error: 'Internal Server Error',
        message: 'Внутренняя ошибка сервера.',
    });
});

// Функция запуска сервера с обработкой ошибок
const start = () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server is running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
    }
};

start();