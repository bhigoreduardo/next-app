import { isAdminRequest } from "./auth/[...nextauth]";
import { mongooseConnect } from "@/libs/mongoose";
import { Category } from "@/models/Category";

export default async function handler(req, res) {
  await isAdminRequest(req, res);
  await mongooseConnect();

  const { method } = req;

  if (method === "GET") {
    const categories = await Category.find().populate("parent");
    return res.status(200).json(categories);
  }

  if (method === "POST") {
    const { name, parent, properties } = req.body;
    const category = await Category.create({
      name,
      parent: parent || undefined,
      properties,
    });
    return res.status(201).json(category);
  }

  if (method === "PUT") {
    const { name, parent, properties, _id } = req.body;
    const category = await Category.updateOne(
      { _id },
      {
        name,
        parent: parent || undefined,
        properties,
      }
    );
    return res.status(200).json(category);
  }

  if (method === "DELETE") {
    const { id: _id } = req.query;
    await Category.deleteOne({ _id });
    return res.status(204).json(true);
  }
}
