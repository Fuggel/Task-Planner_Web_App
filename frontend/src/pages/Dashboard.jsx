import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../helper/constants";
import { AuthContext } from "../context/auth-context";
import Todos from "../components/Todos";
import "../scss/pages/_dashboard.scss";

const Dashboard = () => {
  const [name, setName] = useState("");
  const { isLoggedIn, token } = useContext(AuthContext);

  useEffect(() => {
    if (isLoggedIn) {
      axios
        .get(`${API_URL}users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setName(res.data.name))
        .catch((err) => console.log(err));
    }
  }, [isLoggedIn, token]);

  return (
    <>
      {isLoggedIn ? (
        <div className="dashboard-container">
          <h2>Welcome, {name}!</h2>
          <Todos />
        </div>
      ) : (
        <div className="no-auth-container">
          <h2>Welcome!</h2>
          <p className="no-todos">Please authenticate to add ToDo's</p>
          <div className="btn-container">
            <Link to="/signup" className="nav-link">
              <button>Signup</button>
            </Link>
            <Link to="/login" className="nav-link">
              <button>Login</button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
