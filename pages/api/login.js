/**
 * Jongil Yoon
 */

import { promises as fs } from "fs";
import path from "path";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import formidable from "formidable";
import cookie from "cookie";
import { secret } from "./secret";

// formidable
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  const dbDir = path.join(process.cwd(), "fakebackend/db");
  const dbPath = path.join(dbDir, "users.json");
  try {
    let users = JSON.parse(await fs.readFile(dbPath, "utf-8"));

    if (req.method === "POST") {
      const data = await new Promise((resolve, reject) => {
        const form = new formidable();
        form.parse(req, (err, fields, files) => {
          if (err) reject({ err });
          resolve({ err, fields, files });
        });
      });

      const user = users.filter((user) => user.email === data.fields.email)[0];

      compare(data.fields.password, user.password, (err, result) => {
        if (!err && result) {
          const claims = { sub: user.email };
          const jwt = sign(claims, secret, { expiresIn: "1h" });

          res.setHeader(
            "Set-Cookie",
            cookie.serialize("auth", jwt, {
              httpOnly: true,
              secure: process.env.NODE_ENV !== "development",
              sameSite: "strict",
              maxAge: 3600,
              path: "/",
            })
          );
          res.statusCode = 200;
          res.json({ messsage: "welcome back" });
        } else {
          res.statusCode = 403;
          res.json({ message: "denied" });
        }
      });
    }
  } catch (err) {
    res.statusCode = 403;
    res.json({ message: "API is not available" });
  }
};
