import { useEffect, useState } from "react";
import { AuthContext } from "./context/auth-context";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") ?? null);

  const autoLogout = () => {
    setIsLoggedIn(false);
    localStorage.clear();
  };

  useEffect(() => {
    if (token) setIsLoggedIn(true);
  }, [token]);

  if (isLoggedIn) setTimeout(() => autoLogout(), 1000 * 60 * 120);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        userId,
        setUserId,
        token,
        setToken,
      }}
    >
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Dashboard />} />
      </Routes>
    </AuthContext.Provider>
  );
};

export default App;
