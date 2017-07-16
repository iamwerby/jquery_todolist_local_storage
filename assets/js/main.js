"use strict";

$('#errAlert').hide();

$("#addTask").on('click', function () { //обрабатываем кнопку добавления таска
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

$(document).on('click',".close",function() { //обрабатываем кнупку удаления таска
        var index = $(this).data('index');
        tasks.splice(index,1);
        toLocalStorage(tasks);
        $(this).closest('.list-group-item').fadeOut('slow',function () {
            $(this).remove();
        })
});

$(document).on('change',":checkbox",function() { //обрабатываем отметку чекбокса (выполнение таска)
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

fromLocalStorage(tasks); //достаем данные из local storage


