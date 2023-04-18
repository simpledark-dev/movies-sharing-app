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
        <>
          <h4 className="w-max mx-auto font-semibold mt-10 mb-4">
            Share a Youtube movie
          </h4>
          <div className="w-1/2 mx-auto px-8 py-16 bg-white  text-gray-800 font-semibold border border-gray-300 rounded shadow">
            <form className="space-y-4">
              <label className="flex items-center justify-between">
                <span>Youtube URL:</span>
                <input
                  type="text"
                  className="w-2/3 shadow border rounded py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outlineshadow "
                />
              </label>
              <div className="flex justify-end">
                <button
                  className="w-2/3 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-4 border border-gray-400 rounded shadow"
                  onClick={handleShareMovie}
                >
                  Share
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </Container>
  );
};

export default ShareMovieSection;
