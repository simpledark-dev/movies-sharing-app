import Link from "next/link";

const Share = () => {
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
          id: 1,
        },
      }),
    });
  };

  return (
    <div>
      <Link href="/">Home</Link>

      <button onClick={handleShareMovie}>Share</button>
    </div>
  );
};

export default Share;
