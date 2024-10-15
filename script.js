document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');


    // Load tasks from local storage
    function loadTasks(){
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText,false));
    }

    /**
     * Adds a new task to the task list
     */
    function addTask(taskText , save = true) {
        taskText = taskText || taskInput.value.trim();
        if (taskText === "" && save) {
            alert("Please enter a task:");
            return;
        }
        // Create a new list item
        const li = document.createElement('li');
        li.textContent = taskText; 

        // Create a remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.classList.add('remove-btn'); 
        
        // Add an event listener to the remove button
        removeBtn.addEventListener('click', () => {
            // Remove the list item when the button is clicked
            taskList.removeChild(li);  
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            const taskIndex = storedTasks.indexOf(taskText);
            if (taskIndex !== -1){
                storedTasks.splice(taskIndex, 1);
                localStorage.setItem('tasks',JSON.stringify(storedTasks));
            }
            
        });
        // Add the remove button to the list item
        li.appendChild(removeBtn); 
        // Add the list item to the task list
        taskList.appendChild(li);  
        if(save){
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }  
        // Clear the task input field
        taskInput.value = "";
    }
    


    addButton.addEventListener('click', () => {
        addTask();
    });
    taskInput.addEventListener('keypress',(event) =>{
        if(event.key === 'Enter'){
            addTask();
        }
    });

    loadTasks();

});
