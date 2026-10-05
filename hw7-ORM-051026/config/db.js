import { Sequelize } from "sequelize";
import configData from './config.js';
import 'dotenv/config';

const env = process.env.NODE_ENV || 'development';

const config = configData[env];

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
        host: config.host,
        dialect: config.dialect,
         logging: false, 
    }
)

export default sequelize;






// Задание 3
// Настройка Sequelize в проекте
// 1 Создание файла `db.js`:
// В директории `config` создайте новый файл с именем `db.js`. Этот файл будет использоваться для настройки и подключения Sequelize к вашей базе данных.
// 2 Настройка подключения к базе данных:
// В файле `db.js` импортируйте необходимые модули - `sequelize` и конфигурационный файл.
// Создайте экземпляр Sequelize, используя параметры подключения из файла `config.json`. Убедитесь, что правильно указаны имя базы данных, пользователь, пароль и хост.
// Настройте экземпляр так, чтобы он был доступен для использования в других частях вашего приложения.
// 3 Экспорт экземпляра Sequelize:
// В конце файла `db.js` экспортируйте настроенный экземпляр Sequelize, чтобы его можно было использовать при создании моделей и работе с базой данных.

