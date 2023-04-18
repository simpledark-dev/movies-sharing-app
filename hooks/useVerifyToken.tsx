import { useContext, useEffect } from "react";
import UserContext from "@/context/userContext";
import { getCookieValue } from "@/utils/cookie";
import { BASE_API_URL } from "@/config/constants";

const useVerifyToken = () => {
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    const verfyToken = async (token: string) => {
      try {
        const response = await fetch(`${BASE_API_URL}/auth/verify-token`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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
