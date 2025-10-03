// get all users
const fetchUsers = async function () {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users`);
  const elements = await res.json();

  return elements;
};

// display all users
const displayAllUsers = async function () {
  try {
    let data = await fetchUsers();
    let grid = document.getElementById("grid");

    grid.innerHTML = ""; // clear existing content

    // add card to html
    data.forEach((user) => {
      let card = `
        <div class="card">
            <div class="user-info">
                <h3>${user.name}</h3>
                <p><span class="material-icons">email</span> ${user.email}</p>
                <p><span class="material-icons">domain</span> ${user.company?.name || "No company"}</p>
                <p><span class="material-icons">location_on</span> ${user.address?.city || "Unknown"}</p>
            </div>
            <div class="user-tasks">
                <button class="user-btn" data-user-id="${user.id}">Check -></button>
            </div>
        </div>
      `;
      grid.innerHTML += card;
    });

    // if user button pressed => navigate to user page
    const userButtons = document.querySelectorAll('.user-btn');
    userButtons.forEach(button => {
      button.addEventListener('click', function() {
        const userId = this.getAttribute('data-user-id');
        navigateToUser(userId);
      });
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

// display users with names matching input
const displaySelectedUser = async function (selectedUser) {
  try {
    let data = await fetchUsers();
    let grid = document.getElementById("grid");

    // clear existing content
    grid.innerHTML = "";

    // Filtering users depending on names
    const filteredUsers = data.filter((user) =>
      user.name.toLowerCase().includes(selectedUser.toLowerCase())
    );

    // add cards to html
    filteredUsers.forEach((user) => {
      let card = `
        <div class="card">
            <div class="user-info">
                <h3>${user.name}</h3>
                <p><span class="material-icons">email</span> ${user.email}</p>
                <p><span class="material-icons">domain</span> ${user.company?.name || "No company"}</p>
                <p><span class="material-icons">location_on</span> ${user.address?.city || "Unknown"}</p>
            </div>
            <div class="user-tasks">
                <p><strong>tasks :</strong> 20</p>
                <button class="user-btn" data-user-id="${user.id}">Check -></button>
            </div>
        </div>
      `;
      grid.innerHTML += card;
    });

    // if user button pressed => navigate to user page 
    const userButtons = document.querySelectorAll('.user-btn');
    userButtons.forEach(button => {
      button.addEventListener('click', function() {
        const userId = this.getAttribute('data-user-id');
        navigateToUser(userId);
      });
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

// function to navigate to user.html
const navigateToUser = function (userId) {
  // store user id in localStorage
  localStorage.setItem("selectedUserId", userId);
  // navigate to user.html
  window.location.href = "./user.html";
};

// run at loading
document.addEventListener("DOMContentLoaded", function () {
  displayAllUsers();

  // check for inputs in search bar
  let search_input = document.getElementById("search-input");
  search_input.addEventListener("input", function () {
    const selectedUser = this.value.trim();
    if (selectedUser) {
      displaySelectedUser(selectedUser);
    } else {
      // Show all users when search is empty
      displayAllUsers();
    }
  });
});
