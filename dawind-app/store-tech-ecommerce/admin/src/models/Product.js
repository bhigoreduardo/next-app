import mongoose, { Schema, model, models } from "mongoose";

const ProductSchema = new Schema(
  {
    title: { type: String, required: true },
    category: { type: mongoose.Types.ObjectId, ref: "Category" },
    description: { type: String },
    price: { type: Number, required: true },
    images: { type: Array, default: [] },
    properties: {
      type: [{ name: String, values: { type: Array } }],
      default: [],
    },
    categoryProperties: { type: Object, default: {} },
  },
  { timestamps: true }
);

export const Product = models.Product || model("Product", ProductSchema);
