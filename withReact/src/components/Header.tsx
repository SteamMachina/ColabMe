import "../style/header.scss";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  return (
    <div className="HeaderFooter">
      <header>
        <nav role="navigation" aria-label="Main navigation">
          <a onClick={() => navigate("/")}>Home</a>
          <a onClick={() => navigate("/aboutus")}>About Us</a>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Header;
