(function () {

    let storage = {
        todo: [],
    };

    const table = document.querySelector(".table tbody");
    const form = document.querySelector("form");
    const title = document.querySelector("input[name=title]");
    const text = document.querySelector("input[name=text]");
    const alertContainer = document.querySelector('.container');

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        if (title.value === "") {
            alertMessage('alert-danger', 'Title is empty');

            return;
        }

        addNewToDo(title.value, text.value);
        alertMessage('alert-info', 'Task added');

        form.reset();
    });

    table.addEventListener('click', function (e) {
        if (!e.target.classList.contains('fa-trash')) {
            return;
        }

        let tr = e.target.closest('tr');

        deleteToDoFromStorage(tr.dataset.id);
        tr.parentNode.removeChild(tr);
    });

    function generateId() {
        const words = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
        let id = '';

        for (let char of words) {
            let index = Math.floor(Math.random() * words.length);
            id += words[index];
        }

        return id;
    }

    function addNewToDo(title, text) {
        if (!title) {
            return console.log('title is not set');
        }

        const newToDo = {
            id: generateId(),
            title,
            text: text || '',
        };

        storage.todo.push(newToDo);
        addNewTodoToView(newToDo);

        return storage.todo;
    }

    function deleteToDoFromStorage(id) {
        if (!id) {
            return console.log('id is not set');
        }

        //переделать на for удалять сплайсом и сраз делать return
        for (let i = 0; i < storage.todo.length; i++) {
            if (storage.todo[i].id === id) {
                storage.todo.splice(i, 1);

                break;
            }
        }
    }

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

    function todoTemplate(task) {
        return `
            <tr data-id="${task.id}">
              <td>${task.title}</td>
              <td>${task.text}</td>
              <td>
                <i class="fas fa-trash"></i>
                <i class="fas fa-edit"></i>
              </td>
            </tr>
            `;
    }

    function alertMessage(className, message) {
        removeAlert();
        const currentAllert = alertTemplate(className, message);

        alertContainer.insertAdjacentHTML('afterbegin', currentAllert);

        setTimeout(removeAlert, 2000);
    }

    function alertTemplate(className, message) {
        return `<div class="alert ${className}">${message}</div>`;
    }

    function removeAlert() {
        const currentAllert = document.querySelector('.alert');
        if (currentAllert) {
            alertContainer.removeChild(currentAllert);
        }
    }

    function addNewTodoToView(task) {
        const template = todoTemplate(task);
        table.insertAdjacentHTML("afterbegin", template);
    }
})();
