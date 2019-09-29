const userManager = (function () {
    const usersUrl = 'https://jsonplaceholder.typicode.com/users';

    let users = [];

    let container = null;
    let info = null;
    let addForm = null;
    let name = null;
    let email = null;
    let username = null;
    let phone = null;
    let website = null;

    const loadUsers = cb => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', usersUrl);

        xhr.addEventListener('load', () => {
            users = JSON.parse(xhr.responseText);
            cb();
        });

        xhr.send();
    };

    const showAllUsers = () => {
        let usersHtml = '';
        users.forEach(user => {
            usersHtml += getUserTemplate(user);
        });

        container.insertAdjacentHTML('afterbegin', usersHtml);
    };

    const showUserInfo = userId => {
        let user = getUserById(parseInt(userId));

        info.innerHTML = getUserInfoTemplate(user);
    };

    const addUser = e => {
        e.preventDefault();

        addUserToStorage({
            name: name.value,
            username: username.value,
            email: email.value,
            phone: phone.value,
            website: website.value,
        }, handleAddedUser);
    };

    const addUserToStorage = (userData, cb) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', usersUrl);

        xhr.addEventListener('load', () => {
            cb(JSON.parse(xhr.responseText));
        });

        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

        xhr.send(JSON.stringify(userData));
    };

    const handleAddedUser = user => {
        users.push(user);
        let userHtml = getUserTemplate(user);
        container.insertAdjacentHTML('beforeend', userHtml);
    };

    const getUserById = id => users.find(user => user.id === id);

    const getUserTemplate = (user) => `<p class="user" data-id="${ user.id }">${ user.name }</p>`;

    const getUserInfoTemplate = (user) => {
        return `
        User info:
        <p>${ user.name }</p>
        <p>${ user.username }</p>
        <p>${ user.email }</p>
        <p>${ user.phone }</p>
        <p>${ user.website }</p>
    `;
    };

    const handleUserClick = (e) => {
        if (e.target.hasAttribute('data-id')) {
            showUserInfo(e.target.dataset.id);
        }
    };

    const init = () => {
        container = document.querySelector('.users-container');
        info = document.querySelector('.user-info');
        addForm = document.querySelector('form[name=addUser]');
        name = addForm.querySelector('input[name=name]');
        email = addForm.querySelector(['input[name=email]']);
        username = addForm.querySelector(['input[name=username]']);
        phone = addForm.querySelector(['input[name=phone]']);
        website = addForm.querySelector(['input[name=website]']);

        container.addEventListener('click', handleUserClick);
        addForm.addEventListener('submit', addUser);

        loadUsers(showAllUsers);
    };

    return {
        init
    };
}());

userManager.init();
