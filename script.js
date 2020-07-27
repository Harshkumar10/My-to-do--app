var addButton=document.getElementById("add-button");
addButton.addEventListener("click",addToDoItem);

var clearButton=document.getElementById("clear-completed-button");
clearButton.addEventListener("click",clearCompletedToDoItems);

var emptyButton=document.getElementById("empty-button");
emptyButton.addEventListener("click",emptyList);


var saveButton = document.getElementById("save-button");
saveButton.addEventListener("click",saveList);


var toDoEntryBox = document.getElementById("todo-entry-box");
var toDoList = document.getElementById("todo-list");

function newToDoItem(itemText,completed){
	var toDoItem = document.createElement("li");
	var toDoText = document.createTextNode(itemText);
	//create a text node

	toDoItem.appendChild(toDoText);
	
	if(completed){
		toDoItem.classList.add("completed");
	}
	
	toDoList.appendChild(toDoItem);
	toDoItem.addEventListener("dblclick",toggleToDoItemState);
}

function addToDoItem(){
	//alert("add button clicked");
	var itemText=toDoEntryBox.value;
	newToDoItem(itemText,false);
}

function toggleToDoItemState(){
	if(this.classList.contains("completed")){
		this.classList.remove("completed");
	}else{
		this.classList.add("completed");
	}
}

function clearCompletedToDoItems(){
	alert("clear completed clicked");
	var completedItems = toDoList.getElementsByClassName("completed");
	
	while(completedItems.length>0)
	{
		completedItems.item(0).remove();
	}
}

function emptyList(){
	alert("empty list clicked");
	var toDoItems = toDoList.children;
	while(toDoItems.length>0)
	{
		toDoItems.item(0).remove();
	}
}

function saveList(){
	//alert("save list clicked");
	var toDos = [];
	
	for(var i=0;i<toDoList.children.length;i++){
		var toDo = toDoList.children.item(i);
		
		var toDoInfo ={
			"task": toDo.innerText,
			"completed":toDo.classList.contains("completed")
		};
		toDos.push(toDoInfo);
	}
	
	//Add key and value to localStorage
	localStorage.setItem("toDos",JSON.stringify(toDos));
	
}


function loadList(){
	if(localStorage.getItem("toDos")!=null){
		var toDos = JSON.parse(localStorage.getItem("toDos"));
		
		for(var i=0;i<toDos.length;i++){
			var toDo =  toDos[i];
			newToDoItem(toDo.task,toDo.completed);
		}
	}
}
loadList();
