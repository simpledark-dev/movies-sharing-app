import { useContext, useEffect } from "react";
import UserContext from "@/context/userContext";
import { getCookieValue } from "@/utils/cookie";

const useVerifyToken = () => {
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    const verfyToken = async (token: string) => {
      try {
        const response = await fetch(
          "http://localhost:5000/auth/verify-token",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setUser(data.user);
      } catch (err) {
        console.log(err);
      }
    };
    const token = getCookieValue("jwtToken");
    if (token) verfyToken(token);
  }, []);
};

export default useVerifyToken;
