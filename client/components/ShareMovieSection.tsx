import UserContext from "@/context/userContext";
import { getCookieValue } from "@/utils/cookie";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { BASE_API_URL } from "@/config/constants";
import Container from "@/layout/container";

const ShareMovieSection = () => {
  const { user } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, []);

  const handleShareMovie = async () => {
    try {
      fetch(`${BASE_API_URL}/movies`, {
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
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      {user && (
        <form>
          <label>Youtube URL:</label>
          <input type="text" />
          <button onClick={handleShareMovie}>Share</button>
        </form>
      )}
    </Container>
  );
};

export default ShareMovieSection;
