import express from 'express';
import 'dotenv/config';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import authenticateJWT from './middlewares/authenticateJWT.js';
import authorizeRole from './middlewares/authorizeRole.js';

const users = [
    {
        id: '1',
        username: 'alex',
        email: 'user@example.com',
        password: await bcrypt.hash('password123', 10),
        role: 'user',
    },
    {
        id: '2',
        username: 'boss',
        email: 'admin@example.com',
        password: await bcrypt.hash('admin123', 10),
        role: 'admin',
    },
];

const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Home Page');
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body ?? {};

    if (!email || !password) {
        return res.status(400).json({ message: 'Укажите email и пароль' });
    }

    try {
        const user = users.find((u) => u.email === email);
        const isMatch = user ? await bcrypt.compare(password, user.password) : false;

        if (!user || !isMatch) {
            return res.status(401).json({ message: 'Неверный email или пароль' });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        res.json({ token });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Ошибка сервера при аутентификации' });
    }
});

app.put('/update-email', authenticateJWT, async (req, res) => {
    const { email } = req.body ?? {};

    if (!email) {
        return res.status(400).json({ message: 'Укажите новый email' });
    }

    try {
        const user = users.find((u) => u.id === req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }

        const emailExists = users.some(
            (u) => u.email === email.toLowerCase().trim() && u.id !== req.user.id
        );
        if (emailExists) {
            return res.status(409).json({ message: 'Этот email уже используется другим пользователем' });
        }

        user.email = email.toLowerCase().trim();
        const { password, ...userWithoutPassword } = user;

        res.json({
            message: 'Email успешно обновлен',
            user: userWithoutPassword
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Ошибка сервера при обновлении email' });
    }
});

app.delete('/delete-account', authenticateJWT, async (req, res) => {
    try {
        const userId = req.user.id;
        const userIndex = users.findIndex((u) => u.id === userId);

        if (userIndex === -1) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }

        users = users.filter((u) => u.id !== userId);

        res.json({ message: 'Ваш аккаунт был успешно удален' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Ошибка сервера при удалении аккаунта' });
    }
});

app.patch('/update-role', authenticateJWT, authorizeRole('admin'), async (req, res) => {
    const { userId, newRole } = req.body ?? {};

    if (!userId || !newRole) {
        return res.status(400).json({ message: 'Укажите userId и новую роль (newRole)' });
    }

    const allowedRoles = ['user', 'admin'];
    if (!allowedRoles.includes(newRole)) {
        return res.status(400).json({ message: `Недопустимая роль. Разрешены только: ${allowedRoles.join(', ')}` });
    }

    try {
        const targetUser = users.find((u) => u.id === userId);

        if (!targetUser) {
            return res.status(404).json({ message: 'Пользователь с таким ID не найден' });
        }

        targetUser.role = newRole;

        const { password, ...userWithoutPassword } = targetUser;
        res.json({
            message: 'Роль пользователя успешно обновлена',
            user: userWithoutPassword
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Ошибка сервера при обновлении роли' });
    }
});

app.post('/refresh-token', authenticateJWT, async (req, res) => {
    try {
        const user = users.find((u) => u.id === req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }

        const newToken = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        res.json({
            message: 'Токен успешно обновлен',
            token: newToken
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Ошибка сервера при обновлении токена' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});





// import express from 'express';
// import 'dotenv/config';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import authenticateJWT from './middlewares/authenticateJWT.js';
// import authorizeRole from './middlewares/authorizeRole.js'


// const users = [
//     {
//         id: '1',
//         username: 'alex',
//         email: 'user@example.com',
//         password: await bcrypt.hash('password123', 10),
//         role: 'user', // обычный пользователь
//     },
//     {
//         id: '2',
//         username: 'boss',
//         email: 'admin@example.com',
//         password: await bcrypt.hash('admin123', 10),
//         role: 'admin',
//     },
// ];

// const PORT = process.env.PORT || 3000;
// const JWT_SECRET = process.env.JWT_SECRET;
// const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

// const app = express();

// app.use(express.json());

// app.get('/', (req, res) => {
//     res.send('Home Page');
//     console.log(req.user);
// });


// // 2 Реализуйте базовую аутентификацию с помощью JWT
// app.post('/login', async (req, res) => {
//     const { email, password } = req.body ?? {};

//     if (!email || !password) {
//         return res.status(400).json({
//             message: 'Укажите email и пароль'
//         });
//     }


//     try {
//         const user = users.find((user) => user.email === email);

//         const isMatch = user ? await bcrypt.compare(password, user.password) : false;

//         if (!user || !isMatch) {
//             return res.status(401).json({
//                 message: 'Неверный email или пароль'
//             })
//         }

//            const token = jwt.sign({
//             id: user.id,
//             email: user.email,
//             role: user.role,
//         },
//             JWT_SECRET,
//             {
//                 expiresIn: JWT_EXPIRES_IN
//             }
//         )
//         res.json({
//             token,
//         });

//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json({
//             message: 'Ошибка сервера при аутентификации'
//         });
//     }
// });

// // 3.Создание маршрута для обновления email
// // Маршрут защищен middleware `authenticateJWT`, поэтому доступ к нему имеют только пользователи с валидным токеном
// app.put('/update-email', authenticateJWT, async (req, res) => {
//     // 3.1. Получаем новый email из тела запроса (req.body)
//     const { email } = req.body ?? {};

//     // Проверяем, передан ли email
//     if (!email) {
//         return res.status(400).json({
//             message: 'Укажите новый email'
//         });
//     }

//     try {
//         // 3.2. Находим текущего пользователя в массиве по ID, который был расшифрован из JWT и записан в req.user
//         const user = users.find((u) => u.id === req.user.id);

//         if (!user) {
//             return res.status(404).json({
//                 message: 'Пользователь не найден'
//             });
//         }

//         // 3.3. Проверяем, не занят ли этот email кем-то другим
//         const emailExists = users.some(
//             (u) => u.email === email.toLowerCase().trim() && u.id !== req.user.id
//         );
//         if (emailExists) {
//             return res.status(409).json({
//                 message: 'Этот email уже используется другим пользователем'
//             });
//         }

//         // 3.4. Обновляем email пользователя в нашей «базе данных» (массиве)
//         user.email = email.toLowerCase().trim();

//         // 3.5. Формируем ответ: исключаем пароль из возвращаемых данных для безопасности
//         const { password, ...userWithoutPassword } = user;

//         // Отправляем успешный ответ с обновленными данными
//         res.json({
//             message: 'Email успешно обновлен',
//             user: userWithoutPassword
//         });

//     } catch (error) {
//         // Обработка непредвиденных ошибок сервера
//         console.error(error.message);
//         res.status(500).json({
//             message: 'Ошибка сервера при обновлении email'
//         });
//     }
// });

// // ЗАДАНИЕ 2: Маршрут для удаления аккаунта пользователя
// // Маршрут защищен с помощью JWT (используется middleware authenticateJWT)
// app.delete('/delete-account', authenticateJWT, async (req, res) => {
//     try {
//         // 1. Получаем ID пользователя из расшифрованного токена (req.user)
//         const userId = req.user.id;

//         // 2. Проверяем, существует ли пользователь в нашей базе (массиве)
//         const userIndex = users.findIndex((u) => u.id === userId);

//         if (userIndex === -1) {
//             return res.status(404).json({
//                 message: 'Пользователь не найден'
//             });
//         }

//         // 3. Удаляем пользователя из массива с помощью filter (перезаписываем массив без этого пользователя)
//         users = users.filter((u) => u.id !== userId);

//         // 4. Возвращаем сообщение об успешном удалении аккаунта
//         res.json({
//             message: 'Ваш аккаунт был успешно удален'
//         });

//     } catch (error) {
//         // 5. Обработка ошибок сервера
//         console.error(error.message);
//         res.status(500).json({
//             message: 'Ошибка сервера при удалении аккаунта'
//         });
//     }
// });

// // ЗАДАНИЕ 3: Маршрут для обновления роли пользователя
// // Доступен ТОЛЬКО для администраторов (проверяем сначала аутентификацию, затем роль)
// app.patch('/update-role', authenticateJWT, authorizeRole('admin'), async (req, res) => {
//     const { userId, newRole } = req.body ?? {};

//     // 1. Проверяем, переданы ли необходимые поля
//     if (!userId || !newRole) {
//         return res.status(400).json({
//             message: 'Укажите userId и новую роль (newRole)'
//         });
//     }

//     // Проверим, валидна ли роль (например, 'user' или 'admin')
//     const allowedRoles = ['user', 'admin'];
//     if (!allowedRoles.includes(newRole)) {
//         return res.status(400).json({
//             message: `Недопустимая роль. Разрешены только: ${allowedRoles.join(', ')}`
//         });
//     }

//     try {
//         // 2. Находим пользователя, которому нужно изменить роль, в массиве
//         const targetUser = users.find((u) => u.id === userId);

//         if (!targetUser) {
//             return res.status(404).json({
//                 message: 'Пользователь с таким ID не найден'
//             });
//         }

//         // 3. Обновляем роль пользователя
//         targetUser.role = newRole;

//         // 4. Отправляем успешный ответ
//         const { password, ...userWithoutPassword } = targetUser;
//         res.json({
//             message: 'Роль пользователя успешно обновлена',
//             user: userWithoutPassword
//         });

//     } catch (error) {
//         // 5. Обработка ошибок сервера
//         console.error(error.message);
//         res.status(500).json({
//             message: 'Ошибка сервера при обновлении роли'
//         });
//     }
// });

// // ЗАДАНИЕ 4: Маршрут для обновления (refresh) JWT токена
// // Защищен middleware authenticateJWT, поэтому сюда попадут только пользователи с действительным (или недавно истекшим, если настроено) токеном.
// app.post('/refresh-token', authenticateJWT, async (req, res) => {
//     try {
//         // 1. Находим пользователя в базе по id из текущего декодированного токена (req.user)
//         const user = users.find((u) => u.id === req.user.id);

//         if (!user) {
//             return res.status(404).json({
//                 message: 'Пользователь не найден'
//             });
//         }

//         // 2. Создаем НОВЫЙ JWT токен с обновленным сроком жизни
//         const newToken = jwt.sign(
//             {
//                 id: user.id,
//                 email: user.email,
//                 role: user.role,
//             },
//             JWT_SECRET,
//             {
//                 expiresIn: JWT_EXPIRES_IN
//             }
//         );

//         // 3. Возвращаем новый токен клиенту
//         res.json({
//             message: 'Токен успешно обновлен',
//             token: newToken
//         });

//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json({
//             message: 'Ошибка сервера при обновлении токена'
//         });
//     }
// });

// app.listen(PORT, () => {
//     console.log(`Server running at http://localhost:${PORT}`);
// });

// Задание 1
// Реализация маршрута для обновления email пользователя
// 1.Инициализация проекта:
// Создайте новую папку для проекта и откройте её в терминале.
// Выполните команду `npm init -y`, чтобы инициализировать новый проект.
// Установите необходимые зависимости: `npm install express bcrypt jsonwebtoken`.
// Создайте файл `index.js` и настройте простейший сервер с использованием Express.
// 2.Настройка базовой структуры:
// Создайте массив, который будет симулировать базу данных пользователей с полями `id`, `username`, `email`, и `password`.
// Реализуйте базовую аутентификацию с помощью JWT, если ее еще нет. Убедитесь, что у вас есть маршрут для входа (логина) и генерации токена.
// 3.Создание маршрута для обновления email:
// Создайте маршрут `/update-email`, который будет защищен с помощью JWT. Добавьте middleware для проверки токена (например, `authenticateJWT`).
// В этом маршруте обработайте POST или PUT запросы, где пользователь будет передавать новый email в теле запроса.
// Найдите пользователя в массиве на основе `id` из токена и обновите его email.
// 4.Обработка ошибок и успешного обновления:
// Если пользователь найден и email успешно обновлён, верните ответ с обновленными данными.
// Если пользователь не найден или произошла ошибка, верните соответствующее сообщение об ошибке.
// 5.Тестирование маршрута:
// Проверьте, что обновление email работает корректно, и что неавторизованные запросы блокируются.

// Задание 2
// Реализация маршрута для удаления аккаунта пользователя
// 1.Инициализация проекта:
// Если вы не сделали этого ранее, инициализируйте новый проект с помощью `npm init -y`.

// Установите зависимости: `npm install express bcrypt jsonwebtoken`.
// Создайте файл `index.js` и настройте сервер Express.
// 2.Создание структуры для симуляции базы данных:
// Добавьте массив с пользователями, включающий `id`, `username`, `email`, и `password`.
// Убедитесь, что у вас есть реализация JWT для проверки авторизации.
// 3.Создание маршрута для удаления аккаунта:
// Создайте маршрут `/delete-account`, который будет защищён с помощью JWT.
// Реализуйте middleware для проверки токена, чтобы убедиться, что пользователь авторизован.
// 4.Удаление пользователя:
// Внутри этого маршрута получите данные пользователя из токена и найдите его в массиве.
// Удалите его запись из массива с помощью метода, например `filter`.
// Верните пользователю сообщение о том, что его аккаунт успешно удалён.
// 5.Обработка ошибок:
// Если пользователя не удалось найти или произошла ошибка, верните сообщение об ошибке.
// Проверьте, что маршрут недоступен для неавторизованных пользователей.
// 6.Тестирование:
// Проверьте, что маршрут работает корректно и аккаунты действительно удаляются.

// Задание 3
// Реализация маршрута для обновления роли пользователя
// 1.Инициализация проекта:
// Создайте новый проект с использованием `npm init -y`, если вы не сделали этого ранее.
// Установите необходимые зависимости: `npm install express bcrypt jsonwebtoken`.
// Создайте файл `index.js` и настройте сервер Express.
// 2.Настройка базы данных и JWT:
// Добавьте массив пользователей, включающий `id`, `username`, `email`, `password`, и `role`.
// Реализуйте middleware для проверки JWT, чтобы убедиться, что пользователь авторизован.
// 3.Создание маршрута для обновления роли:
// Создайте маршрут `/update-role`, который будет доступен только администраторам.
// Используйте middleware для проверки роли пользователя (например, `authorizeRole`), чтобы ограничить доступ к этому маршруту только администраторам.
// 4.Обновление роли пользователя:
// В теле запроса передавайте ID пользователя и новую роль.
// Найдите этого пользователя в массиве на основе ID и обновите его роль.
// 5.Обработка ошибок и успешного выполнения:
// Если роль успешно обновлена, верните сообщение об успешном выполнении операции.
// Если произошла ошибка (например, пользователь не найден), верните сообщение об ошибке.
// 6.Тестирование маршрута:
// Проверьте, что маршрут работает корректно и доступен только администраторам.

// Задание 4
// Реализация механизма обновления JWT токена
// 1.Инициализация проекта:
// Инициализируйте новый проект с помощью `npm init -y`.
// становите необходимые зависимости: `npm install express bcrypt jsonwebtoken`.
// Создайте файл `index.js` и настройте сервер Express.
// 2.Создание базы данных и JWT функционала:
// Добавьте массив с пользователями и настройте JWT для аутентификации.
// Убедитесь, что у вас есть маршруты для логина и генерации токенов.
// 3.Создание маршрута для обновления токена:
// Создайте новый маршрут `/refresh-token`, который будет защищен JWT.
// Внутри этого маршрута извлеките текущий токен пользователя из заголовка запроса.
// 4.Проверка токена и создание нового:
// Проверьте, что токен валиден. Если токен просрочен, верните ошибку.
// Если токен действителен, создайте новый JWT токен для пользователя и верните его в ответе.
// 5.Обработка ошибок:
// Если токен неверен или отсутствует, верните сообщение об ошибке.
// Убедитесь, что маршруты корректно реагируют на обновленный токен.
// 6.Тестирование механизма:
// Проверьте, что с новым токеном можно обращаться к защищенным маршрутам и что сессия корректно продлевается.