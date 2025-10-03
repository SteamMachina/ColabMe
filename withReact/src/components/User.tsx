import "../style/user.scss";

function User() {
  return (
    <div className="User">
      <main role="main">
      {/* user info */}
      <section id="user-info">
        <h3>Name</h3>
        <p><span className="material-icons" aria-hidden="true">email</span> Email</p>
        <p><span className="material-icons" aria-hidden="true">domain</span> Company</p>
        <p><span className="material-icons" aria-hidden="true">location_on</span> Adress</p>
      </section>

      {/* all tasks */}
      <section id="tasks">
        <div id="description">
          <h3>Tasks</h3>
          <div id="add-task-form">
            <input type="text" id="new-task-input" placeholder="Enter new task..." aria-label="New task description" />
            <button id="add-task-btn">+ Add task</button>
          </div>
        </div>

        <div id="grid" role="region" aria-label="Task list">
        </div>
      </section>
    </main>
    </div>
  );
}

export default User;
