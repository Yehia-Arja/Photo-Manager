import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../Icons/Logo";
import "./style.css";

const Nav = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="navBar-container">
      <nav className="navBar">
        {/* Left side: Logo, Home, Chats */}
        <div className="navBar-left">
          <div className="navBar-logo"><Logo /></div>
          <Link className="navBar-link" to="/">Home</Link>
          <Link className="navBar-link" to="/chats">Chats</Link>
        </div>

        {/* Right side: Burger menu with its container */}
        <div className="navBar-right">
          <div className="burger-container" onClick={toggleMenu}>
            <div className="burger-menu">☰</div>
            {menuOpen && (
              <div className="dropdown-menu">
                <Link className="dropdown-item" to="/deleted">
                  Recently Deleted
                </Link>
                <Link className="dropdown-item" to="/logout">
                  Logout
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
      {children}
    </div>
  );
};

export default Nav;
