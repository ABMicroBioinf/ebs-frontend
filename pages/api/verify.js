/**
 * Author: Jongil Yoon
 */

import { verify } from "jsonwebtoken";
import { secret } from "./secret";

export default async (req, res) => {
  if (req.method === "GET") {
    const token = req.cookies.auth;
    verify(token, secret, (err) => {
      if (!err) {
        res.status(200).json({ available: true });
      } else {
        res.status(200).json({ available: false });
      }
    });
  }
};
