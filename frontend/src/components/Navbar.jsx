import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import "../scss/components/_navbar.scss";

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.clear();
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <h1>Task Planner</h1>
      </Link>
      <ul>
        {isLoggedIn && (
          <li>
            <NavLink to="/" className="nav-link">
              Dashboard
            </NavLink>
          </li>
        )}
        {!isLoggedIn && (
          <li>
            <NavLink to="/login" className="nav-link">
              Login
            </NavLink>
          </li>
        )}
        {!isLoggedIn && (
          <li>
            <NavLink to="/signup" className="nav-link">
              Signup
            </NavLink>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <Link onClick={handleLogout} className="nav-link logout">
              Logout
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
