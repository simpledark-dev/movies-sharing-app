import React, { useEffect, useState } from "react";
import { BASE_API_URL } from "@/config/constants";
import Container from "@/layout/container";

const SeeMoviesSection = () => {
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
    <Container>
      <div className="  space-y-8">
        {movies.map((movie: any) => {
          return (
            <div key={movie.id} className="flex gap-8 justify-center">
              <iframe
                className="w-1/3 aspect-video max-h-56 rounded"
                src={`https://www.youtube.com/embed/${movie.youtube_video_id}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
              />
              <div className="w-1/2">
                <h3 className="text-lg text-red-500">{movie.title}</h3>
                <p>Shared by: {movie.email}</p>
                <h3 className="text-md">Description:</h3>
                <p className="text-sm">{movie.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
};

export default SeeMoviesSection;
