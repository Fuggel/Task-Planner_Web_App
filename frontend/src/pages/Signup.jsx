import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import axios from "axios";
import { API_URL } from "../helper/constants";
import "../scss/pages/_auth.scss";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emptyInput, setEmptyInput] = useState(false);
  const [invalidInput, setInvalidInput] = useState(false);
  const { setIsLoggedIn, setUserId, setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setInvalidInput(false);
      setEmptyInput(true);
      return;
    }

    axios
      .post(`${API_URL}users`, {
        name,
        email,
        password,
      })
      .then((res) => {
        setName("");
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
      <h2>Signup</h2>
      <div className="input-container">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        {invalidInput && <p className="error-msg">Email already exists.</p>}
        <input type="submit" value="Signup" />
        <p className="switch-status">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </form>
  );
};

export default Signup;
