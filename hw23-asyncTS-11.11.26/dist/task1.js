"use strict";
// Задание 1
// Обработка цепочки промисов с `async/await`
// 1 Создайте несколько функций, которые возвращают промисы с разным временем выполнения.
// 2 Напишите функцию, которая вызывает эти промисы поочерёдно, используя `await`, и обрабатывает результаты каждой операции.
// 3 Убедитесь, что цепочка промисов выполняется последовательно.
const getRandomWait = (taskName) => {
    const wait = Math.floor(Math.random() * 2000) + 1000;
    return new Promise((res, rej) => {
        setTimeout(() => {
            // Имитируем случайную ошибку для демонстрации try...catch (например, для второй задачи)
            if (taskName === 'загрузка заказов' && Math.random() < 0.3) {
                rej(new Error(`Сбой сети при выполнении задачи: "${taskName}"`));
                return;
            }
            res(`Задача "${taskName}" была завершена через ${wait}ms`);
        }, wait);
    });
};
const stepOne = () => getRandomWait('авторизация пользователя');
const stepTwo = () => getRandomWait('загрузка заказов');
const stepThree = () => getRandomWait('синхронизация данных');
const runTask1 = async () => {
    try {
        console.log('Старт последовательного выполнения...');
        const res1 = await stepOne();
        console.log(res1);
        const res2 = await stepTwo();
        console.log(res2);
        const res3 = await stepThree();
        console.log(res3);
        console.log('Все операции успешно завершены!');
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
runTask1();
//# sourceMappingURL=task1.js.map