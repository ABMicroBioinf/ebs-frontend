/**
 * Jongil Yoon
 */

import cookie from "cookie";
import { verify } from "jsonwebtoken";
import { secret } from "./secret";

export default async (req, res) => {
  if (req.method === "GET") {
    const token = req.cookies.auth;
    verify(token, secret, (err) => {
      if (!err) {
        res.setHeader(
          "Set-Cookie",
          cookie.serialize("auth", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            maxAge: 0,
            path: "/",
          })
        );
        res.status(200).json({ messsage: "logged out" });
      } else {
        res.status(403).json({ messsage: "denied" });
      }
    });
  }
};
