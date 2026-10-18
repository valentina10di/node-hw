export function errorHandler(err, _req, res, _next) {
    // Шаг 1: Логируем ошибку в консоль сервера для разработчика (чтобы видеть, что случилось)
    console.error("Global Error Handler:", err);

    // Шаг 2: Определяем статус ответа
    // Если статус уже был установлен (например, 400 или 404), оставляем его, иначе ставим 500 (Internal Server Error)
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    // Шаг 3: Отправляем клиенту красивый JSON с описанием ошибки
    res.status(statusCode).json({
        error: {
            message: err.message || "Internal Server Error",
            status: statusCode,
        }
    });
    
}