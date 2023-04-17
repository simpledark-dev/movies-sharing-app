import UserContext from "@/context/userContext";
import Link from "next/link";
import React, { useContext, useState } from "react";

const LoginForm = () => {
  const { user, setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      setUser(data.user);
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
    fetch("http://localhost:5000/auth/logout", { method: "POST" })
      .then(() => {
        setUser(null);
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
