import fs from "fs";
import path from "path";

import { isAdminRequest } from "./auth/[...nextauth]";
import { mongooseConnect } from "@/libs/mongoose";

export default async function handler(req, res) {
  await isAdminRequest(req, res);
  await mongooseConnect();

  const { method } = req;

  if (method === "POST") {
    const { name, data } = req.body;

    // console.log("size: " + data.length);
    const parts = name.split(".");
    const ext = parts[parts.length - 1];
    const filename = Date.now() + "." + ext;

    const pathname = path.join(__dirname, "../../../../public/" + filename);
    const bufferData = new Buffer.from(data.split(",")[1], "base64");

    fs.writeFile(pathname, bufferData, () => {
      console.log("saved file in: " + pathname);
    });

    return res.status(201).json(filename);
  }
}
