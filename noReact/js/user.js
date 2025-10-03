// get all users
const fetchUsers = async function () {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users`);
  const elements = await res.json();

  return elements;
};

// get all tasks
const fetchUserTasks = async function (userId) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`);
  const elements = await res.json();

  return elements;
};

// post new task
const postTask = async function (userId, taskTitle){
  const res = await fetch('https://jsonplaceholder.typicode.com/todos', {
  method: 'POST',
  body: JSON.stringify({
    title: taskTitle,
    userId: userId,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  const elements = await res.json();
  return elements;
}


const displayUserPage = async function() {
  try {
    // get user id from localStorage
    const selectedUserId = localStorage.getItem("selectedUserId");
    
    if (!selectedUserId) {
      console.error("No user ID found in localStorage");
      return;
    }

    // get all users and tasks of selected user
    const users = await fetchUsers();
    const userTasks = await fetchUserTasks(selectedUserId);
    
    // find user by id
    const selectedUser = users.find(user => user.id == selectedUserId);
    
    if (!selectedUser) {
      console.error("User not found with ID:", selectedUserId);
      return;
    }

    // update user info
    const userInfoSection = document.getElementById("user-info");
    if (userInfoSection) {
      userInfoSection.innerHTML = `
        <h3>${selectedUser.name}</h3>
        <p><span class="material-icons">email</span> ${selectedUser.email}</p>
        <p><span class="material-icons">domain</span> ${selectedUser.company?.name || 'No company'}</p>
        <p><span class="material-icons">location_on</span> ${selectedUser.address?.city || 'Unknown'}, ${selectedUser.address?.street || ''}</p>
        <p><span class="material-icons">phone</span> ${selectedUser.phone}</p>
        <p><span class="material-icons">language</span> ${selectedUser.website}</p>
      `;
    }

    // update tasks
    const tasksGrid = document.getElementById("grid");
    if (tasksGrid && userTasks.length > 0) {
      tasksGrid.innerHTML = "";
      
      userTasks.forEach(task => {

        let taskBox = `
            <div class="task-box">
                <input type="checkbox" id="task-${task.id}" name="task-${task.id}" ${task.completed ? 'checked' : ''}/>
                <label for="task-${task.id}"> ${task.title}</label><br>
            </div>
        `;
        
        tasksGrid.innerHTML += taskBox;
      });

      // check if a task is checked or unchecked
      const checkboxes = tasksGrid.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
          updateTaskCounter();
        });
      });
    }

    // update task count
    updateTaskCounter();
    
  } catch (error) {
    console.error("Error displaying user page:", error);
  }
};

// function to update the task counter
const updateTaskCounter = function() {
  const checkboxes = document.querySelectorAll('#grid input[type="checkbox"]');
  const totalTasks = checkboxes.length;
  const completedTasks = document.querySelectorAll('#grid input[type="checkbox"]:checked').length;
  
  const description = document.querySelector("#tasks #description h3");
  if (description) {
    description.textContent = `Tasks (${completedTasks}/${totalTasks} completed)`;
  }
};

// Call function when page loads
document.addEventListener("DOMContentLoaded", function() {
  displayUserPage();
  
  // check if button pressed
  const addTaskBtn = document.getElementById("add-task-btn");
  const newTaskInput = document.getElementById("new-task-input");
  
  if (addTaskBtn && newTaskInput) {
    addTaskBtn.addEventListener("click", addNewTask);
  }
});

// Function to add a new task
const addNewTask = async function() {
  const newTaskInput = document.getElementById("new-task-input");
  const taskText = newTaskInput.value.trim();
  const selectedUserId = localStorage.getItem("selectedUserId");
  
  if (taskText.length < 5) {
    alert("Task must have at least 5 characters");
    return;
  }
  
  try {
    // Post new task
    const newTask = await postTask(selectedUserId, taskText);
    
    // Add task to grid
    const tasksGrid = document.getElementById("grid");
    tasksGrid.innerHTML += `
      <div class="task-box">
        <input type="checkbox" id="task-${newTask.id}" name="task-${newTask.id}" />
        <label for="task-${newTask.id}"> ${newTask.title}</label><br>
      </div>
    `;
    
    // check if new task is checked or not
    const newCheckbox = document.querySelector(`#task-${newTask.id}`);
    newCheckbox.addEventListener('change', updateTaskCounter);
    
    // clear input and update counter
    newTaskInput.value = "";
    updateTaskCounter();
    newTaskInput.focus();
    
  } catch (error) {
    console.error("Error adding task:", error);
    alert("Failed to add task");
  }
};