import express from 'express';
import 'dotenv/config';
import bcrypt from 'bcrypt';

const PORT = process.env.PORT || 3000;

// Имитация базы данных пользователей (в памяти)
// Добавлены новые поля согласно домашнему заданию: email, mustChangePassword, role
const users = [];

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.get('/', (_req, res) => {
    res.send('Home page');
});

// ==========================================
// Задача 1: Проверка уникальности email при регистрации
// ==========================================
app.post('/register', async (req, res, _next) => {
    try {
        const { email, password, role } = req.body ?? {};

        // Проверяем, что переданы обязательные поля
        if (!email || !password) {
            return res.status(400).json({ message: 'email и password обязательны' });
        }

        // Шаг 2: Проверяем, существует ли уже пользователь с таким email
        const existingUser = users.find((user) => user.email === email);
        
        // Шаг 3: Если email уже занят, возвращаем ошибку 409 (Conflict)
        if (existingUser) {
            return res.status(409).json({ message: 'Пользователь с таким email уже зарегистрирован' });
        }

        // Шаг 4: Хэшируем пароль с помощью bcrypt перед сохранением
        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = {
            id: users.length + 1,
            email,
            password: hashedPassword,
            // Задача 2: Поле для принудительной смены пароля (по умолчанию false)
            mustChangePassword: false, 
            // Задача 4: Роль пользователя (по умолчанию 'user', если не передана 'admin')
            role: role === 'admin' ? 'admin' : 'user', 
        };

        users.push(newUser);
        console.log('Текущие пользователи:', users);

        res.status(201).json({
            message: 'Пользователь успешно зарегистрирован',
            user: { id: newUser.id, email: newUser.email, role: newUser.role }
        });
    } catch (error) {
        console.error('Ошибка при регистрации:', error.message);
        res.status(500).json({ message: 'Ошибка сервера при регистрации' });
    }
});

// Маршрут входа (для проверки работы сессий/middleware в последующих задачах)
app.post('/login', async (req, res, _next) => {
    try {
        const { email, password } = req.body ?? {};

        if (!email || !password) {
            return res.status(400).json({ message: 'email и password обязательны для заполнения' });
        }

        const user = users.find((u) => u.email === email);
        if (!user) {
            return res.status(401).json({ message: 'Неверный email или пароль' });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Неверный email или пароль' });
        }

        // Пример передачи ID пользователя в заголовке/теле для имитации авторизации в ДЗ
        res.json({
            message: 'Вход выполнен успешно',
            userId: user.id,
            mustChangePassword: user.mustChangePassword,
            user: { id: user.id, email: user.email, role: user.role },
        });
    } catch (error) {
        console.error('Ошибка при входе', error.message);
        res.status(500).json({ message: 'Ошибка сервера при входе' });
    }
});

// ==========================================
// Задача 2: Принудительное обновление пароля
// ==========================================

// Middleware для проверки необходимости смены пароля
const checkMustChangePassword = (req, res, next) => {
    const userId = req.body.userId || req.headers['x-user-id'];
    const user = users.find((u) => u.id === Number(userId));

    if (user && user.mustChangePassword) {
        // Шаг 2: Если флаг true, блокируем доступ и просим сменить пароль
        return res.status(403).json({ 
            message: 'Необходимо сменить пароль перед продолжением работы',
            redirect: '/change-password' 
        });
    }
    next();
};

// Шаг 3: Маршрут для смены пароля
app.post('/change-password', async (req, res) => {
    try {
        const { userId, newPassword } = req.body;

        if (!userId || !newPassword) {
            return res.status(400).json({ message: 'userId и newPassword обязательны' });
        }

        const user = users.find((u) => u.id === Number(userId));
        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }

        // Хэшируем новый пароль через bcrypt
        user.password = await bcrypt.hash(newPassword, 12);
        
        // Сбрасываем флаг необходимости смены пароля в false
        user.mustChangePassword = false;

        res.json({ message: 'Пароль успешно изменен' });
    } catch (error) {
        console.error('Ошибка смены пароля:', error.message);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});


// ==========================================
// Задача 3: Функция удаления аккаунта
// ==========================================
app.post('/delete-account', async (req, res) => {
    try {
        // Шаг 1: Доступно только "авторизованным" (проверяем наличие userId)
        const { userId, currentPassword } = req.body;

        if (!userId || !currentPassword) {
            return res.status(400).json({ message: 'userId и currentPassword обязательны' });
        }

        const userIndex = users.findIndex((u) => u.id === Number(userId));
        if (userIndex === -1) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }

        const user = users[userIndex];

        // Шаг 2: Проверяем текущий пароль с помощью bcrypt.compare
        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordValid) {
            // Если пароль неверен — возвращаем ошибку
            return res.status(401).json({ message: 'Неверный текущий пароль' });
        }

        // Шаг 3: Если пароль верен, удаляем учетную запись из массива (базы данных)
        users.splice(userIndex, 1);

        res.json({ message: 'Аккаунт успешно удален' });
    } catch (error) {
        console.error('Ошибка удаления аккаунта:', error.message);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});


// ==========================================
// Задача 4: Ограничение доступа к маршрутам на основе роли
// ==========================================

// Шаг 3: Middleware для проверки роли администратора
const verifyAdminRole = (req, res, next) => {
    const userId = req.body.userId || req.headers['x-user-id'];
    const user = users.find((u) => u.id === Number(userId));

    if (!user || user.role !== 'admin') {
        // Если пользователь не найден или его роль не admin — возвращаем ошибку доступа
        return res.status(403).json({ message: 'Доступ запрещен. Требуются права администратора.' });
    }

    next(); // Если всё ок, пропускаем дальше
};

// Шаг 2: Создание защищенного маршрута для администраторов
app.get('/admin', verifyAdminRole, (_req, res) => {
    res.json({ message: 'Добро пожаловать в панель администратора!' });
});


// ==========================================
// Задача 5: Реализация функции изменения email
// ==========================================
app.post('/change-email', async (req, res) => {
    try {
        // Шаг 1: Принимаем новый email, текущий пароль и идентификатор пользователя
        const { userId, newEmail, currentPassword } = req.body;

        if (!userId || !newEmail || !currentPassword) {
            return res.status(400).json({ message: 'Заполните все поля (userId, newEmail, currentPassword)' });
        }

        const user = users.find((u) => u.id === Number(userId));
        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }

        // Шаг 2: Проверяем текущий пароль с помощью bcrypt.compare
        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Неверный текущий пароль' });
        }

        // Дополнительная проверка: проверяем уникальность нового email
        const emailExists = users.find((u) => u.email === newEmail);
        if (emailExists) {
            return res.status(409).json({ message: 'Этот email уже занят другим пользователем' });
        }

        // Шаг 3: Если пароль верен и email уникален — обновляем email
        user.email = newEmail;

        res.json({ 
            message: 'Email успешно изменен', 
            user: { id: user.id, email: user.email, role: user.role } 
        });
    } catch (error) {
        console.error('Ошибка изменения email:', error.message);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});





// Домашняя работа 9
// Задача 1
// Реализация проверки уникальности email при регистрации
// 1 Создание маршрута регистрации:
// Создайте маршрут `POST /register`, который будет принимать данные пользователя, включая email и пароль.
// 2 Проверка уникальности email:
// В этом маршруте перед регистрацией пользователя проверьте, существует ли уже в базе данных пользователь с таким email.
// 3 Возврат ошибки при повторном email:
// Если такой email уже существует, верните ошибку, сообщив пользователю, что email уже зарегистрирован.
// 4 Регистрация нового пользователя:
// Если email уникален, продолжайте регистрацию, хэшируя пароль с помощью `bcrypt`.

// Задача 2
// Реализация принудительного обновления пароля
// 1 Добавление поля для проверки необходимости смены пароля:
// В модель пользователя добавьте поле `mustChangePassword` (булевое значение), которое будет указывать, должен ли пользователь сменить пароль при следующем входе.
// 2 Создание middleware для проверки необходимости смены пароля:
// Создайте middleware, которое будет проверять значение `mustChangePassword` при каждом входе пользователя. Если это значение равно `true`, перенаправляйте пользователя на страницу смены пароля.
// 3 Создание маршрута для смены пароля:
// Создайте маршрут `POST /change-password`, который будет принимать новый пароль и обновлять его в базе данных, предварительно хэшируя с помощью `bcrypt`. После успешной смены пароля установите `mustChangePassword` в `false`.

// Задача 3
// Реализация функции удаления аккаунта
// 1 Создание маршрута для удаления аккаунта:
// Создайте маршрут `POST /delete-account`, который будет доступен только авторизованным пользователям.
// 2 Подтверждение пароля перед удалением аккаунта:
// В этом маршруте попросите пользователя ввести текущий пароль. Проверьте введенный пароль с помощью `bcrypt.compare`.
// 3 Удаление аккаунта:
// Если пароль подтвержден, удалите учетную запись пользователя из базы данных. Если пароль неверен, верните ошибку.

// Задача 4
// Ограничение доступа к маршрутам на основе роли
// 1 Добавление роли пользователю:
// В модель пользователя добавьте поле `role`, которое может быть, например, `user` или `admin`.
// 2 Создание маршрутов для администраторов:
// Создайте маршрут `GET /admin`, который должен быть доступен только пользователям с ролью `admin`.
// 3 Проверка роли пользователя:
// Создайте middleware, которое будет проверять роль пользователя перед доступом к маршруту. Если роль не соответствует `admin`, возвращайте ошибку доступа.

// Задача 5
// Реализация функции изменения email
// 1 Создание маршрута для изменения email:
// Создайте маршрут `POST /change-email`, который будет принимать новый email и текущий пароль.
// 2 Проверка пароля перед изменением email:
// В этом маршруте запросите у пользователя текущий пароль и сравните его с сохраненным в базе данных с помощью `bcrypt.compare`.
// 3 Обновление email:
// Если пароль введен верно, обновите email пользователя в базе данных, предварительно проверив его уникальность. Если пароль неверен, верните ошибку.

