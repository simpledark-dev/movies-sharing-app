import Navbar from "@/components/navbar";
import UserContext from "@/context/userContext";
import { getCookieValue } from "@/utils/cookie";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { BASE_API_URL } from "@/config/constants";

const Share = () => {
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
