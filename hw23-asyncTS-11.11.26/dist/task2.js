"use strict";
// Задание 2
// Асинхронная обработка данных из массива
// 1 Напишите функцию, которая принимает массив строк.
// 2 Каждая строка будет асинхронно обрабатываться (например, преобразовываться в верхний регистр с задержкой).
// 3 Используйте `Promise.all` для выполнения всех операций параллельно и вывода всех результатов.
const runTask2 = async (strings) => {
    try {
        console.log('Старт параллельной обработки массива...');
        const promises = strings.map((str) => {
            const time = Math.floor(Math.random() * 2000) + 1000;
            return new Promise((resolve) => {
                setTimeout(() => {
                    const upperStr = str.toUpperCase();
                    resolve(`Строка "${upperStr}" обработана за ${time}ms`);
                }, time);
            });
        });
        const results = await Promise.all(promises);
        console.log('Результаты выполнения:', results);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Error during async operations: ', error.message);
        }
        else {
            console.error('Unknown error');
        }
    }
};
runTask2(['javascript', 'typescript', 'async/await', 'promise']);
//# sourceMappingURL=task2.js.map