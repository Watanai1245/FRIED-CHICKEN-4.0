import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styles from "../../styles/Login.module.scss";

const Login = () => {
  const [username, setUsername] = useState<string | null>();
  const [password, setPassword] = useState<string | null>();
  const [error, setError] = useState<boolean>(false);
  const router = useRouter();

  const handleClick = async () => {
    try {
      await axios.post("https://sdp-project.vercel.app/api/login", {
        username,
        password,
      });
      router.push("https://sdp-project.vercel.app/admin");
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1>Admin Dashboard</h1>
        <input
          type="text"
          placeholder="username"
          className={styles.input}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          className={styles.input}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className={styles.button} onClick={handleClick}>
          Log in
        </button>
        {error && <span className={styles.error}>wrong credential!</span>}
      </div>
    </div>
  );
};

export default Login;
