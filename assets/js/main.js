"use strict";

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


