import express from 'express';
import 'dotenv/config';
import sequelize from './config/db.js';
import Book from './models/book.js'

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.get('/books', async (_req, res, next) => {
   try {
    const books = await Book.findAll();
    res.json(books);
  } catch (error) {
    next(error);
  }
});

// Получение одной книги по ID 
app.get('/books/:id', async (req, res, next) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findByPk(bookId); // Используем findByPk для поиска по первичному ключу
    
    if (!book) {
      const err = new Error(`Книга по текущему id: ${bookId} не найдена`);
      err.status = 404;
      return next(err);
    }
    
    res.json(book);
  } catch (error) {
    next(error);
  }
});

// 2. POST маршрут для создания записи (POST /books)
app.post('/books', async (req, res, next) => {
  try {
    const { title, author, year } = req.body;
    const newBook = await Book.create({ title, author, year });
    res.status(201).json(newBook);
  } catch (error) {
    next(error);
  }
});

// 4. PUT маршрут для обновления записи (PUT /books/:id)
app.put('/books/:id', async (req, res, next) => {
  try {
    const bookId = req.params.id;
    const { title, author, year } = req.body;

    const [updated] = await Book.update({ title, author, year }, {
      where: { id: bookId }
    });

    if (!updated) {
      const err = new Error(`Книга с id ${bookId} не найдена для обновления`);
      err.status = 404;
      return next(err);
    }

    const updatedBook = await Book.findByPk(bookId);
    res.json(updatedBook);
  } catch (error) {
    next(error);
  }
});

// 5. DELETE маршрут для удаления записи (DELETE /books/:id)
app.delete('/books/:id', async (req, res, next) => {
  try {
    const bookId = req.params.id;
    const deleted = await Book.destroy({
      where: { id: bookId }
    });

    if (!deleted) {
      const err = new Error(`Книга с id ${bookId} не найдена для удаления`);
      err.status = 404;
      return next(err);
    }

    res.json({ message: `Книга с id ${bookId} успешно удалена` });
  } catch (error) {
    next(error);
  }
});

app.use((error, _req, res, _next)=>{
    console.error('[ERROR]:', error.message);
  const statusCode = error.status || 500;
  res.status(statusCode).json({
    error: error.message || 'Внутренняя ошибка сервера',
        
    });
});

app.listen(PORT, async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection to the database has been successfully');
        console.log(`Server running at http://localhost:${PORT}`);
    } catch (error) {
        console.error('Unable to connect to the database', error.message);
    }
});




// Настройка Express-приложения:
// Настройте файл `app.js` для настройки и запуска Express-приложения.
// Задание 2
// Создание и настройка модели и ее миграции
// 1 Создание новой модели
// Создайте файл модели `book.js` в директории models.
// 2 Настройте модель Book
// Откройте файл модели, который был создан в папке `models`.
// Настройте все атрибуты модели - `title`, `author`, `year`.
// Убедитесь, что модель экспортируется корректно.
// 3 Настройка миграции для модели
// Откройте терминал, создайте миграцию для модели при помощи команды: `npx sequelize-cli migration:generate --name create-books-table`.
// Откройте файл миграции и настройте инструкции для создания таблицы `Books` с нужными колонками - `title`, `author`, `year`.
// 4 Выполнение миграции
// В терминале выполните команду `npx sequelize-cli db:migrate`.
// Эта команда выполнит все миграции, которые ещё не были применены, и создаст таблицу `Books` в базе данных.
// 5 Проверьте результат миграции
// Откройте MySQL Workbench и подключитесь к вашей базе данных.
// Убедитесь, что таблица `Books` была успешно создана с нужными колонками.

// Задание 3
// 1 Настройте маршрут для получения списка всех книг:
// В директории вашего проекта найдите и откройте файл `app.js`.
// В файле `app.js` добавьте обработчик GET маршрута для пути `/books`.
// Внутри обработчика используйте метод `findAll()` модели `Book` для получения всех записей из таблицы `Books`.
// Отправьте полученные данные обратно в виде JSON-ответа.
// 2 Настройка POST маршрута для создания записи
// В файле `app.js` добавьте обработчик POST маршрута для пути `/books`.
// Внутри обработчика используйте метод `create()` модели `Book`, чтобы создать новую запись в базе данных на основе данных, переданных в теле запроса.
// 3 Настройте парсинг JSON данных:
// Убедитесь, что Express-приложение настроено для работы с JSON данными. Для этого добавьте middleware `express.json()` в `app.js`, если он ещё не добавлен.
// 4 Настройка PUT маршрута для обновления записи
// В файле `app.js` добавьте обработчик PUT маршрута для пути `/books/:id`, где `:id` — это параметр пути, представляющий идентификатор книги.
// Используйте метод `update()` модели `Book`, чтобы обновить данные книги с указанным идентификатором.
// 5 Настройка DELETE маршрута для удаления записи
// В файле `app.js` добавьте обработчик DELETE маршрута для пути `/books/:id`.
// Используйте метод `destroy()` модели `Book`, чтобы удалить запись книги с указанным идентификатором из базы данных.
// 6 Тестирование маршрутов
// Запустите ваше Express-приложение, используя команду `node app.js` в терминале.
// Отправьте POST запрос на маршрут `/books` с телом запроса, содержащим данные о новой книге (`title`, `author`, `year`).
// Убедитесь, что запись успешно создается в базе данных.
// Отправьте GET запрос на маршрут `/books`.
// Убедитесь, что в ответе возвращается список всех книг, которые находятся в базе данных.
// Отправьте PUT запрос на маршрут `/books/:id`, передав идентификатор книги и новые данные для обновления.
// Убедитесь, что запись успешно обновляется.
// Отправьте DELETE запрос на маршрут `/books/:id`, передав идентификатор книги для удаления.
// Убедитесь, что запись успешно удаляется из базы данных 


