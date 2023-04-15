import { useEffect } from "react";
import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

import awsExports from "../aws-exports";
import { Amplify, Auth } from "aws-amplify";

Amplify.configure(awsExports);

const API_ENDPOINT =
  "https://m0rz74a4y4.execute-api.ap-southeast-1.amazonaws.com/dev/movies";

async function signUp() {
  try {
    const { user } = await Auth.signUp({
      username: "user1@gmail.com",
      password: "Test1234$",
    });
    console.log(user);
  } catch (error) {
    console.log("error signing up:", error);
  }
}

async function signIn() {
  try {
    const user = await Auth.signIn("user1@gmail.com", "Test1234$");
    console.log(user);
  } catch (error) {
    console.log("error signing in", error);
  }
}

const Home = () => {
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(API_ENDPOINT);
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovies();
    // signUp();
    signIn();
  }, []);

  return <div> Hello </div>;
};

export default Home;
