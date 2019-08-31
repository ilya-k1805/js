//1. Найти параграф и получить его текстовое содержимое (только текст!)
console.log(document.querySelector('p').textContent);
//2. Создать функцию, которая принимает в качестве аргумента узел DOM и возвращает информацию (в виде объекта) о типе узла,
// об имени узла и о количестве дочерних узлов (если детей нет - 0).
function getNodeInfo(node) {
    return {
        type: node.nodeType,
        name: node.nodeName,
        childNodesNumber: node.childNodes.length
    }
}
//3. Получить массив, который состоит из текстового содержимого ссылок внутри списка: getTextFromUl(ul) ---> ["Link1", "Link2", "Link3"]
//Я так понял принимать функция должна узел
function getTextFromUlLinks(ul) {
    let links = ul.querySelectorAll('a');

    return Array.from(links).map(function(link) {
        return link.textContent;
    });
}
//4. В параграфе заменить все дочерние текстовые узлы на “-text-” (вложенные теги должны остаться). Конечный результат:
//
// -text-<a href="#">reprehendunt</a>-text-<mark>nemore</mark>-text-
function replaceTextNodes() {
    const textNodeTypeNumber = 3;
    let newContent = '';
    let p = document.querySelector('p');

    p.childNodes.forEach(function (node) {
        if (node.nodeType === textNodeTypeNumber) {
            newContent += '-text-';

            return;
        }

        newContent += node.outerHTML;
    });

    p.innerHTML = newContent;
}


//1. Найти в коде список ul и добавить класс “list”
let ul = document.querySelector('ul');

ul.classList.add('list');

//2. Найти в коде ссылку, находящуюся после списка ul, и добавить id=link
let ulNextSibling = ul.nextElementSibling;

while (ulNextSibling) {
    if (ulNextSibling.matches('a')) {
        ulNextSibling.id = 'link';

        break;
    }

    ulNextSibling = ulNextSibling.nextElementSibling
}

//3. На li через один (начиная с самого первого) установить класс “item”
let listItems = document.querySelectorAll('li:nth-child(2n+1)');

listItems.forEach(function (item) {
    item.classList.add('item');
});

//4. На все ссылки в примере установить класс “custom-link”
let allLinks = document.querySelectorAll('a');

allLinks.forEach(function (item) {
    item.classList.add('custom-link');
});


//1. Не используя innerHTML, добавить в список несколько li с классом ‘new-item’ и текстом ‘item’ + номер li:
//
// <ul> <li><a href="#">Link1</a></li> ...
//
// <li class=”new-item”>item 5</li> <li class=”new-item”>item 6</li> </ul> Вручную номер li не ставить оно должно подставляться в зависимости от кол-ва лишек в списке.
const liNumberToAdd = 8;

let liNumber = ul.children.length;

for (let i = 1; i <= liNumberToAdd; i++) {
    let liElement = document.createElement('li');
    liElement.classList.add('new-item');
    liElement.appendChild(document.createTextNode(`item${ liNumber + i }`));
    ul.appendChild(liElement);
}
//2. В каждую ссылку, которая находятся внутри списка ul добавить по тегу strong (в каждую ссылку один - strong).
let ulLinks = document.querySelectorAll('a');

ulLinks.forEach(function (link) {
    link.innerHTML = `<strong>${ link.innerHTML }</strong>`;
});

//3. В начало документа (в начало body) добавить картинку img с атрибутами src и alt (текст придумайте сами).
// В src добавьте реальный url к картинке. Для создания элемента используйте метод createElement.
let img = document.createElement('img');
img.src = 'f4a8ac1a2d768fdfbc73dd35f93a9292.jpg';
img.alt = 'fsdfdsfdsf';

document.body.insertBefore(img, document.body.firstChild);

//4. Найти на странице элемент mark, добавить в конец содержимого текст “green” и на элемент установить класс green
let mark = document.querySelector('mark');
mark.appendChild(document.createTextNode('green'));
mark.classList.add('green');

//5. Отсортировать li внутри списка в обратном порядке (по тексту внутри)
let ulItems = ul.querySelectorAll('li');

let sortedUlItems =  Array.from(ulItems).sort(function (a, b) {
    if (b.textContent > a.textContent) { return -1; }
    if (b.textContent < a.textContent) { return 1; }
    return 0;
});
Array.from(sortedUlItems).forEach(function (item) {
    ul.appendChild(item);
});
