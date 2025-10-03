import "../style/user.scss";
import { useState, useEffect } from "react";

// new type creation
interface User {
  id: number;
  name: string;
  email: string;
  company?: { name: string };
  address?: { city: string; street: string };
  phone: string;
  website: string;
}

interface Task {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

function User() {

  // defining useStates
  const [user, setUser] = useState<User | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskInput, setNewTaskInput] = useState("");

  // get all users
  const fetchUsers = async (): Promise<User[]> => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users`);
    const elements = await res.json();
    return elements;
  };

  // get all tasks
  const fetchUserTasks = async (userId: string): Promise<Task[]> => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`);
    const elements = await res.json();
    return elements;
  };

  // post new task
  const postTask = async (userId: string, taskTitle: string): Promise<Task> => {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      body: JSON.stringify({
        title: taskTitle,
        userId: userId,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const elements = await res.json();
    return elements;
  };

  // check if task checked or unchecked
  const toggleTask = (taskId: number) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,                    // Keep all existing properties
          completed: !task.completed  // Flip the completed status
        };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  // add new task to html
  const addNewTask = async () => {
    const taskText = newTaskInput.trim();
    const selectedUserId = localStorage.getItem("selectedUserId");
    
    if (taskText.length < 5) {
      alert("Task must have at least 5 characters");
      return;
    }
    
    if (!selectedUserId) return;
    
    try {
      const newTask = await postTask(selectedUserId, taskText);
      setTasks([...tasks, { ...newTask, completed: false }]);
      setNewTaskInput("");
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Failed to add task");
    }
  };

  // load user data on load
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const selectedUserId = localStorage.getItem("selectedUserId");
        
        if (!selectedUserId) {
          console.error("No user ID found in localStorage");
          return;
        }

        const users = await fetchUsers();
        const userTasks = await fetchUserTasks(selectedUserId);
        
        const selectedUser = users.find((user: User) => user.id == parseInt(selectedUserId));
        
        if (!selectedUser) {
          console.error("User not found with ID:", selectedUserId);
          return;
        }

        setUser(selectedUser);
        setTasks(userTasks);
        
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    };

    loadUserData();
  }, []);

  const completedTasks = tasks.filter(task => task.completed).length;

  return (
    // html
    <div className="User">
      <main role="main">
        {/* user info */}
        <section id="user-info">
          {user ? (
            <>
              <h3>{user.name}</h3>
              <p><span className="material-icons" aria-hidden="true">email</span> {user.email}</p>
              <p><span className="material-icons" aria-hidden="true">domain</span> {user.company?.name || 'No company'}</p>
              <p><span className="material-icons" aria-hidden="true">location_on</span> {user.address?.city || 'Unknown'}, {user.address?.street || ''}</p>
              <p><span className="material-icons" aria-hidden="true">phone</span> {user.phone}</p>
              <p><span className="material-icons" aria-hidden="true">language</span> {user.website}</p>
            </>
          ) : (
            <>
              <h3>Name</h3>
              <p><span className="material-icons" aria-hidden="true">email</span> Email</p>
              <p><span className="material-icons" aria-hidden="true">domain</span> Company</p>
              <p><span className="material-icons" aria-hidden="true">location_on</span> Address</p>
            </>
          )}
        </section>

        {/* all tasks */}
        <section id="tasks">
          <div id="description">
            <h3>Tasks ({completedTasks}/{tasks.length} completed)</h3>
            <div id="add-task-form">
              <input 
                type="text" 
                id="new-task-input" 
                placeholder="Enter new task..." 
                aria-label="New task description"
                value={newTaskInput}
                onChange={(e) => setNewTaskInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addNewTask()}
              />
              <button id="add-task-btn" onClick={addNewTask}>+ Add task</button>
            </div>
          </div>

          <div id="grid" role="region" aria-label="Task list">
            {tasks.map((task) => (
              <div key={task.id} className="task-box">
                <input 
                  type="checkbox" 
                  id={`task-${task.id}`} 
                  name={`task-${task.id}`} 
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                />
                <label htmlFor={`task-${task.id}`}> {task.title}</label>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default User;
