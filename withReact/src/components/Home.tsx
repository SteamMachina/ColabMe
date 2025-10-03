import "../style/home.scss";

function Home() {
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
        <input id="search-input" type="search" placeholder="Search a collaborator" aria-label="Search collaborators" />
      </section>

      {/* grid displaying users */}
      <section id="grid" role="region" aria-label="User cards">
      </section>
    </main>
    </div>
  );
}

export default Home;
