import { isAdminRequest } from "./auth/[...nextauth]";
import { mongooseConnect } from "@/libs/mongoose";
import { Order } from "@/models/Order";

export default async function handler(req, res) {
  await isAdminRequest(req, res);
  await mongooseConnect();

  return res.status(200).json(await Order.find({}).sort({ createdAt: -1 }));
}
