const list1 = document.querySelectorAll('.list1')[0];
const list2 = document.querySelectorAll('.list1')[1];

const formAdd = document.querySelector('.todoAddForm');

const inputAdd = document.querySelector('.todoName');
const todoSearch = document.querySelector('.todoSearch')

const btn1 = document.querySelector('#btn1');
const deleteBtn = document.querySelector('#delete');

const listGroup = document.querySelector('.listGroup');


// Basic-----------------------------------------------------------

let todos = [];

const addTodo = ((e) => {
    const inputText = inputAdd.value.trim();
    if (inputText == null || inputText == '') {
        showAlert('warning', 'Bir Todo əlavə edin.');
    } else {
        //* interface
        addTodoUI(inputText);
        addTodoStorage(inputText);
        showAlert('success', 'Todo əlavə edildi.')
    }
    //* Storage
    e.preventDefault();
});
btn1.addEventListener('click', addTodo);

const addTodoUI = ((newTodo) => {
    const li = document.createElement('li');
    li.className = 'hiddenList';
    li.textContent = newTodo;

    const a = document.createElement('a');
    a.href = '#';

    const i = document.createElement('i');
    i.className = 'fa-regular fa-circle-xmark';
    i.style.float = 'right'

    a.appendChild(i);
    li.appendChild(a);
    listGroup.appendChild(li);

    inputAdd.value = '';

    if (li.textContent.length > 0) {
        listGroup.style.border = '1px solid #838181'
    }
});

// Alert-----------------------------------------------------------

const showAlert = ((type, message) => {
    const div = document.createElement('div');
    div.textContent = message;

    div.style.padding = '8px';
    div.style.borderRadius = '4px';
    div.style.marginBottom = '7px';
    div.style.marginTop = '7px';

    if (type === 'success') {
        div.style.backgroundColor = '#d4edda'
        div.style.color = '#155724'
        div.style.border = '1px solid #9cc2a5'
    } else if (type === 'warning') {
        div.style.backgroundColor = '#fff3cd'
        div.style.color = '#856404'
        div.style.border = '1px solid #d4c38d'
    }

    list1.appendChild(div)

    setTimeout(() => {
        div.remove();
    }, 2200);
});

// derse baxdiqdan sonra yeniden  Storage_push------------------------------------------------------- 

const addTodoStorage = ((newTodo) => {
    checkTodosFormStorage();
    todos.push(newTodo);
    localStorage.setItem('todos', JSON.stringify(todos));
});
const checkTodosFormStorage = (() => {
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
});

// derse baxdiqdan sonra yeniden  Storage_UI-------------------------------------------------------- 

const pageLoaded = (() => {
    checkTodosFormStorage();
    todos.forEach((todo) => {
        addTodoUI(todo)
    });
});
document.addEventListener('DOMContentLoaded', pageLoaded);

// Silmek_X--------------------------------------------------------

const removeTodoUI = ((e) => {
    if (e.target.className === 'fa-regular fa-circle-xmark') {
        //* ekrandan silmek
        const todo = e.target.parentElement.parentElement;
        todo.remove();
        showAlert('success', 'Todo silindi');

        //* storageden silmek
        removeTodoStorage(todo.textContent);
    }
});
const removeTodoStorage = ((removeTodo) => {
    checkTodosFormStorage();
    todos.forEach((todo, index) => {
        if (removeTodo === todo) {
            todos.splice(index, 1);
        }
    });
    localStorage.setItem('todos', JSON.stringify(todos));
});
list2.addEventListener('click', removeTodoUI);

// Silmek_All------------------------------------------------------

const deleteAll = (() => {
    const hiddenListDelete = document.querySelectorAll('.hiddenList');
    if (hiddenListDelete.length > 0) {
        // ekrandan silmek
        hiddenListDelete.forEach((todo) => {
            todo.remove();
            listGroup.style.border = 'none'
        });
        showAlert('success', 'Todo listlər müvəffəqiyyətlə silindi.');

        // storageden silmek
        todos = [];
        localStorage.setItem('todos', JSON.stringify('todos'))
    } else {
        showAlert('warning', 'Silmək üçün ən az bir Todo olmalıdır.')
    }

});
deleteBtn.addEventListener('click', deleteAll)

//* Search----------------------------------------------------------

const search = ((e) => {
    const searchValue = e.target.value.toLowerCase().trim();
    const hiddenListSearch = document.querySelectorAll('.hiddenList')

    if (hiddenListSearch.length > 0) {
        hiddenListSearch.forEach((todo) => {
            if (todo.textContent.toLowerCase().trim().includes(searchValue)) {
                todo.setAttribute('style', 'display: blok')
            } else {
                todo.setAttribute('style', 'display: none')
            }
        })
    } else {
        showAlert('warning', 'Axtarış etmək üçün ən azı bir Todo olmalıdır.')
    }
});
todoSearch.addEventListener('keyup', search)





