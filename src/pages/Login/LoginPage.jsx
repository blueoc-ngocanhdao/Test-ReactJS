import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import axiosClient from "../../api/axiosClient";
import styles from "./Login.module.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) return setError("Password min 6 characters");

    try {
      const { data } = await axiosClient.get(
        `/users?email=${email}&password=${password}`,
      );
      if (data.length > 0) {
        login(data[0]);
        navigate("/");
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError("Connection error");
    }
  };

  return (
    <div className={styles.loginWrapper}>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <h2>Login</h2>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.inputGroup}>
          <input
            type="email"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default LoginPage;
