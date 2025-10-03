import "../style/home.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// type user
interface User {
  id: number;
  name: string;
  email: string;
  company?: { name: string };
  address?: { city: string };
}

// useState definitions
function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  // get all users
  const fetchUsers = async (): Promise<User[]> => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users`);
    const elements = await res.json();
    return elements;
  };

  // function to navigate to user page
  const navigateToUser = (userId: number) => {
    localStorage.setItem("selectedUserId", userId.toString());
    navigate("/user");
  };

  // load users on load
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    loadUsers();
  }, []);

  // check if input in searchbar
  useEffect(() => {
    if (searchInput.trim()) {
      const filtered = users.filter((user) =>
        user.name.toLowerCase().includes(searchInput.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  }, [searchInput, users]);

  // html  
  return (
    <div className="Home">
      <main role="main">
        <section id="description">
          <h1>Collaborative Management</h1>
          <p>View and manage your team members' projects</p>
        </section>

        <section id="search">
          {/* icon */}
          <span className="material-icons" aria-hidden="true">search</span>
          {/* search bar */}
          <input 
            id="search-input" 
            type="search" 
            placeholder="Search a collaborator" 
            aria-label="Search collaborators"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </section>

        {/* grid displaying users */}
        <section id="grid" role="region" aria-label="User cards">
          {filteredUsers.map((user) => (
            <div key={user.id} className="card">
              <div className="user-info">
                <h3>{user.name}</h3>
                <p><span className="material-icons">email</span> {user.email}</p>
                <p><span className="material-icons">domain</span> {user.company?.name || "No company"}</p>
                <p><span className="material-icons">location_on</span> {user.address?.city || "Unknown"}</p>
              </div>
              <div className="user-tasks">
                <button className="user-btn" onClick={() => navigateToUser(user.id)}>Check &gt;</button>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

export default Home;
