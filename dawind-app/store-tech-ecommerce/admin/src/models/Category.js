import mongoose, { Schema, model, models } from "mongoose";

const CategorySchema = Schema(
  {
    name: { type: String, required: true },
    parent: { type: mongoose.Types.ObjectId, ref: "Category" },
    properties: {
      type: [{ name: String, values: { type: Array } }],
      default: [],
    },
  },
  { timestamps: true }
);

export const Category = models?.Category || model("Category", CategorySchema);
