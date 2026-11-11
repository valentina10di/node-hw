// Задание 4
// Асинхронная функция с динамическим временем выполнения
// 1 Напишите асинхронную функцию, которая принимает массив чисел.
// 2 Для каждого числа создайте промис, который будет завершаться через количество миллисекунд, равное значению числа.
// 3 Используйте `Promise.all` для ожидания завершения всех промисов и вывода результатов в консоль.
 
//а)Первый вариант решения с объвленными значениями в массиве
// const runTask4 = async (waits: number[]): Promise<void> => {
//   console.time('Общее время выполнения');

//   try {
//     console.log('Запуск промисов с динамическим временем...');

//     const promises = waits.map((ms) => {
//       return new Promise<string>((resolve) => {
//         setTimeout(() => {
//           resolve(`${ms} выполнилось за ${ms}ms`);
//         }, ms);
//       });
//     });

   
//     const results = await Promise.all(promises);
//     console.log('Результаты:', results);

//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       console.error('Error during async operations: ', error.message);
//     } else {
//       console.error('Unknown error');
//     }
//   } finally {
//     console.timeEnd('Общее время выполнения');
//   }
// };


// runTask4([1000, 500, 2000, 1500]);


// b) на основе первогоя попробовала создать более универсальный код
const runTask4 = async (count: number): Promise<void> => {
  console.time('Общее время выполнения');

  try {
    console.log(`Генерируем массив из ${count} случайных значений и запускаем промисы...`);

    // 1. Генерируем массив рандомных чисел
    const waits: number[] = Array.from({ length: count }, () => {
      return Math.floor(Math.random() * 2500) + 500; 
    });

    console.log('Сгенерированный массив задержек (мс):', waits);

    // Для каждого числа создаю промис с задержкой, равной этому числу
    const promises = waits.map((ms) => {
      return new Promise<string>((resolve) => {
        setTimeout(() => {
          resolve(`${ms} выполнилось за ${ms}ms`);
        }, ms);
      });
    });

    const results = await Promise.all(promises);
    console.log('Результаты:', results);

  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error during async operations: ', error.message);
    } else {
      console.error('Unknown error');
    }
  } finally {
    console.timeEnd('Общее время выполнения');
    console.log("Ура!!! Работает!!!");
  }
};

runTask4(4);


