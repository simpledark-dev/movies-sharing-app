import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

const Home = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("http://localhost:5000/movies");
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
      <Link href="/share">Share a movie</Link>
      {movies.map((movie: any) => {
        return (
          <React.Fragment key={movie.id}>
            <p>{movie.title}</p>
            <p>Shared by: {movie.email}</p>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Home;
