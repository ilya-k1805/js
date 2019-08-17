//Функции
//1. Создать функцию `multiply`, которая будет принимать любое количество чисел и возвращать их произведение: `multiply(1,2,3) = 6 (1*2*3)`
//   * Если нет ни одного аргумента, вернуть ноль: `multiply() // 0`
function multiply() {
    if (arguments.length === 0) {
        return 0;
    }

    let result = 1;

    for (let i = 0; i < arguments.length; i++) {
        result *= arguments[i];
    }

    return result;
}
//или так:
function multiply2(...numbers) {
    if (numbers.length === 0) {
        return 0;
    }

    return numbers.reduce(function (previous, current) {
        return previous * current;
    }, 1)
}

//2. Создать функцию, которая принимает строку и возвращает строку-перевертыш: `reverseString(‘test’) // “tset”`.
function reverseString(string) {
    let stringReversed = '';

    for (let i = string.length - 1; i >= 0; i--) {
        stringReversed += string[i];
    }

    return stringReversed;
}

//3. Создать функцию, которая в качестве аргумента принимает строку из букв и возвращает строку, где каждый символ
// разделен пробелом и заменен на юникод-значение символа:
//
// `getCodeStringFromText(‘hello’) // “104 101 108 108 111” `
//
//   * подсказка: для получения кода используйте специальный метод
function getCodeStringFromText(string) {
    let codeString = '';

    for (let i = 0; i < string.length; i++) {
        codeString += `${ string.charCodeAt(i) } `;
    }

    return codeString.trim();
}

//4. Создать функцию угадай число. Она принимает число от 1-10 (обязательно проверить что число не больше 10 и не меньше 0).
// Генерирует рандомное число от 1-10 и сравнивает с переданным числом если они совпали то возвращает “Вы выиграли” если
// нет то “Вы не угадали ваше число 8 а выпало число 5”. Числа в строке указаны как пример вы подставляете реальные числа.

//Наверное опечатка - проверить что число не больше 10 и не меньше 1
function guessNumber(number) {
    const maxNumber = 10;
    const minNumber = 1;

    if (number < minNumber || number > maxNumber) {
        return;
    }

    //генерация числа в диапазоне - взял готовое решение
    let randomNumber = Math.floor(minNumber + Math.random() * (maxNumber + 1 - minNumber));

    if (number === randomNumber) {
        return 'Вы выиграли';
    }

    return `Вы не угадали, ваше число ${ number }, а выпало число ${ randomNumber }`;
}

//5. Создать функцию, которая принимает число n и возвращает массив, заполненный числами от 1 до n: `getArray(10); // [1,2,3,4,5,6,7,8,9,10]`
function getArrayFromNumber(number) {
    let result = [];

    for (let i = 1; i <= number; i++) {
        result.push(i);
    }

    return result;
}

//6. Создать функцию, которая принимает массив, а возвращает новый массив с дублированными элементами входного массива:
// `doubleArray([1,2,3]) // [1,2,3,1,2,3]`
function doubleArray(array) {
    let doubledArray = array;

    array.forEach(function(item) {
        doubledArray.push(item);
    });

    return doubledArray;
}

//7. Создать функцию, которая принимает произвольное (любое) число массивов и удаляет из каждого массива первый элемент,
// а возвращает массив из оставшихся значений:
// `changeCollection([1,2,3], [‘a’, ’b’, ‘c’]) → [ [2,3], [‘b’, ‘c’] ], changeCollection([1,2,3]) → [ [2,3] ] и т.д.`
function changeCollection(...arrays) {
    arrays.forEach(function (item) {
        item.shift();
    });

    return arrays;
}
//если не хотим использовать shift, то можно так:
function changeCollection2(...arrays) {
    let changedArrays = [];

    arrays.forEach(function (item) {
        changedArrays.push(item.slice(1));
    });

    return changedArrays;
}

//8. Создать функцию которая принимает массив пользователей, поле на которое хочу проверить и значение на которое хочу проверять.
// Проверять что все аргументы переданы. Возвращать новый массив с пользователями соответсвующие указанным параметрам.
// `funcGetUsers(users, “gender”, “male”); // [ {name: “Denis”, age: “29”, gender: “male”} , {name: “Ivan”, age: “20”, gender: “male”} ]`
function funcGetUsers(users, property, value) {
    // в идеале бы проверить, что users это массив объектов и т.д., но думаю тут сойдет
    if (arguments.length < 3) {
        return;
    }

    return users.filter(function (item) {
        return item[property] === value;
    })
}


//# Функции высшего порядка. Задачи.
//1. Создать две функции и дать им осмысленные названия:
// - первая функция принимает массив и колбэк (одна для всех вызовов)
// - вторая функция (колбэк) обрабатывает каждый элемент массива (для каждого вызова свой callback)
//
// Первая функция возвращает строку `“New value: ”` и результат обработки:
//
// ```javascript
// firstFunc([‘my’, ‘name’, ‘is’, ‘Trinity’], handler1) → “New value: MyNameIsTrinity”
// firstFunc([10, 20, 30], handler2) → “New value: 100, 200, 300,”
// firstFunc([{age: 45, name: ‘Jhon’}, {age: 20, name: ‘Aaron’}], handler3) →
// “New value: Jhon is 45, Aaron is 20,”
// firstFunc([‘abc’, ‘123’], handler4) → “New value: cba, 321,” // строки инвертируются
// ```
//
// Подсказка: `secondFunc` должна быть представлена функцией, которая принимает
// один аргумент (каждый элемент массива) и возвращает результат его обработки
function makeNewValueString(array, makeString) {
    let result = 'New value: ';

    array.forEach(function (item) {
        result += makeString(item);
    });

    return result;
}

//я так понял нужно создать только 1 handler:
function makeStringFirstCharToUpperCase(string) {
    return string[0].toUpperCase() + string.substr(1, string.length - 1);
}


//2. Написать аналог метода every. Создайте функцию every, она должна принимать первым аргументом массив чисел
// (обязательно проверьте что передан массив) вторым аргументом `callback` (обязательно проверьте что передана функция)
// функция должна возвращать `true` или `false` в зависимости от результата вызова `callback` (проверить число больше 5).
// `Callback` должен принимать один элемент массива, его индекс в массиве и весь массив.
//
// Что такое метод `every` можно прочитать [здесь](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/every).
function everyAnalogue(numbers, check) {
    if (!Array.isArray(numbers) || typeof check !== 'function') {
        return;
    }

    //использовал for вместо forEach так как внутри forEach нельзя выйти из функции с помощью return.
    //какой бы вариант был бы тут лучше?
    for (let i = 0; i < numbers.length; i++) {
        if (!check(numbers[i], i, numbers)) {
            return false;
        }
    }

    return true;
}


//# Массивы. Перебирающие методы. Задачи.
//1. На основе массива `[1,2,3,5,8,9,10]` сформировать новый массив,
// каждый элемент которого будет хранить информацию о числе и его четности:
function getArrayItemsOdd(array) {
    return array.map(function (item) {
        return {
            digit: item,
            odd: item % 2 > 0
        }
    });
}

//2. Проверить, содержит ли массив `[12, 4, 50, 1, 0, 18, 40]` элементы, равные нулю. Если да - вернуть `false`.
function checkIsArrayWithoutZeros(array) {
    return !array.includes(0);
}

//3. Проверить, содержит ли массив `['yes', 'hello', 'no', 'easycode', 'what']` хотя бы одно слово длиной больше 3х букв.
// Если да - вернуть `true`
function checkIsWordWithLength(array) {
    return array.some(function (item) {
        return item.length > 3;
    });
}

//Я так понял это относится к 4 заданию:

// Дан массив объектов, где каждый объект содержит информацию о букве и месте её положения в строке `{буква: “a”, позиция_в_предложении: 1}`:
//
// ```javascript
// [{char:"a",index:12}, {char:"w",index:8}, {char:"Y",index:10}, {char:"p",index:3}, {char:"p",index:2},
// {char:"N",index:6}, {char:" ",index:5}, {char:"y",index:4}, {char:"r",index:13}, {char:"H",index:0},
// {char:"e",index:11}, {char:"a",index:1}, {char:" ",index:9}, {char:"!",index:14}, {char:"e",index:7}]
// ```
// 4. Напишите функцию, которая из элементов массива соберет и вернёт
// строку, основываясь на index каждой буквы. Например:
// ```javascript
// [{char:"H",index:0}, {char:"i",index: 1}, {char:"!",index:2}] → “Hi!”
// ```
// >Подсказка: вначале отсортируйте массив по index, затем используйте reduce() для построения
// строки
let letters = [{char:"a",index:12}, {char:"w",index:8}, {char:"Y",index:10}, {char:"p",index:3}, {char:"p",index:2},
{char:"N",index:6}, {char:" ",index:5}, {char:"y",index:4}, {char:"r",index:13}, {char:"H",index:0},
{char:"e",index:11}, {char:"a",index:1}, {char:" ",index:9}, {char:"!",index:14}, {char:"e",index:7}];

function getSentence(letters) {
    letters.sort(function (a, b) {
        return a.index - b.index;
    });

    return letters.reduce(function (previous, current) {
        return previous + current.char;
    }, '');
}


//# Массивы. Метод Sort. Задачи.
//
// 1. Отсортируйте массив массивов так, чтобы вначале располагались наименьшие массивы (размер массива определяется его длиной):
// ```javascript
// [ [14, 45],  [1],  ['a', 'c', 'd']  ] → [ [1], [14, 45], ['a', 'c', 'd'] ]
function sortArrays(arrays) {
    return arrays.sort(function (a, b) {
        return a.length - b.length;
    })
}

//2. Есть массив объектов:
// ```javascript
// [
//     {cpu: 'intel', info: {cores:2, сache: 3}},
//     {cpu: 'intel', info: {cores:4, сache: 4}},
//     {cpu: 'amd', info: {cores:1, сache: 1}},
//     {cpu: 'intel', info: {cores:3, сache: 2}},
//     {cpu: 'amd', info: {cores:4, сache: 2}}
// ]
// ```
// Отсортировать их по возрастающему количеству ядер (cores).
function sortComputersByCors(computers) {
    return computers.sort(function (a, b) {
        return a.info.cores - b.info.cores;
    })
}

//3. Создать функцию, которая будет принимать массив продуктов и две цены. Функция должна вернуть все продукты,
// цена которых находится в указанном диапазоне, и сортировать от дешевых к дорогим:
// ```javascript
// let products = [
//     {title: 'prod1', price: 5.2}, {title: 'prod2', price: 0.18},
//     {title: 'prod3', price: 15}, {title: 'prod4', price: 25},
//     {title: 'prod5', price: 18.9}, {title: 'prod6', price: 8},
//     {title: 'prod7', price: 19}, {title: 'prod8', price: 63}
// ];
//
// filterCollection(products, 15, 30) → [{...price: 15}, {...price: 18.9}, {...price: 19}, {...price: 25}]
function getProductsByPrices(products, minPrice, maxPrice) {
    products = products.filter(function (product) {
        return product.price >= minPrice && product.price <= maxPrice;
    });

    return products.sort(function (a, b) {
        return a.price - b.price;
    });
}

