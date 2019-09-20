//1. Создать объект, который описывает ширину и высоту
// прямоугольника, а также может посчитать площадь фигуры:
// const rectangle = {width:..., height:..., getSquare:...};
const rectangle = {
    width: 10,
    height: 12,
    getSquare: function () {
        return this.width * this.height;
    },
};

//2. Создать объект, у которого будет цена товара и его скидка, а также
// два метода: для получения цены и для расчета цены с учетом скидки
const price = {
    price: 100,
    discount: '15%',
    getPrice: function () {
        return this.price;
    },
    getPriceWithDiscount: function () {
        return this.price - this.price * parseFloat(this.discount) / 100;
    },
};

//3. Создать объект, у которого будет поле высота и метод “увеличить
// высоту на один”. Метод должен возвращать новую высоту
const heightCounter = {
    height: 0,
    increase: function () {
        return ++this.height;
    },
};

//4. Создать объект “вычислитель”, у которого есть числовое свойство
// “значение” и методы “удвоить”, “прибавить один”, “отнять один”.
// Методы можно вызывать через точку, образуя цепочку методов
const numerator = {
    value: 1,
    double: function () {
        this.value *= 2;

        return this;
    },
    plusOne: function () {
        this.value += 1;

        return this;
    },
    minusOne: function () {
        this.value -= 1;

        return this;
    },
};

//1. Создать объект с розничной ценой и количеством продуктов. Этот
// объект должен содержать метод для получения общей стоимости
// всех товаров (цена * количество продуктов)
const productPrices = {
    price: 10,
    number: 4,
    getAmount: function () {
        return this.price * this.number;
    },
};

//2. Создать объект из предыдущей задачи. Создать второй объект,
// который описывает количество деталей и цену за одну деталь. Для
// второго объекта нужно узнать общую стоимость всех деталей, но
// нельзя создавать новые функции и методы. Для этого
// “позаимствуйте” метод из предыдущего объекта.
const detailPrices = {
    price: 12,
    number: 5,
};

productPrices.getAmount.call(detailPrices);

//3. Даны объект и функция:
// let sizes = {width: 5, height: 10},
// getSquare = function () {return this.width * this.height};
// Не изменяя функцию или объект, получить результат функции
// getSquare для объекта sizes
const sizes = {width: 5, height: 10};
const getSquare = function () {return this.width * this.height};

getSquare.call(sizes);

//4. let element = {
//     height: 25,
//     getHeight: function () {return this.height;}
// };
//
// let getElementHeight = element.getHeight;
// getElementHeight(); // undefined
//
// Измените функцию getElementHeight таким образом, чтобы можно
// было вызвать getElementHeight() и получить 25.
let element = {
    height: 25,
    getHeight: function () {return this.height;}
};
let getElementHeight = element.getHeight;

getElementHeight = element.getHeight.bind(element);

//Переделать функцию с использованием функции-стрелки (в методе reduce тоже использовать arrow function):

function sum() {
  const params = Array.prototype.slice.call(arguments);

  if (!params.length) return 0;

  return params.reduce(function (prev, next) { return prev + next; });
}

const sumArrow = (...arguments) => {
    const params = Array.prototype.slice.call(arguments);

    if (!params.length) return 0;

    return params.reduce((prev, next) => prev + next);
};

//1. Используя rest оператор и деструктуризацию, создать функцию, которая принимает любое количество аргументов
// и возвращает объект, содержащий первый аргумент и массив из остатка:
//
// func(‘a’, ‘b’, ‘c’, ‘d’) →
// {
//   first: ‘a’,
//   other: [‘b’, ‘c’, ‘d’]
// }
function splitArgs() {
    [a, ...rest] = arguments;

    return {
        first: a,
        other: rest,
    }
}
//в данном случае в деструктуризации нет смысла, проще сделать так:
function splitArgs2(a, ...rest) {
    return {
        first: a,
        other: rest,
    }
}
//2. Организовать функцию getInfo, которая принимает объект вида
// { name: ...,  info: { employees: [...], partners: [ … ]  } }
// и выводит в консоль имя (если имени нет, показывать ‘Unknown’) и первые две компании из массива partners:
const organisation = {
  name: 'Google',
  info: { employees: ['Vlad', 'Olga'], partners: ['Microsoft', 'Facebook', 'Xing']   }
};
// getInfo(organisation); →
// Name: Google 
// Partners: Microsoft Facebook
function getInfo( { name = 'Unknown', info: { partners: [a, b] = [] } = {} } ) {
    console.log(`Name: ${ name }`);
    console.log(`Partners: ${ a }, ${ b }`);
}
getInfo(organisation);
