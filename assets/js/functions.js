"use strict";

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
