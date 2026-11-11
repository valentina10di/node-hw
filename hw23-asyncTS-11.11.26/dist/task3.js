"use strict";
// Задание 3
// Обработка ошибки в параллельных промисах
// 1 Напишите функцию, которая вызывает три промиса параллельно с помощью `Promise.all`.
// 2 Один из промисов должен намеренно завершиться с ошибкой через `reject`. 
// 3 Обработайте эту ошибку с использованием `try/catch` и выведите соответствующее сообщение.
const getPromiseWithFail = (str, shouldFail = false) => {
    const time = Math.floor(Math.random() * 2000) + 1000;
    return new Promise((res, rej) => {
        setTimeout(() => {
            if (shouldFail) {
                rej(new Error(`Операция "${str}" завершилась с ошибкой!`));
                return;
            }
            res(`${str} было завершено через ${time}с`);
        }, time);
    });
};
const runTask3 = async () => {
    console.time('Время выполнения');
    try {
        console.log('Запуск параллельных промисов...');
        const results = await Promise.all([
            getPromiseWithFail('first'),
            getPromiseWithFail('second', true), // Намеренная ошибка
            getPromiseWithFail('third')
        ]);
        console.log(results);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Error during async operations: ', error.message);
        }
        else {
            console.error('Unknown error');
        }
    }
    finally {
        console.timeEnd('Время выполнения');
    }
};
runTask3();
//# sourceMappingURL=task3.js.map