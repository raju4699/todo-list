let todosContainer = document.getElementById('todosContainer');
let userInput = document.getElementById('userInput');
let addBtn = document.getElementById('addBtn');
let saveBtn = document.getElementById('saveBtn');

function getTodo(){
    let todoListTemp = localStorage.getItem("todoList");
    let todoObject = JSON.parse(todoListTemp);
    if (todoObject === null){
        return [];
    }else{
        return todoObject;
    }
}

let todoList = getTodo();

let todoCount = todoList.length;

saveBtn.onclick = function(){
    let todoListStringified = JSON.stringify(todoList);
    localStorage.setItem("todoList",todoListStringified);
}

function checkCompletedStatus(labelId, todoElementId){
    let labelEle = document.getElementById(labelId);
    labelEle.classList.toggle('completed');

    let index = todoList.findIndex(function(eachTodo){
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        
        if(eachTodoId === todoElementId){
            return true;
        }else{
            return false;
        }
    });

    let isCheckedValue = todoList[index].isChecked;

    if (isCheckedValue === true){
        todoList[index].isChecked = false;
    }
    else{
        todoList[index].isChecked = true;
    }
}


addBtn.onclick = function(){
    let userInputValue = userInput.value;
    
    if (userInputValue === ""){
        alert("Enter Valid Text!");
        return;
    }
    todoCount = todoCount + 1;
    let newTodo = {
        name : userInputValue,
        uniqueNo : todoCount,
        isChecked : false
    };

    todoList.push(newTodo);
        
    createAndAppend(newTodo);

    userInput.value = "";
}

function deleteTodo(todoElementId){
    let todoEle = document.getElementById(todoElementId);
    todosContainer.removeChild(todoEle);

    let index = todoList.findIndex(function(eachItem){
        let eachItemId = "todo" + eachItem.uniqueNo;

        if (eachItemId === todoElementId){
            return true;
        }
        else{
            return false;
        }
    });

    todoList.splice(index,1);
}

function createAndAppend(todo){
    let todoElement = document.createElement('li');
    let todoElementId = "todo" + todo.uniqueNo;
    todoElement.id = todoElementId;
    todoElement.classList.add('d-flex', 'flex-row', 'todoElement');

    let checkboxElement = document.createElement('input');
    let checkboxId = "checkbox" + todo.uniqueNo;
    checkboxElement.type = 'checkbox';
    checkboxElement.id = checkboxId;
    checkboxElement.checked = todo.isChecked;
    checkboxElement.classList.add('checkboxElement');

    checkboxElement.onclick  = function(){
        checkCompletedStatus(labelId, todoElementId);
    }
    
    todoElement.appendChild(checkboxElement);

    let labelContainer = document.createElement('div');
    labelContainer.classList.add('labelContainer', 'd-flex', 'flex-row', 'justify-content-between');
    todoElement.appendChild(labelContainer);

    let labelElement = document.createElement('label');
    let labelId = "label" + todo.uniqueNo;
    labelElement.id = labelId;
    labelElement.setAttribute('for',checkboxId);
    labelElement.textContent = todo.name;
    if (todo.isChecked === true){
        labelElement.classList.add('completed');
    }
    labelContainer.appendChild(labelElement);


    labelContainer.onclick = labelElement.onclick = function(){
        let checkboxStatus = checkboxElement.checked;
        if(checkboxStatus === true){
            checkboxElement.checked = false;
        }else{
            checkboxElement.checked = true;
        }
        checkCompletedStatus(labelId, todoElementId);
    }


    let icon = document.createElement('i');
    icon.classList.add('fa-solid', 'fa-trash', 'delete-icon');
    labelContainer.appendChild(icon);

    icon.onclick = function(){
        deleteTodo(todoElementId);
    }


    todosContainer.appendChild(todoElement);
}

for(let todo of todoList){
    createAndAppend(todo);
}