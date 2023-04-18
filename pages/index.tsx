import React, { useContext, useEffect, useState } from "react";
import { Inter } from "next/font/google";
import UserContext from "@/context/userContext";
import Navbar from "@/components/navbar";
import Home from "./home";
import { getCookieValue } from "@/utils/cookie";

const inter = Inter({ subsets: ["latin"] });

const App = () => {
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    const verfyToken = async (token: string) => {
      try {
        const response = await fetch(
          "http://localhost:5000/auth/verify-token",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        console.log(data);
        setUser(data.user);
      } catch (err) {
        console.log(err);
      }
    };
    const token = getCookieValue("jwtToken");
    if (token) verfyToken(token);
  }, []);

  return <Home />;
};

export default App;
