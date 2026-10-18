import { ObjectId } from "mongodb";

export function validateObjectId(req, res, next) {
    // Шаг 1: Извлекаем id из параметров запроса (например, /products/:id)
    const { id } = req.params;

    // Шаг 2: Проверяем, соответствует ли id стандартному формату ObjectId в MongoDB
    // ObjectId.isValid возвращает true или false
    if (!ObjectId.isValid(id)) {
        // Если ID некорректный, прерываем выполнение и возвращаем клиенту ошибку 400 (Bad Request)
        return res.status(400).json({ error: "Invalid ID format" });
    }

    // Шаг 3: Если проверка прошла успешно, передаем управление следующей функции (контроллеру)
    next();
}