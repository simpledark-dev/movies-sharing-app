import React, { useContext, useEffect, useState } from "react";
import { Inter } from "next/font/google";
import UserContext from "@/context/userContext";
import Navbar from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

const Home = () => {
  const { user, setUser } = useContext(UserContext);
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
