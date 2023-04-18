import React, { useContext } from "react";
import Link from "next/link";

// Context
import UserContext from "@/context/userContext";

// Component/Layout
import Container from "@/layout/container";
import LoginForm from "./Login";

// Constants
import { BASE_API_URL } from "@/config/constants";

// Util
import { eraseCookie } from "@/utils/cookie";

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
        <Link className="text-3xl flex items-center gap-1" href="/">
          <svg
            className="h-10"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M20 20.0001C20 20.5524 19.5523 21.0001 19 21.0001H5C4.44772 21.0001 4 20.5524 4 20.0001V11.0001L1 11.0001L11.3273 1.61162C11.7087 1.26488 12.2913 1.26488 12.6727 1.61162L23 11.0001L20 11.0001V20.0001ZM11 13.0001V19.0001H13V13.0001H11Z"></path>
          </svg>
          Funny Movies
        </Link>
        {user ? (
          <div className="flex gap-4 items-center">
            <p>
              Welcome <span className="font-semibold">{user.email}</span>
            </p>
            <Link href="/share">
              <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-4 border border-gray-400 rounded shadow">
                Share a movie
              </button>
            </Link>
            <button
              className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-4 border border-gray-400 rounded shadow"
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
