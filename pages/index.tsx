import { useEffect } from "react";
import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const API_ENDPOINT =
  "https://m0rz74a4y4.execute-api.ap-southeast-1.amazonaws.com/dev/movies";

const Home = () => {
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(API_ENDPOINT);
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.log("Here");
        console.error(error);
      }
    };
    fetchMovies();
  }, []);

  return <div> Hello </div>;
};

export default Home;
