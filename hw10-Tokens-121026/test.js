import axios from 'axios';
import 'dotenv/config';

const PORT = process.env.PORT || 3000;
const BASE_URL = `http://localhost:${PORT}`;

// // 1. Тест обновления email
// async function testUpdateEmail() {
//     console.log('\n--- 1. ТЕСТИРОВАНИЕ: Обновление email ---');

//     try {
//         // Шаг 1. Логинимся, чтобы получить валидный JWT токен
//         console.log('Выполняем вход (login) для получения токена...');
//         const loginResponse = await axios.post(`${BASE_URL}/login`, {
//             email: 'user@example.com',
//             password: 'password123',
//         });

//         const token = loginResponse.data.token;
//         console.log('Успешно! Получен токен:', token.substring(0, 20) + '...');

//         // Шаг 2. Пытаемся обновить email БЕЗ токена (неавторизованный запрос)
//         console.log('Тест блокировки: отправляем запрос БЕЗ токена...');
//         try {
//             await axios.put(`${BASE_URL}/update-email`, {
//                 email: 'hacker@example.com'
//             });
//         } catch (error) {
//             console.log('Ожидаемый успех блокировки! Сервер вернул ошибку:', error.response?.status, '|', error.response?.data?.message);
//         }

//         // Шаг 3. Успешное обновление email с токеном
//         console.log('Тест авторизованного запроса: обновляем email на новый...');
//         const newEmail = `new_alex_${Date.now()}@example.com`;
//         const updateResponse = await axios.put(
//             `${BASE_URL}/update-email`, 
//             { email: newEmail },
//             {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             }
//         );

//         console.log('Email успешно обновлен! Ответ сервера:', updateResponse.data);

//     } catch (error) {
//         console.error('Ошибка во время тестирования обновления email:', error.response?.data || error.message);
//     }
// }

// 1. Тест обновления email
async function testUpdateEmail() {
    console.log('\n--- 1. ТЕСТИРОВАНИЕ: Обновление email ---');

    try {
        console.log('Выполняем вход (login) для получения токена...');
        const loginResponse = await axios.post(`${BASE_URL}/login`, {
            email: 'user@example.com',
            password: 'password123',
        });

        const token = loginResponse.data.token;
        console.log('Успешно! Получен токен:', token.substring(0, 20) + '...');

        console.log('Тест блокировки: отправляем запрос БЕЗ токена...');
        try {
            await axios.put(`${BASE_URL}/update-email`, {
                email: 'hacker@example.com'
            });
        } catch (error) {
            console.log('Ожидаемый успех блокировки! Статус:', error.response?.status);
        }

        console.log('Тест авторизованного запроса: обновляем email на новый...');
        const newEmail = `new_alex_${Date.now()}@example.com`;
        await axios.put(
            `${BASE_URL}/update-email`, 
            { email: newEmail },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log('Email временно изменен на:', newEmail);

        // ВАЖНО: Возвращаем email обратно на user@example.com, чтобы следующие тесты смогли залогиниться!
        console.log('Возвращаем исходный email для следующих тестов...');
        await axios.put(
            `${BASE_URL}/update-email`, 
            { email: 'user@example.com' },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log('Исходный email успешно восстановлен.');

    } catch (error) {
        console.error('Ошибка во время тестирования обновления email:', error.response?.data || error.message);
    }
}

// 2. Тест обновления роли (административные права)
async function testRoleUpdate() {
    console.log('\n--- 2. ТЕСТИРОВАНИЕ: Обновление роли ---');

    try {
        // Сценарий 1: Обычный пользователь пытается обновить роль (ожидаем ошибку 403)
        console.log('Получаем токен обычного пользователя (alex)...');
        const regularLogin = await axios.post(`${BASE_URL}/login`, {
            email: 'user@example.com',
            password: 'password123',
        });
        const regularToken = regularLogin.data.token;

        console.log('Попытка обычного пользователя изменить роль...');
        try {
            await axios.patch(`${BASE_URL}/update-role`, {
                userId: '1',
                newRole: 'admin'
            }, {
                headers: { Authorization: `Bearer ${regularToken}` }
            });
        } catch (error) {
            console.log('Успешная блокировка! Обычный пользователь не смог сменить роль.');
            console.log('Статус ответа:', error.response?.status, '| Сообщение:', error.response?.data?.message);
        }

        // Сценарий 2: Администратор меняет роль (ожидаем успех)
        console.log('Получаем токен администратора (boss)...');
        const adminLogin = await axios.post(`${BASE_URL}/login`, {
            email: 'admin@example.com',
            password: 'admin123',
        });
        const adminToken = adminLogin.data.token;

        console.log('Администратор отправляет запрос на смену роли пользователя...');
        const updateResponse = await axios.patch(`${BASE_URL}/update-role`, {
            userId: '1',
            newRole: 'admin'
        }, {
            headers: { Authorization: `Bearer ${adminToken}` }
        });

        console.log('Роль успешно обновлена админом!', updateResponse.data);

    } catch (error) {
        console.error('Ошибка в тесте обновления роли:', error.response?.data || error.message);
    }
}

// 3. Тест обновления (refresh) токена
async function testRefreshToken() {
    console.log('\n--- 3. ТЕСТИРОВАНИЕ: Refresh Token ---');

    try {
        console.log('Выполняем вход для получения старого токена...');
        const loginResponse = await axios.post(`${BASE_URL}/login`, {
            email: 'user@example.com',
            password: 'password123',
        });
        const oldToken = loginResponse.data.token;

        console.log('Запрашиваем новый токен через /refresh-token...');
        const refreshResponse = await axios.post(`${BASE_URL}/refresh-token`, {}, {
            headers: {
                Authorization: `Bearer ${oldToken}`
            }
        });

        const newToken = refreshResponse.data.token;
        console.log('Новый токен успешно выдан:', newToken.substring(0, 25) + '...');

        console.log('Проверяем работу нового токена на защищенном маршруте...');
        const testUpdate = await axios.put(`${BASE_URL}/update-email`, {
            email: `refreshed_test_${Date.now()}@example.com`
        }, {
            headers: {
                Authorization: `Bearer ${newToken}`
            }
        });

        console.log('Успех! Сессия продлена, новый токен принят:', testUpdate.data.message);

    } catch (error) {
        console.error('Ошибка в тесте refresh token:', error.response?.data || error.message);
    }
}

// 4. Тест удаления аккаунта
async function testDeleteAccount() {
    console.log('\n--- 4. ТЕСТИРОВАНИЕ: Удаление аккаунта ---');

    try {
        console.log('Авторизация пользователя для удаления...');
        const loginResponse = await axios.post(`${BASE_URL}/login`, {
            email: 'user@example.com',
            password: 'password123',
        });

        const token = loginResponse.data.token;

        console.log('Тест безопасности: попытка удаления аккаунта БЕЗ токена...');
        try {
            await axios.delete(`${BASE_URL}/delete-account`);
        } catch (error) {
            console.log('Запрос успешно заблокирован! Статус:', error.response?.status);
        }

        console.log('Тест удаления аккаунта с валидным токеном...');
        const deleteResponse = await axios.delete(`${BASE_URL}/delete-account`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log('Результат:', deleteResponse.data.message);

        console.log('Проверка: пытаемся войти в удаленный аккаунт...');
        try {
            await axios.post(`${BASE_URL}/login`, {
                email: 'user@example.com',
                password: 'password123',
            });
        } catch (error) {
            console.log('Вход ожидаемо отклонен! Статус ответа:', error.response?.status);
        }

    } catch (error) {
        console.error('Ошибка в процессе тестирования удаления:', error.response?.data || error.message);
    }
}

// Главная функция для последовательного запуска всех тестов
async function runAllTests() {
    console.log('       ЗАПУСК ВСЕХ ТЕСТОВ СЕРВЕРА       ');

    await testUpdateEmail();
    await testRoleUpdate();
    await testRefreshToken();
    await testDeleteAccount(); // Этот тест удаляет пользователя, поэтому он поставлен последним


    console.log('       ВСЕ ТЕСТЫ ЗАВЕРШЕНЫ              ');

}

runAllTests();