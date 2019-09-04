//1. По нажатию на кнопку `"btn-msg"` должен появиться алерт с тем текстом который находится в атрибуте `data-text` у кнопки.
document.querySelector('#btn-msg').addEventListener('click', function (e) {
    alert(this.dataset.text);
});

//2. При наведении указателя мыши на `"btn-msg"`, кнопка становится красной; когда указатель мыши покидает кнопку,
// она становится прежнего цвета. Цвет менять можно через добавление класса.
let btnMsg = document.querySelector('#btn-msg');

btnMsg.addEventListener('mouseover', function (e) {
    this.classList.add('red');
});
btnMsg.addEventListener('mouseout', function (e) {
    this.classList.remove('red');
});

//3. При нажатии на любой узел документа показать в элементе с `id=tag` имя тега нажатого элемента.
let tag = document.querySelector('#tag');

document.body.addEventListener('click', function (e) {
    let tagName = document.querySelector('.tag-name');

    if (tagName) {
        tag.removeChild(tagName);
    }

    tag.insertAdjacentHTML('beforeend', `<span class="tag-name">${ e.target.tagName }</span>`);
});

//4. При нажатии на кнопку `btn-generate` добавлять в список `ul` элемент списка `Li` с текстом `Item`
// + порядковый номер `Li` по списку, т.е `Item 3`, `Item 4` и т.д
let ul = document.querySelector('ul');

document.querySelector('#btn-generate').addEventListener('click', function () {
    let listItems = document.querySelectorAll('ul > li');

    ul.insertAdjacentHTML('beforeend', `<li>Item ${listItems.length + 1}</li>`);
});

//6. Код к задаче [здесь](https://codepen.io/dmgame/pen/WLgxxo)
//    * Реализовать примитивный дропдаун. Изначально все `dropdown-menu` скрыты через класс `.d-none`.
//    При клике на `dropdown-item` должен отображаться блок `dropdown-menu` который вложен именно в тот `dropdown-item`
//    на котором произошел клик. При повторном клике на этот же `dropdown-item` блок `dropdown-menu` должен закрыться.
//    При клике на любой другой `dropdown-item` уже открытый `dropdown-menu` должен закрываться, а на тот который
//    кликнули - открываться.
let menu = document.querySelector('.menu');

menu.addEventListener('click', function (e) {
    let dropDownItem = e.target.closest('.dropdown-item');

    if (!dropDownItem) {
        return;
    }

    let  dropDownItemMenu = dropDownItem.querySelector('.dropdown-menu');

    if (!dropDownItemMenu.classList.contains('d-none')) {
        dropDownItemMenu.classList.add('d-none');

        return;
    }

    let openDropDownItemMenu = menu.querySelector('.dropdown-menu:not(.d-none)');

    dropDownItemMenu.classList.remove('d-none');

    if (openDropDownItemMenu) {
        openDropDownItemMenu.classList.add('d-none');
    }
});

//7. Из домашнего задания “Занятие 4 - Манипуляция DOM. Работа с атрибутами.” Дополнить функционал для таблицы
// из задачи 6. Создать кнопку которая будет при клике сортировать пользователей по возрастанию и убыванию поля `balance`
// при этом в кнопке должна показываться стрелка в какую сторону сейчас отсортированы пользователи. Иконки можете взять
// с font awesome, в качестве фреймворка использовался bootstrap.
(function () {
    let users = [
        {
            "_id": "5d220b10e8265cc978e2586b",
            "isActive": true,
            "balance": 2853.33,
            "age": 20,
            "name": "Buckner Osborne",
            "gender": "male",
            "company": "EMPIRICA",
            "email": "bucknerosborne@empirica.com",
            "phone": "+1 (850) 411-2997",
            "registered": "2018-08-13T04:28:45 -03:00",
            "nestedField": { total: 300 }
        },
        {
            "_id": "5d220b10144ef972f6c2b332",
            "isActive": true,
            "balance": 1464.63,
            "age": 38,
            "name": "Rosalie Smith",
            "gender": "female",
            "company": "KATAKANA",
            "email": "rosaliesmith@katakana.com",
            "phone": "+1 (943) 463-2496",
            "registered": "2016-12-09T05:15:34 -02:00",
            "nestedField": { total: 400 }
        },
        {
            "_id": "5d220b1083a0494655cdecf6",
            "isActive": false,
            "balance": 2823.39,
            "age": 40,
            "name": "Estrada Davenport",
            "gender": "male",
            "company": "EBIDCO",
            "email": "estradadavenport@ebidco.com",
            "phone": "+1 (890) 461-2088",
            "registered": "2016-03-04T03:36:38 -02:00",
            "nestedField": { total: 200 }
        }
    ];

    const tableHeaders = {
        name: 'Name',
        email: 'Email',
        balance: 'Balance',
    };



    function buildTable(containerClassName, sortUsers) {
        let table = document.createElement('table');

        table.appendChild(getTableHeader());
        table.appendChild(getTableBody(sortUsers));

        document.querySelector(`.${ containerClassName }`).appendChild(table);
    }

    function getTableHeader() {
        let thead = document.createElement('thead');
        let tr = document.createElement('tr');

        for (let header in tableHeaders) {
            tr.appendChild(getTd(tableHeaders[header]));
        }

        thead.appendChild(tr);

        return thead;
    }

    function getTableBody(sortUsers) {
        let tbody = document.createElement('tbody');
        let balance = 0;

        if (sortUsers) {
            users = users.sort(sortUsers);
        }

        users.forEach(function (user) {
            let tr = document.createElement('tr');

            for (let header in tableHeaders) {
                tr.appendChild(getTd(user[header]));
            }

            balance += user['balance'];

            tbody.appendChild(tr);
        });

        tbody.appendChild(getBalanceTr(balance.toFixed(2)));

        return tbody;
    }

    function getBalanceTr(balance) {
        let tr = document.createElement('tr');
        let td = getTd(`Total balance: ${ balance }`);

        td.setAttribute('colspan', Object.keys(tableHeaders).length);
        td.classList.add('alnright');

        tr.appendChild(td);

        return tr;
    }

    function getTd(content) {
        let td = document.createElement('td');
        td.textContent = content;

        return td;
    }

    function sortUsersAsc(a, b) {
        return a.balance - b.balance;
    }

    function sortUsersDesc(a, b) {
        return b.balance - a.balance;
    }

    buildTable('table-container');

    
    ///////новый код/////////////////
    //также добавил вызов новой переданной функции в старый код
    let button = document.createElement('button');
    let i = document.createElement('i');
    button.appendChild(document.createTextNode('SORT '));
    button.appendChild(i);

    button.addEventListener('click', function (e) {
        let table = document.querySelector('.table-container table');
        table.parentNode.removeChild(table);

        if (table.classList.contains('sorted-asc')) {
            buildTable('table-container', sortUsersDesc);
            document.querySelector('.table-container table').classList.add('sorted-desc');
            i.classList.remove('sorted-asc');
            i.classList.add('sorted-desc');

            return;
        }

        buildTable('table-container', sortUsersAsc);
        document.querySelector('.table-container table').classList.add('sorted-asc');
        i.classList.remove('sorted-desc');
        i.classList.add('sorted-asc');
    });

    document.body.appendChild(button);

    ///////////////////////////////////
})();