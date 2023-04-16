import { useEffect } from "react";
import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const API_ENDPOINT =
  "https://1j73a22zh0.execute-api.ap-southeast-1.amazonaws.com/dev";

const Home = () => {
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/movies");
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovies();
  }, []);

  return <div> Hello </div>;
};

export default Home;
