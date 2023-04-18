import NavigationBar from "@/components/NavigationBar";
import SeeMoviesSection from "@/components/SeeMoviesSection";
import useVerifyToken from "@/hooks/useVerifyToken";

const Home = () => {
  useVerifyToken();

  return (
    <>
      <NavigationBar />
      <SeeMoviesSection />
    </>
  );
};

export default Home;
