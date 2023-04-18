import { BASE_API_URL } from "@/config/constants";
import UserContext from "@/context/userContext";
import { eraseCookie } from "@/utils/cookie";
import Link from "next/link";
import React, { useContext, useState } from "react";

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
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button type="submit">Login/Register</button>
    </form>
  );
};

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);

  const handleLogout = () => {
    // Send logout request to server
    fetch(`${BASE_API_URL}/auth/logout`, { method: "POST" })
      .then(() => {
        setUser(null);
        eraseCookie("jwtToken");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Link href="/">Funny Movies</Link>
      {user ? (
        <div>
          <p>Welcome {user.email}!</p>
          <Link href="/share">
            <button>Share a movie</button>
          </Link>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <LoginForm />
        </div>
      )}
    </div>
  );
};

export default Navbar;
