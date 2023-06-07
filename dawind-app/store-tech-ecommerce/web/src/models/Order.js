import { Schema, model, models } from "mongoose";

const OrderSchema = new Schema(
  {
    name: { type: String },
    email: { type: String },
    city: { type: String },
    postalCode: { type: String },
    streetAddress: { type: String },
    country: { type: String },
    paid: { type: Boolean },
    line_items: { type: Object, required: true },
  },
  { timestamps: true }
);

export const Order = models?.Order || model("Order", OrderSchema);
