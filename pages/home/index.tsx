import React, { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar";
import { BASE_API_URL } from "@/config/constants";

const inter = Inter({ subsets: ["latin"] });

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`${BASE_API_URL}/movies`);
        const data = await response.json();
        console.log(data);
        setMovies(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div>
      <Navbar />
      {movies.map((movie: any) => {
        return (
          <React.Fragment key={movie.id}>
            <p>Title: {movie.title}</p>
            <p>Shared by: {movie.email}</p>
            <hr />
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Home;
