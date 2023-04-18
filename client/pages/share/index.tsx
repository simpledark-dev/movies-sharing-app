import NavigationBar from "@/components/NavigationBar";
import ShareMovieSection from "@/components/ShareMovieSection";
import useVerifyToken from "@/hooks/useVerifyToken";

const Share = () => {
  useVerifyToken();

  return (
    <>
      <NavigationBar />
      <ShareMovieSection />
    </>
  );
};

export default Share;
