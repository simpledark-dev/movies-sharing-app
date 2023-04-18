import { BASE_API_URL } from "@/config/constants";
import UserContext from "@/context/userContext";
import { eraseCookie } from "@/utils/cookie";
import Link from "next/link";
import React, { useContext } from "react";
import LoginForm from "./Login";

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
