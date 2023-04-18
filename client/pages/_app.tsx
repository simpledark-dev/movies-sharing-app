import { useState } from "react";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import UserContext from "@/context/userContext";

export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}