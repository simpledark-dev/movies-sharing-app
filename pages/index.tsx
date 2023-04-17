import React, { useContext, useEffect, useState } from "react";
import { Inter } from "next/font/google";
import UserContext from "@/context/userContext";
import Navbar from "@/components/navbar";
import Home from "./home";

const inter = Inter({ subsets: ["latin"] });

const App = () => {
  return <Home />;
};

export default App;
