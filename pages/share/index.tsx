import Navbar from "@/components/navbar";
import UserContext from "@/context/userContext";
import { useContext } from "react";

const Share = () => {
  const { user } = useContext(UserContext);

  const handleShareMovie = async () => {
    fetch("http://localhost:5000/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: Math.floor(Math.random() * 9999),
        description: "abc",
        youtubeVideoId: "abc",
        user: {
          id: user.id,
        },
      }),
    });
  };

  return (
    <div>
      <Navbar />
      <input type="text" />
      <button onClick={handleShareMovie}>Share</button>
    </div>
  );
};

export default Share;
