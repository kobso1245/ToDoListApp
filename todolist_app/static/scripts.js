const categoriesValues = ['First', 'Second', 'Third'];

class ToDoClass {
    constructor() {
        let tasks = JSON.parse(localStorage.getItem('TASKS'));
        if(!tasks) {
            this.tasks = [
                {task: 'Go to Dentist', isComplete: false},
                {task: 'Do Gardening', isComplete: true},
                {task: 'Renew Library Account', isComplete: false},
            ];
        }
        else {
            this.tasks = tasks;
        }
        this.loadTasks();
        this.loadCategories();
        this.addEventListeners();
    }

    loadTasks() {
        let tasksHtml = this.tasks.reduce((html, task, index) => html +=
            this.generateTaskHtml(task, index), '');
        $('#taskList').html(tasksHtml);

        localStorage.setItem('TASKS', JSON.stringify(this.tasks));
    }

    generateTaskHtml(task, index) {
            return `
      <li class="list-group-item checkbox">
       <div class="row">
        <div class="col-md-1 col-xs-1 col-lg-1 col-sm-1 checkbox">
         <label><input id="toggleTaskStatus" type="checkbox"  
         onchange="toDo.toggleTaskStatus(${index})" value="" class="" 
         ${task.isComplete?'checked':''}></label>
        </div>
        <div class="col-md-10 col-xs-10 col-lg-10 col-sm-10 task-text ${task.isComplete?'complete':''}">
         ${task.task}
       </div>
       <div class="col-md-1 col-xs-1 col-lg-1 col-sm-1 delete-icon-area">
         <a class="" href="/" onClick="toDo.deleteTask(event, ${index})"><i 
         id="deleteTask" data-id="${index}" class="delete-icon glyphicon 
         glyphicon-trash"></i></a>
        </div>
       </div>
      </li>
    `;
    }

    loadCategories() {
        let categoriesHtml = categoriesValues.reduce((html, category, index) => html +=
            this.generateCategoriesHtml(category), '');

        $('#categoriesList').html(categoriesHtml);
    }

    generateCategoriesHtml(category) {
        return `<li><a class="" href="/" onClick="toDo.changeCatButText(event, '${category}')">${category}</a></li>`
    }

    changeCatButText(event, category) {
        event.preventDefault();
        $('#categoriesButton').text(category);
    }

    toggleTaskStatus(index) {
        this.tasks[index].isComplete = !this.tasks[index].isComplete;
        this.loadTasks();
    }

    deleteTask(event, taskId) {
        event.preventDefault();
        this.tasks.splice(taskId, 1);
        this.loadTasks();
    }

    addTask() {
        let addTaskPlaceholder = $('#addTask');
        let taskContent = addTaskPlaceholder.val();
        let parrentDiv = addTaskPlaceholder.parent();
        if (taskContent === '') {
            parrentDiv.addClass('has-error');
        }
        else {
            parrentDiv.removeClass('has-error');
            this.tasks.unshift({task: taskContent, isComplete:false});
        }
        this.loadTasks();
        addTaskPlaceholder.val('');
    }

    addEventListeners() {
        $('#addTask').on('keypress', event => {
            if(event.keyCode === 13) {
                this.addTask();
            }
        })
    }
}

let toDo;

window.addEventListener("load", () => {
    toDo = new ToDoClass();
});
