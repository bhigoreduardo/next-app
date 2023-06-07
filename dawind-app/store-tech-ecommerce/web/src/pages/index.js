import { mongooseConnect } from "@/libs/mongoose";
import { Product } from "@/models/Product";
import Featured from "@/widgets/Featured";
import NewProducts from "@/widgets/NewProducts";

export default function Home({ featuredProduct, newProducts }) {
  return (
    <main>
      <Featured product={featuredProduct} />
      <NewProducts products={newProducts} />
    </main>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();

  const featuredProductId = "647fd3dcc1f0c886de68a10d";
  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 10,
  });

  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
}
