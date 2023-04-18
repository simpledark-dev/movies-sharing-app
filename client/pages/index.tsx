import React from "react";
import { Inter } from "next/font/google";
import useVerifyToken from "@/hooks/useVerifyToken";
import Home from "./home";

const inter = Inter({ subsets: ["latin"] });

const App = () => {
  useVerifyToken();

  return <Home />;
};

export default App;
