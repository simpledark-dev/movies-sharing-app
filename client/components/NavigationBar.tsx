import { BASE_API_URL } from "@/config/constants";
import UserContext from "@/context/userContext";
import Container from "@/layout/container";
import { eraseCookie } from "@/utils/cookie";
import Link from "next/link";
import React, { useContext } from "react";
import LoginForm from "./Login";

const NavigationBar = () => {
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
    <Container>
      <nav className="flex justify-between px-2 py-4 items-center">
        <Link href="/">Funny Movies</Link>
        {user ? (
          <div className="flex gap-4 items-center">
            <p>Welcome {user.email}!</p>
            <Link href="/share">
              <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                Share a movie
              </button>
            </Link>
            <button
              className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <LoginForm />
        )}
      </nav>
      <hr />
    </Container>
  );
};

export default NavigationBar;
