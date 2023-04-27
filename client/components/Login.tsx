import React, { useContext, useState } from "react";
import UserContext from "@/context/userContext";
import { BASE_API_URL } from "@/config/constants";

const LoginForm = () => {
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [actionType, setActionType] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLoginRegister = async (e: any) => {
    e.preventDefault();

    if (actionType === "login") {
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
        setErrorMessage("Login Error!");
        console.error(error);
      }
    } else if (actionType === "register") {
      try {
        const response = await fetch(`${BASE_API_URL}/auth/register`, {
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
        setErrorMessage("Register Error!");
        console.error(error);
      }
    }
  };

  return (
    <>
      <form onSubmit={handleLoginRegister} className="flex gap-2 items-center">
        <label className=" space-x-2">
          <span>Email:</span>
          <input
            className="shadow border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className=" space-x-2">
          <span>Password:</span>
          <input
            className="shadow border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-4 border border-gray-400 rounded shadow"
          type="submit"
          onClick={() => setActionType("login")}
        >
          Login
        </button>
        <button
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-4 border border-gray-400 rounded shadow"
          type="submit"
          onClick={() => setActionType("register")}
        >
          Register
        </button>
      </form>
      <p className="text-red-400 text-sm">{errorMessage}</p>
    </>
  );
};

export default LoginForm;
