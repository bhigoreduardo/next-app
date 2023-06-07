import { isAdminRequest } from "./auth/[...nextauth]";
import { mongooseConnect } from "@/libs/mongoose";
import { Product } from "@/models/Product";

export default async function handler(req, res) {
  await isAdminRequest(req, res);
  await mongooseConnect();

  const { method } = req;

  if (method === "GET") {
    if (req?.query.id) {
      return res.status(200).json(await Product.findById(req?.query.id));
    }

    return res.status(200).json(await Product.find({}).populate("category"));
  }

  if (method === "POST") {
    const {
      title,
      description,
      price,
      images,
      category,
      properties,
      categoryProperties,
    } = req.body;

    const product = await Product.create({
      title,
      description,
      price,
      images,
      category,
      properties,
      categoryProperties,
    });
    return res.status(201).json(product);
  }

  if (method === "PUT") {
    const {
      _id,
      title,
      description,
      price,
      images,
      category,
      properties,
      categoryProperties,
    } = req.body;
    const product = await Product.updateOne(
      { _id },
      {
        title,
        description,
        price,
        images,
        category,
        properties,
        categoryProperties,
      }
    );
    return res.status(200).json(product);
  }

  if (method === "DELETE") {
    if (req?.query.id) {
      await Product.deleteOne({ _id: req?.query.id });
      return res.status(204).json(true);
    }
  }
}
