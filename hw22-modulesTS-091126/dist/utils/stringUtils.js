// Домашняя работа 22
// Задание 1
// Модули для работы со строками
// 1 Создайте файл `stringUtils.ts`, в котором определите функции:
// `capitalize`, которая делает первую букву строки заглавной.
// `reverseString`, которая переворачивает строку задом наперед.
// 2 В файле `main.ts` импортируйте эти функции и протестируйте их на примерах строк.
export const capitalize = (str) => {
    if (typeof str !== 'string') {
        return 'Ошибка: значение должно быть строкой';
    }
    if (str.length === 0) {
        return 'Ошибка: строка пустая';
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
};
export const reverseString = (str) => {
    if (typeof str !== 'string') {
        return 'Ошибка: значение должно быть строкой';
    }
    if (str.length === 0) {
        return 'Ошибка: строка пустая';
    }
    return str.split('').reverse().join('');
};
//# sourceMappingURL=stringUtils.js.map