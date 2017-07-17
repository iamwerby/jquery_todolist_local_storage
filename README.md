# jQuery_todolist_local_storage
> A simple todo list on Bootstrap and jQuery using Local Storage

## About
Basically, a plain simple todo list app, that uses twitter Bootstrap to look good, jQuery to save the code space
and browser local storage to store the todo's and keep them available after refresh. To mark the task completed,
click the checkbox. To delete the task, hit the X mark next to it - it will be removed from Local storage.

## Installation
* Clone or fork this repository
* Install [npm manager](https://docs.npmjs.com/getting-started/what-is-npm) (if you don't have one)
* Run an **npm init** command in the project folder

## Base HTML markup

```html
<body>
<div class="container">
    <div class="row">
        <div class="col-md-4" id="todowrap">
            <h1>Your Perfect ToDo</h1>
            <div class="input-group">
                        <span class="input-group-btn">
                        <button class="btn btn-info" type="button" id="addTask">Add</button>
                        </span>
                <input type="text" class="form-control" id="addToDo" placeholder="What are we doing?">
            </div>
            <div id="errAlert" class="alert alert-danger" role="alert"><strong>Oops!</strong> Please enter a valid task</div>
            <br>
            <ul id="taskUl" class="list-group">

            </ul>
        </div>
    </div>
</div>
```

## Array of objects for tasks storage

```js
var tasks = [];

var defaultTask = {
    content: 'No_content',
    isDone: false
};
```

## Functions

```js
function createTask(taskText,index,isDone) { //creating a task with proper markup
    var taskLi = $('<li>',{ 'class': 'list-group-item'}),
        taskDiv = $('<div>',{ 'class': 'checkbox' }).appendTo(taskLi),
        taskLabel = $('<label>').appendTo(taskDiv),
        taskInput = $('<input>',{
            'type': 'checkbox',
            'data-index': index
        }).appendTo(taskLabel);
    $('<p>',{ text: taskText }).appendTo(taskLabel);
    var closeBtn = $('<button>',{
        'class': 'close',
        'aria-label': 'close',
        'type': 'button',
        'data-index': index
    }).appendTo(taskDiv);
    $('<span>',{
        'aria-hidden': 'true',
        html: '&times;'
    }).appendTo(closeBtn);

    if (isDone){
        $(taskLi).addClass('done');
        $(taskInput).prop('checked', true);
    }
    $("#taskUl").append(taskLi);
}

function checkInput(input) { //validate the entered text (length and allowed symbols)
    var regex = /^[a-zA-Z0-9 ._-]{1,100}$/;
    if (regex.test(input)) {
        $('#errAlert').hide('slow');
        return true
    } else {
        $('#errAlert').show('slow');
        return false;
    }
}

function toLocalStorage(tasks) { //pushing changes to local Storage
    var tasksInJSON = JSON.stringify(tasks);
    localStorage.setItem('currentTasks',tasksInJSON);
}

function fromLocalStorage(tasks) { //getting latest data from local storage
    var temp = JSON.parse(localStorage.getItem('currentTasks'));
    for (var i=0; i<temp.length; i++){
        var newTask = Object.create(defaultTask);
        newTask.content = temp[i]['content'];
        newTask.isDone = temp[i]['isDone'];
        tasks.push(newTask);
        createTask(temp[i]['content'],tasks.length - 1,temp[i]['isDone']);
    }
}
```

## Handlers

```js
$('#errAlert').hide();

$("#addTask").on('click', function () { //add task button handler
    var taskText = $("#addToDo").val();
    if (checkInput(taskText)){
        var newTask = Object.create(defaultTask);
        newTask.content = taskText;
        tasks.push(newTask);
        createTask(taskText,tasks.length - 1,newTask.isDone);
        $("#addToDo").val('');
        toLocalStorage(tasks);
    } else return false
});

$(document).on('click',".close",function() { //delete task button handler
        var index = $(this).data('index');
        tasks.splice(index,1);
        toLocalStorage(tasks);
        $(this).closest('.list-group-item').fadeOut('slow',function () {
            $(this).remove();
        })
});

$(document).on('change',":checkbox",function() { //checkbox selection handler
    var index = $(this).data('index');
    if(this.checked) {
        tasks[index].isDone = true;
        toLocalStorage(tasks);
        $(this).closest('.list-group-item').addClass('done');
    } else {
        tasks[index].isDone = false;
        toLocalStorage(tasks);
        $(this).closest('.list-group-item').removeClass('done');
    }
});

fromLocalStorage(tasks); //fetching data from local storage
```




