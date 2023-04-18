import React, { useContext, useState } from "react";
import UserContext from "@/context/userContext";
import { BASE_API_URL } from "@/config/constants";

const LoginForm = () => {
  const { user, setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_API_URL}/auth/login`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      setUser(data.user);
      document.cookie = `jwtToken=${data.token}`;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <label>
        Email:
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          required
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button type="submit">Login/Register</button>
    </form>
  );
};

export default LoginForm;
