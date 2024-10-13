document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
  
    function addTask(taskText, save = true) {
      const li = document.createElement('li');
      li.textContent = taskText;
  
      const removeBtn = document.createElement('button');
      removeBtn.textContent = 'Remove';
      removeBtn.classList.add('remove-btn');
      removeBtn.addEventListener('click', function() {
        taskList.removeChild(li);
        removeTask(taskText);
      });
  
      li.appendChild(removeBtn);
      taskList.appendChild(li);
  
      taskInput.value = '';
  
      if (save) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
      }
    }
  
    function removeTask(taskText) {
      const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      const index = storedTasks.indexOf(taskText);
      if (index !== -1) {
        storedTasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
      }
    }
  
    function loadTasks() {
      const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      storedTasks.forEach(taskText => addTask(taskText, false));
    }
  
    loadTasks();
  
    addButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function(event) {
      if (event.key === 'Enter') {
        addTask();
      }
    });
  });