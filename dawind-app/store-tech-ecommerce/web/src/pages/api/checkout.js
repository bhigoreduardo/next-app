import { mongooseConnect } from "@/libs/mongoose";
import { Order } from "@/models/Order";
import { Product } from "@/models/Product";

const stripe = require("stripe")(process.env.STRIPE_SK);

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(422).json({ message: "shoud be a POST request" });

  await mongooseConnect();
  const { name, email, city, postalCode, streetAddress, country, products } =
    req.body;
  // const productsIds = products.split(',');
  const uniqueIds = [...new Set(products)];
  const productsInfos = await Product.find({ _id: uniqueIds });

  let line_items = [];
  for (const productId of uniqueIds) {
    const productInfo = productsInfos.find(
      (item) => item._id.toString() === productId
    );
    const quantity = products.filter((item) => item === productId)?.length || 0;
    if (quantity > 0 && productInfo) {
      line_items.push({
        productId,
        title: productInfo.title,
        price: productInfo.price,
        properties: productInfo.properties,
        categoryProperties: productInfo.categoryProperties,
        quantity,
        price_data: {
          currency: "USD",
          product_data: { name: productInfo.title },
          unit_amount: productInfo.price * 100,
        },
      });
    }
  }

  const order = await Order.create({
    name,
    email,
    city,
    postalCode,
    streetAddress,
    country,
    paid: false,
    line_items,
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    customer_email: email,
    success_url: process.env.NEXT_PUBLIC_URL + "/cart?success=1",
    cancel_url: process.env.NEXT_PUBLIC_URL + "/cart?canceled=1",
    metadata: {
      orderId: order._id.toString(),
    },
  });

  return res.status(201).json({
    url: session.url,
  });
}
