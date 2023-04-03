"use strict";

const formInputOnAddingNewItem = document.getElementById('newItem'); 
const addBtn = document.getElementById('addButton'); 

let toDoList = [];    
try { 
  var jsonString = localStorage.getItem('webItemList');  
  if (jsonString != null) { 
  toDoList  = JSON.parse(jsonString);   
  } else {  
    localStorage.setItem('webItemList', JSON.stringify(toDoList)); 
  }
  renderList() 
} finally {   
  // pass  
} 



// Render The Array with HTML elements
function renderList() {   
    cleanItemsList() 
    for (let i = 0; i < toDoList.length; i++) { 
        renderOneListItem(toDoList[i].text,i, toDoList[i].doneCheck)
    }  
  // save to local storage
  var jsonString = JSON.stringify(toDoList);
  localStorage.setItem('webItemList', jsonString); 
} 

// Removes Items Elements
function cleanItemsList() { 
    const itemsToRemove = document.getElementsByClassName('item');
    const itemsFromDOM = Array.from(itemsToRemove);
    itemsFromDOM.forEach(function(element) {
      element.remove();
    });
} 

// Render An Element Given the text 
function renderOneListItem(newItemText,i, doneBool) {  
var itemComponent = document.createElement("div");   
itemComponent.className = "item"; 

var par = document.createElement("p");
var text = document.createTextNode(newItemText);
par.appendChild(text);    

var checkBox = document.createElement("input") 
checkBox.type = "checkbox";  
// saving the state  
checkBox.addEventListener('change', function() {
    toDoList[i].doneCheck = !toDoList[i].doneCheck; 
    renderList();
  });  

checkBox.checked = doneBool; 
itemComponent.appendChild(checkBox);
itemComponent.appendChild(par);  

var rmvButton = document.createElement("button") 
rmvButton.textContent = "X"; 
rmvButton.className = "remove-button";  
// Event listener on remove button 
rmvButton.addEventListener('click', function() {
    toDoList.splice(i, 1);
    renderList();
  }); 


itemComponent.appendChild(rmvButton);

var element = document.getElementById("listKek");
element.appendChild(itemComponent); 
}  



// Event Listened on Add Items Circle BUtton
addBtn.addEventListener('click', function(event) {
    event.preventDefault();
    const textVal = formInputOnAddingNewItem.value;
    toDoList.push({ text :textVal, doneCheck: false } );
    formInputOnAddingNewItem.value = '';
      renderList();
  }); 

  
  
  
  
  
