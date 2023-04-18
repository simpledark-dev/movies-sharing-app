import Navbar from "@/components/navbar";
import UserContext from "@/context/userContext";
import { getCookieValue } from "@/utils/cookie";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

const Share = () => {
  const { user } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, []);

  const handleShareMovie = async () => {
    fetch("http://localhost:5000/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookieValue("jwtToken")}`,
      },
      body: JSON.stringify({
        title: Math.floor(Math.random() * 9999),
        description: "abc",
        youtubeVideoId: "abc",
        user: {
          id: user?.id,
        },
      }),
    });
  };

  return (
    <div>
      <Navbar />
      {user && (
        <>
          <input type="text" />
          <button onClick={handleShareMovie}>Share</button>
        </>
      )}
    </div>
  );
};

export default Share;
