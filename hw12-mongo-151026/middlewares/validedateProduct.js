export function validateProduct(req, res, next) {
    // Шаг 1: Достаем поля name и price из тела запроса (req.body)
    const { name, price, description } = req.body;

    // Шаг 2: Проверяем, заполнено ли поле name и является ли оно строкой
    if (!name || typeof name !== "string") {
        return res.status(400).json({ 
            error: "Validation error: 'name' is required and must be a string" 
        });
    }

    // Шаг 3: Проверяем, передана ли цена (price) и является ли она числом (или числовым значением)
    // Убедимся также, что цена не отрицательная
    if (price === undefined || typeof price !== "number" || price < 0) {
        return res.status(400).json({ 
            error: "Validation error: 'price' is required and must be a valid positive number" 
        });
    }

    // Проверка описания
    if (!description || typeof description !== "string") {
        return res.status(400).json({ 
            error: "Validation error: 'description' is required and must be a string" 
        });
    }

    // Шаг 4: Если все проверки пройдены успешно, идем дальше к контроллеру
    next();
}