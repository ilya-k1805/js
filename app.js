//# Задание 1
// дана разметка:
// ```html
// <html>
// <head></head>
// <body>
//     <div>
//         <p>Text</p>
//         <p>Other</p>
//         <p>Next</p>
//         <p>Last</p>
//     </div>
//     <div></div>
//     <div></div>
// </body>
// </html>
// ```
//
// Зная структуру html, с помощью изученных
// методов получить (в консоль):
// 1. head
// 2. body
// 3. все дочерние элементы body и вывести их в
// консоль.
// 4. первый div и все его дочерние узлы
// а) вывести все дочерние узлы в консоль
// б) вывести в консоль все дочерние узлы,
// кроме первого и последнего
// Для навигации по DOM использовать методы,
// которые возвращают только элементы
//1. head
let head = document.head;
//2. body
let body = document.body;
//3. все дочерние элементы body и вывести их в
// консоль.
console.log(document.body.children);
// 4. первый div и все его дочерние узлы
// а) вывести все дочерние узлы в консоль
console.log(document.querySelector('div').children);
//б) вывести в консоль все дочерние узлы, кроме первого и последнего
let firstDivChildren = document.querySelector('div').children;

console.log(Array.from(firstDivChildren).filter(function (item, i) {
    return i !== 0 && i !== firstDivChildren.length - 1;
}));
// или так:
// но так правда нужно знать что дочерние узлы это p и возвращает все узлы, не только элементы, так что не подходит, но так лаконичнее.
// а вообще зависит от контекста, можно и другие способы придумать
let firstDivChildren2 = document.querySelectorAll('div:first-child > p:not(:first-child):not(:last-child)');

console.log(firstDivChildren2);


//# Задание 2
// Разметка для задач
// ```html
// <div>
//   <article>
//     <p>Lorem ipsum dolor sit amet, odio omnesque ius cu, quo ex atqui antiopam. At detracto menandri eos. Duo in causae viderer, graeci <a href="#">reprehendunt</a> has in. Decore <mark>nemore</mark> philosophia te pro, nobis legere causae ex mei, odio putant mentitum ea ius. Vix nostro deserunt explicari eu.</p>
//   </article>
// </div>
// <ul>
//   <li><a href="#">Link1</a></li>
//   <li><a href="#">Link2</a></li>
//   <li><a href="#">Link3</a></li>
//   <li><a href="#">Link4</a></li>
// </ul><span></span>
// <a href="#">Some link</a>
// ```
//
// 1. Создать функцию, которая принимает два элемента. Функция проверяет, является ли первый элемент родителем для второго:
//
// ```javascript
// isParent(parent, child);
// isParent(document.body.children[0], document.querySelector('mark'));
// // true так как первый див является родительским элементом для mark
//
// isParent(document.querySelector('ul'), document.querySelector('mark'));
// // false так ul НЕ является родительским элементом для mark
// ```
// > Функция принимает только DOM объекты.
//
// 2. Получить список всех ссылок, которые не находятся внутри списка ul
// 3. Найти элемент, который находится перед и после списка ul
//
// 5. *В коде с занятия написать функцию по редактированию задачи.
// 6. *Подумать и улучшить функцию generateId();

//1
function isParent(parent, child) {
    return parent.contains(child);
}

//2 Вот тут не уверен что это хорошее решение, как можно было лучше сделать?
let linksNotInsideUl = Array.from(document.querySelectorAll('a')).filter(function (item) {
    return !item.closest('ul');
});

//3
let elementBeforeUl = document.querySelector('ul').previousElementSibling;
let elementafterUl = document.querySelector('ul').nextElementSibling;

//5
//Тут я предположил что редактировать мы будем, присылая все данные по таску.
//То есть если ничего не поменялось, мы все-равно присылаем старый title и старый text.
//Если же, например, поменялся только title, то присылаем новый title и старый текст и т.д.
function editTask(id, title, text) {
    if (!id) {
        return console.log('id is not set');
    }

    if (!title) {
        return console.log('title is not set');
    }

    for (let i = 0; i <= storage.todo.length - 1; i++) {
        let task = storage.todo[i];
        if (task.id !== id) {
            continue;
        }

        task.title = title;
        task.text = text || '';

        return task;
    }

    return console.log('id not found');
}

//6 Если делать по такому принципу, я бы сделал как-то так:
// Не перебирал бы сам ключ, а установил бы его длинну, и генерировал бы ключ на ее основе.
// Плюс скорее всего эффективнее вынести words.length в переменную, а не каждый раз обращаться к свойству объекта.
function generateId() {
    const words = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';

    const idLength = 10;

    let id = '';

    for (let i = 0, wordsLength = words.length; i < idLength; i++) {
        let index = Math.floor(Math.random() * wordsLength);
        id += words[index];
    }

    return id;
}


