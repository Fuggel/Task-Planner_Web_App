import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import axios from "axios";
import { API_URL } from "../helper/constants";
import "../scss/pages/_auth.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emptyInput, setEmptyInput] = useState(false);
  const [invalidInput, setInvalidInput] = useState(false);
  const { setIsLoggedIn, setUserId, setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setInvalidInput(false);
      setEmptyInput(true);
      return;
    }

    axios
      .post(`${API_URL}users/login`, {
        email,
        password,
      })
      .then((res) => {
        setEmail("");
        setPassword("");

        localStorage.setItem("token", res.data.token);
        setIsLoggedIn(true);
        setUserId(res.data.id);
        setToken(res.data.token);
        navigate("/");
      })
      .catch((err) => {
        if (err.response.status === 400) {
          setEmptyInput(false);
          setInvalidInput(true);
        }
      });
  };

  return (
    <form onSubmit={submitHandler} className="auth-container">
      <h2>Login</h2>
      <div className="input-container">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {emptyInput && <p className="error-msg">Please add all fields.</p>}
        {invalidInput && <p className="error-msg">Invalid credentials.</p>}
        <input type="submit" value="Login" />
        <p className="switch-status">
          Don't have an account? <Link to="/signup">Signup</Link>
        </p>
      </div>
    </form>
  );
};

export default Login;
