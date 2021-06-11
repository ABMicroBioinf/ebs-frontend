/**
 * Author: Jongil Yoon
 */

import axios from "axios";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";

/**
 * Next.js recommend to handle redirection in backend
 * following code needs to be fixed
 * @returns
 */
export default function Home() {
  const router = useRouter();

  const checkLogIn = useCallback(() => {
    const url = "/api/verify";
    axios
      .get(url)
      .then((res) => {
        if (res.status === 200) {
          router.push("/sequences");
        } else {
          router.push("/login");
        }
      })
      .catch(() => {
        router.push("/login");
      });
  }, []);

  useEffect(() => {
    checkLogIn();
  }, []);

  return <></>;
}
