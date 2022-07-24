const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');

let tasks = [];

if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
}

tasks.forEach(function (task) { 
    const cssClass = task.done ? 'task-title task-title--done' : 'task-title';
    
    const taskHTML =`
        <li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
            <span class="${cssClass}">${task.text}</span>
            <div class="task-item__buttons">
                <button type="button" data-action="done" class="btn-action">
                    <img src="./img/tick.svg" alt="Done" width="18" height="18">
                </button>
                <button type="button" data-action="delete" class="btn-action">
                    <img src="./img/cross.svg" alt="Done" width="18" height="18">
                </button>
            </div>
        </li>`;
    
    tasksList.insertAdjacentHTML('beforeend', taskHTML);
})

checkEmptyList();

form.addEventListener('submit', addTask);
tasksList.addEventListener('click', deleteTask)
tasksList.addEventListener('click', doneTask)

//if (localStorage.getItem('tasksHTML')) {
    //tasksList.innerHTML = localStorage.getItem('tasksHTML');
//}


function addTask (event) {
    event.preventDefault(); //отменя отправки формы

    const taskText = taskInput.value // Достали текст задачи из поля ввода
    
    const newTask = {
        id:Date.now(),
        text: taskText,
        done: false,
    }

    tasks.push(newTask);

    saveLocalStorage();

    console.log(tasks);

    const cssClass = newTask.done ? 'task-title task-title--done' : 'task-title';
    
    const taskHTML =`
        <li id="${newTask.id}" class="list-group-item d-flex justify-content-between task-item">
            <span class="${cssClass}">${newTask.text}</span>
            <div class="task-item__buttons">
                <button type="button" data-action="done" class="btn-action">
                    <img src="./img/tick.svg" alt="Done" width="18" height="18">
                </button>
                <button type="button" data-action="delete" class="btn-action">
                    <img src="./img/cross.svg" alt="Done" width="18" height="18">
                </button>
            </div>
        </li>`;
    
    tasksList.insertAdjacentHTML('beforeend', taskHTML); //Добавили задачу на страницу

    taskInput.value ="" //Очистили поле ввода
    taskInput.focus() //изменили фокус

    //if (tasksList.children.length > 1) {
        //emptyList.classList.add('none'); 
    //}

    //saveHTMLtoLS();

    checkEmptyList();
}

function deleteTask(event) {
    //console.log(event.target);

    if (event.target.dataset.action !== 'delete') return;

    //console.log('Delete');
    const parenNode = event.target.closest('.list-group-item');
    
    const id = Number(parenNode.id); //определяем ID задачи
    //console.log(parenNode.id);

    //const index = tasks.findIndex((task) => task.id === id); //находим индекс задачи в массиве

    //console.log(index);
 
    //tasks.splice(index, 1) //удаляем задачу из массива с задачами
    
    tasks = tasks.filter((task) => task.id !== id) //удаляем задачу через фильтрацию массива
    
    //console.log(tasks);

    saveLocalStorage();

    parenNode.remove(); //удаляем задачу из разметки

   // if (tasksList.children.length === 1) {
        //emptyList.classList.remove('none'); 
    //}

    //saveHTMLtoLS();

    checkEmptyList();
}

function doneTask(event) {
    if (event.target.dataset.action !== 'done') return
    
    const parentNode = event.target.closest('.list-group-item');

    const id = Number(parentNode.id);
    const task = tasks.find( (task) => task.id === id)
    task.done = !task.done

    //console.log(task);

    saveLocalStorage();

    const taskTitle = parentNode.querySelector('.task-title');
    taskTitle.classList.toggle('task-title--done');

    //saveHTMLtoLS();
}

//function saveHTMLtoLS() {
    //localStorage.setItem('tasksHTML', tasksList.innerHTML);
//}

function checkEmptyList() {
    if (tasks.lenght === 0) {
        const emptyListHTML = `<li id="emptyList" class="list-group-item empty-list">
            <img src="./leaf.svg" alt="Empty" width="48" class="mt-3">
            <div class="empty-list__title">Список дел пуст</div>
        </li>`;
        tasksList.insertAdjacentHTML('afterbegin', emptyListHTML);
    }

    if (tasks.length > 0) {
        const emptyListEl = document.querySelector('#emptyList');
        emptyListEl ? emptyListEl.remove() : null;
    }
}

function saveLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}