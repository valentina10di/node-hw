import mongoose from "mongoose";



const publisherSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Введите имя издателя'],
        trim: true,
    },
    location: {
      type: String,
        required: [true, 'Укажите местоположение издателя'],
        trim: true,  
    }
});

const Publisher = mongoose.model('Publisher', publisherSchema);

export default Publisher;

// Задание 2
// Создать связь "один ко многим" между моделями `Publisher` и `Magazine`.
// 1 Определение модели издателя
// Создайте новую схему `Publisher`, которая будет содержать поля, такие как `name` (название издателя) и `location` (местоположение издателя).
// Создайте модель `Publisher`, используя схему `Publisher`.
// 2 Определение модели журнала
// Создайте новую схему `Magazine`, которая будет содержать поля, такие как `title` (название журнала) и `issueNumber` (номер выпуска).
// Добавьте поле `publisher`, которое будет содержать ссылку на модель `Publisher`, к которой относится журнал.
// Создайте модель `Magazine`, используя схему `Magazine`.
// 3 Экспорт и использование моделей
// Убедитесь, что обе модели экспортированы и доступны для использования в других частях приложения.