const fetchUsers = async function () {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users`);
  const elements = await res.json();

  return elements;
};

const displayAllUsers = async function () {
  try {
    let data = await fetchUsers();
    let grid = document.getElementById("grid");

    // Clear existing content
    grid.innerHTML = "";

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

    // Add event listeners to all user buttons
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

const displaySelectedUser = async function (selectedUser) {
  try {
    let data = await fetchUsers();
    let grid = document.getElementById("grid");

    // Clear existing content
    grid.innerHTML = "";

    // Filter users whose name matches the selectedUser (case-insensitive)
    const filteredUsers = data.filter((user) =>
      user.name.toLowerCase().includes(selectedUser.toLowerCase())
    );

    if (filteredUsers.length === 0) {
      grid.innerHTML = "<p>No users found matching your search.</p>";
      return;
    }

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

    // Add event listeners to all user buttons
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

const navigateToUser = function (userId) {
  console.log('Navigating to user page with ID:', userId); // Debug log
  // Store the user ID in localStorage so we can use it on the user page
  localStorage.setItem("selectedUserId", userId);
  // Navigate to the user page
  window.location.href = "./user.html";
};

document.addEventListener("DOMContentLoaded", function () {
  displayAllUsers();

  // Add event listener for search input
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
