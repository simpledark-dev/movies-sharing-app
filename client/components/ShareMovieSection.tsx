import { useContext, useState } from "react";
import { useRouter } from "next/router";

// Context
import UserContext from "@/context/userContext";

// Container
import Container from "@/layout/container";

import { BASE_API_URL, YOUTUBE_API_KEY } from "@/config/constants";
// Utils
import { getCookieValue } from "@/utils/cookie";
import { getYoutubeIdFromURL } from "@/utils/youtube";

const getYoutubeData = async (videoId: string) => {
  const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${YOUTUBE_API_KEY}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

const ShareMovieSection = () => {
  const { user } = useContext(UserContext);
  const [youtubeURL, setYoutubeURL] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleShareMovie = async () => {
    try {
      const youtubeVideoId = getYoutubeIdFromURL(youtubeURL);

      // Fetch youtube data with ID
      const youtubeData = await getYoutubeData(youtubeVideoId);

      // Get video title and description
      const videoTitle = youtubeData.items[0].snippet.title;
      const videoDescription = youtubeData.items[0].snippet.description;

      await fetch(`${BASE_API_URL}/movies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookieValue("jwtToken")}`,
        },
        body: JSON.stringify({
          title: videoTitle,
          description: videoDescription,
          youtubeVideoId,
          user: {
            id: user?.id,
          },
        }),
      });
      setMessage("");
      // Auto redirect to home after sharing a movie
      setTimeout(() => {
        router.push("/");
      }, 200);
    } catch (err) {
      console.log(err);
      setMessage("Oops! Something went wrong. Check your Youtube URL again.");
    }
  };

  return (
    <Container>
      {user && (
        <>
          <h4 className="w-max mx-auto font-semibold mt-10 mb-4">
            Share a Youtube movie
          </h4>
          <div className="w-1/2 mx-auto px-8 py-16 bg-white  text-gray-800 font-semibold border border-gray-300 rounded shadow space-y-4">
            <label className="flex items-center justify-between">
              <span>Youtube URL:</span>
              <input
                type="text"
                className="w-2/3 shadow border border-gray-300 rounded py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outlineshadow "
                value={youtubeURL}
                onChange={(e) => setYoutubeURL(e.target.value)}
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
            <div className="flex justify-center">
              <p className="text-sm text-red-500">{message}</p>
            </div>
          </div>
        </>
      )}
    </Container>
  );
};

export default ShareMovieSection;
