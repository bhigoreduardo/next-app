import { mongooseConnect } from "@/libs/mongoose";
import { Product } from "@/models/Product";

export default async function handler(req, res) {
  await mongooseConnect();

  const ids = req.body.ids;
  return res.status(200).json(await Product.find({ _id: ids }));
}
