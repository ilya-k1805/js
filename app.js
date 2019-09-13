(function () {

    const storage = {
        todo: [
            {
                id: '1',
                title: 'Number 1',
                text: 'Text1',
                resolved: false,
            },
            {
                id: '2',
                title: 'Number 2',
                text: 'Text 2',
                resolved: true,
            },
        ],
    };

    let showAllTasksFlag = true;

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
        handleNoTasks();

        form.reset();
    });

    document.querySelector('.show-all-tasks').addEventListener('click', showAllTasks);
    document.querySelector('.show-not-resolved-tasks').addEventListener('click', showNotResolvedTasks);
    table.addEventListener('click', deleteTask);
    table.addEventListener('click', function (e) {
        if (e.target.classList.contains('resolve-button')) {
            setTaskResolved(e.target.closest('tr').dataset.id, true);
        }

        if (e.target.classList.contains('restore-button')) {
            setTaskResolved(e.target.closest('tr').dataset.id, false);
        }

        reloadTasks();
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
            resolved: false,
        };

        storage.todo.push(newToDo);
        addNewTodoToView(newToDo);

        return storage.todo;
    }

    function deleteToDoFromStorage(id) {
        if (!id) {
            return console.log('id is not set');
        }

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
            <tr data-id="${task.id}" ${ task.resolved ? ' class="task-resolved"' : '' }>
              <td>${task.title}</td>
              <td>${task.text}</td>
              <td>
                <i class="fas fa-trash"></i>
                <i class="fas fa-edit"></i>
                ${ !task.resolved ? '<button class="resolve-button">Resolve</button>' : '<button class="restore-button">Restore</button>'}
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
        const currentAlert = document.querySelector('.alert');
        if (currentAlert) {
            alertContainer.removeChild(currentAlert);
        }
    }

    function addNewTodoToView(task) {
        const template = todoTemplate(task);
        table.insertAdjacentHTML("afterbegin", template);
    }

    function handleNoTasks() {
        const noTasksMessageClass = 'no-tasks-message';
        const noTasksMessage = document.querySelector(`.${ noTasksMessageClass }`);

        if (noTasksMessage && storage.todo.length) {
            noTasksMessage.parentNode.removeChild(noTasksMessage);

            return;
        }

        if (!noTasksMessage && !storage.todo.length) {
            alertContainer.insertAdjacentHTML('beforeend', `<div class="${ noTasksMessageClass } row">No Tasks</div>`);
        }
    }

    function deleteTask(e) {
        if (!e.target.classList.contains('fa-trash')) {
            return;
        }

        const tr = e.target.closest('tr');

        deleteToDoFromStorage(tr.dataset.id);
        tr.parentNode.removeChild(tr);

        handleNoTasks();
    }

    function renderTasks(tasks) {
        let tasksString = '';

        tasks.forEach(function (task) {
            const template = todoTemplate(task);
            tasksString += template;
        });

        table.insertAdjacentHTML('afterbegin', tasksString);
    }

    function reloadTasks() {
        table.innerHTML = '';
        let tasks;

        if (!showAllTasksFlag) {
            tasks = storage.todo.filter(function (task) {
                return task.resolved === false;
            });

            renderTasks(tasks);

            return;
        }

        storage.todo.sort(function (a, b) {
            if (a.resolved) {
                return 1;
            }

            return -1;
        });

        renderTasks(storage.todo);
    }

    function showAllTasks() {
        if (!showAllTasksFlag) {
            showAllTasksFlag = true;
        }

        reloadTasks();
    }

    function showNotResolvedTasks() {
        if (showAllTasksFlag) {
            showAllTasksFlag = false;
        }

        reloadTasks();
    }

    function setTaskResolved(taskId, resolved) {
        storage.todo.find(function (task) {
            return task.id === taskId;
        }).resolved = resolved;
    }


    handleNoTasks();
    reloadTasks();
})();

