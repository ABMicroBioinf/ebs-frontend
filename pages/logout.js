/**
 * Author: Jongil Yoon <jiysait@gmail.com>
 */
import axios from "axios";
import { useCallback, useEffect } from "react";
import { useAuth } from "../middleware/AuthProvider";
import withAuth from "../middleware/withAuth";

function Logout() {
  const { setAuthenticated } = useAuth();

  const logout = useCallback(async () => {
    const config = {
      withCredentials: true,
    };

    await axios
      .get("http://localhost:8000/api/account/logout", config)
      .then((res) => {
        if (res.status === 200) {
          setAuthenticated(false);
        } else {
          console.log("Failed to logout", res);
        }
      })
      .catch((err) => console.log("Failed to logout", err));
  }, []);

  useEffect(() => {
    logout();
  }, [setAuthenticated]);

  return <p>Logging out...</p>;
}

export default withAuth(Logout);
