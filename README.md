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





