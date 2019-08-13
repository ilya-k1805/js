//Строки. Задачи.
const string = 'some test string';

const lastCharPosition = string.length - 1;

//1. Получить первую и последнюю буквы строки
let firstChar = string[0];
let lastChar = string[lastCharPosition];

//2. Сделать первую и последнюю буквы в верхнем регистре
let firstAndLastCharsUpper = firstChar.toUpperCase() + string.substr(1, lastCharPosition - 1) + lastChar.toUpperCase();

//3. Найти положение слова ‘string’ в строке
let stringPosition = string.indexOf('string');

//4. Найти положение второго пробела (“вручную” ничего не считать)
let secondSpacePosition = string.indexOf(' ', string.indexOf(' ') + 1);

//5. Получить строку с 5-го символа длиной 4 буквы
//Непонятно с 5 символа включительно или нет? Пишу оба варианта.
let substr1 = string.substr(4, 4);
let substr2 = string.substr(5, 4);

//6. Получить строку с 5-го по 9-й символы
//Опять таки, оба варианта.
let substr3 = string.substring(4, 9);
let substr4 = string.substring(5, 9);

//7. Получить новую строку из исходной путем удаления последних 6-и символов
// (то есть исходная строка без последних 6и символов)
let substr5 = string.slice(0, -6);

//8. Из двух переменных a=20 и b=16 получить переменную string, в которой будет
// содержаться текст “2016”
let a = 20;
let b = 16;
let substr6 = `${ a }${ b }`;


//Числа. Задачи
//1. Получить число pi из Math и округлить его до 2-х знаков после точки
let piRounded = Math.round(Math.PI * 100) / 100;
//или
let piRounded2 = +Math.PI.toFixed(2);

//2. Используя Math, найти максимальное и минимальное числа из представленного ряда 15, 11, 16, 12, 51, 12, 13, 51
let maxNumber = Math.max(15, 11, 16, 12, 51, 12, 13, 51);
let minNumber = Math.min(15, 11, 16, 12, 51, 12, 13, 51);

//3. Работа с Math.random:
//a. Получить случайное число и округлить его до двух цифр после запятой
let randomNumber = Math.round(Math.random() * 100) / 100;
//b. Получить случайное целое число от 0 до X. X - любое произвольное число.
const x = 10;
let wholeRandomNumber = Math.floor(Math.random() * x);

//4. Проверить результат вычисления 0.6 + 0.7 - как привести к нормальному виду (1.3)?
//Например, так
let sum = (0.6 * 10 + 0.7 * 10) / 10;

//5. Получить число из строки ‘100$’
let numFromString = parseInt('100$');


//Чему равно а, почему?
let a2;
a2 = 0 || 'string'; // = true - тут ИЛИ и второе значение true
a2 = 1 && 'string'; // = true - тут И и оба значений true
a2 = null || 25; // = true - тут ИЛИ и второе значение true
a2 = null && 25; // = false - тут И и первое значение false, видит первое false и дальше не идет
a2 = null || 0 || 35; // true - тут ИЛИ и последнее значение true
a2 = null && 0 && 35; // false - тут И - первое false и дальше не идет

//Что отобразится в консоли. Почему?
//12 + 14 + '12' - Ответ: '2612' - слева направо сначала посчитает 12 + 14 = 26. Потом сконкатенирует со строкой '12'
//3 + 2 - '1' - Ответ: 4. Строка '1' преобразуется в 1.
//'3' + 2 - 1 - Ответ: 31. Сначала конкатенация и получается '32'. Затем арифметическая операция и '32' преобразуется в 32.
//true + 2 - Ответ: 3. true при арифметических операциях преобразовывается в 1.
//+'10' + 1 - Ответ: 11. Унарный + преобразется строку в число.
//undefined + 2 - Ответ: NaN. undefined при попытке преобразования в число преобразуется в NaN. NaN + число = NaN.
//null + 5 - Ответ: 5. null преобразовывается в 0.
//true + undefined - Ответ: NaN. true  преобразовывается в 1. undefined в NaN. NaN + число = NaN.

//1. Если переменная равна “hidden”, присвоить ей значение “visible”, иначе - “hidden”.
let visibility = 'something';

if (visibility === 'hidden') {
    visibility = 'visible';
} else {
    visibility = 'hidden';
}
//2. Используя if, записать условие:
//
// a. если переменная равна нулю, присвоить ей 1;
//
// b. если меньше нуля - строку “less then zero”;
//
// c. если больше нуля - используя оператор “присвоение”, переменную умножить на 10 (использовать краткую запись).
let number = 100500;
if (number === 0) {
    number = 1;
} else if (number < 0) {
    number = 'less then zero';
} else {
    number *= 10;
}
//3. Дан объект let car = { name: 'Lexus', age: 10, create: 2008, needRepair: false }.
//
// Написать условие если возраст машины больше 5 лет то нужно вывести в консоль сообщение Repair' и свойство
// needRepair в объекте car изменить на true; иначе изменить на false.
let car = { name: 'Lexus', age: 10, create: 2008, needRepair: false };

if (car.age > 5) {
    console.log('Repair');
    car.needRepair = true;
} else {
    car.needRepair = false;
}
//4. Дан объект let item = { name: 'Intel core i7', price: '100$', discount: '15%' }.
// Написать условие если у item есть поле discount и там есть значение то в объекте item создать поле priceWithDiscount
// и записать туда цену с учетом скидки и вывести ее в консоль, обратите внимание что поля discount и price это строки
// и вам из них нужно получить числа чтобы выполнить расчет. иначе если поля discount нет то вывести просто поле price
// в консоль.
let item = { name: 'Intel core i7', price: '100$', discount: '15%' };

//тут не совсем понятно что подразумевается под "есть значение": пустая строка, null в данном случае это есть значение?
if ('discount' in item && typeof item.discount !== 'undefined') {
    item.priceWithDiscount = `${ parseInt(item.price) * ((100 - parseInt(item.discount)) / 100) }$`;
    console.log(item.priceWithDiscount);
} else {
    console.log(item.price);
}

//5. Дан следующий код:
//
// let product = { name: “Яблоко”, price: “10$” };
//
// let min = 10; // минимальная цена let max = 20; // максимальная цена
// let max = 20; // максимальная цена

//
// Написать условие если цена товара больше или равна минимальной цене и меньше или равна максимальной цене то
// вывести в консоль название этого товара, иначе вывести в консоль что товаров не найдено.
let product = { name: 'Яблоко', price: '10$' };
let min = 10; // минимальная цена let max = 20; // максимальная цена
let max = 20; // максимальная цена

let productPrice = parseInt(product.price);
if (productPrice >= min && productPrice <= max) {
    console.log(product.name);
} else {
    console.log('products not found');
}

//Объекты. Задачи.
let newObj = {};
//1. Создать объект с полем product, равным ‘iphone’
newObj.product = 'iphone';
//2. Добавить в объект поле price, равное 1000 и поле currency, равное ‘dollar’
newObj.price = 1000;
newObj.currency = 'dollar';
//3. Добавить поле details, которое будет содержать объект с полями model и color
newObj.details = {
    model: 'modelName',
    color: 'red',
};

//Тернарный оператор. Switch case. Задачи.
//1.
let value = 'qwe';
switch (value) {
    case 'block': console.log('block');
    break;

    case 'none': console.log('none');
    break;

    case 'inline': console.log('inline');
    break;

    default: console.log('without any changes');
}
//2.1
visibility = 'hidden';

visibility = visibility === 'hidden' ? 'visible' : 'hidden';

//2.2
number = 100500;

number = number === 0 ? 1 : number < 0 ? 'less then zero' : number * 10;

//2.3
car = { name: 'Lexus', age: 10, create: 2008, needRepair: false };

car.needRepair = car.age > 5 ? true : false;
//такое выражение не имеет смысла, проще так:
car.needRepair = car.age > 5;


//Циклы. Задачи.
//1. На основе строки “i am in the easycode” сделать новую строку где первые буквы каждого слова
// будут в верхнем регистре. Использовать for или while.
let testString = 'i am in the easycode';
let newString = '';

for (let i = 0; i < testString.length; i++) {
    if (i === 0 || testString[i - 1] === ' ') {
        newString += testString[i].toUpperCase();

        continue;
    }

    newString += testString[i];
}
//или как-то так
let newString2 = '';
let testArray = testString.split(' ');
for (let i = 0; i < testArray.length; i++) {
    newString2 += testArray[i][0].toUpperCase() + testArray[i].substr(1);

    if (i !== testArray.length - 1) {
        newString2 += ' ';
    }
}

//2. Дана строка “tseb eht ma i”. Используя циклы, сделать строку-перевертыш (то есть последняя буква
// становится первой, предпоследняя - второй итд).
let string2 = 'tseb eht ma i';
let stringReversed = '';

for (let i = string2.length - 1; i >= 0; i--) {
    stringReversed += string2[i];
}

//3. Факториал числа - произведение всех натуральных чисел от 1 до n
// включительно: 3! = 3*2*1, 5! = 5*4*3*2*1. С помощью циклов вычислить факториал числа 10.
// Использовать for
let result = 1;
let factorialOf = 10;

for (let i = 1; i <= factorialOf; i++) {
    result *= i;
}
//4. На основе строки “JavaScript is a pretty good language” сделать новую строку,
// где каждое слово начинается с большой буквы, а пробелы удалены. Использовать for.
testString = 'JavaScript is a pretty good language';
newString = '';

for (let i = 0; i < testString.length; i++) {
    if (testString[i] === ' ') {
        continue;
    }

    if (i === 0 || testString[i - 1] === ' ') {
        newString += testString[i].toUpperCase();

        continue;
    }

    newString += testString[i];
}

//5. Найти все нечетные числа в массиве от 1 до 15 включительно и вывести их в консоль. Массив [1, 2,
// 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15] Использовать for of.
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

for (let number of numbers) {
    if (number % 2) {
        console.log(number);
    }
}

//6. Перебрать объект и если значение в свойстве это строка то переписать ее всю в верхнем регистре.
// Использовать for in.
let list = {
    name: 'denis',
    work: 'easycode',
    age: 29
}

for (let listItem in list) {
    if (typeof list[listItem] === 'string') {
        list[listItem] = list[listItem].toUpperCase();
    }
}

console.log(list);


