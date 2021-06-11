/**
 * Jongil Yoon
 */

// Temporary
import { hash } from "bcrypt";
import { promises as fs } from "fs";
import path from "path";
import formidable from "formidable";

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

      hash(data.fields.password, 10, async function (err, hash) {
        const visitor = {
          email: data.fields.email,
          username: data.fields.username,
          password: hash,
        };
        if (users.filter((user) => user.email === visitor.email).length > 0) {
          // registered
          res.statusCode = 409;
          res.json({ message: "conflict" });
        } else {
          // newly
          users = [...users, visitor];
          fs.writeFile(dbPath, JSON.stringify(users));
          res.statusCode = 200;
          res.json({ message: "new user has been registered" });
        }
      });
    } else if (req.method === "GET") {
      res.statusCode = 200;
      res.json(users);
    } else {
      res.statusCode = 404;
      res.json({ message: "POST/GET only" });
      // res.status(405).json({ message: 'POST only' })
    }
  } catch (err) {
    // when db file is empty
    res.statusCode = 403;
    res.json({ message: "denided" });
  }
};
