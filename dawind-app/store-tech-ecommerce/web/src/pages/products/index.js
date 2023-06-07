import { mongooseConnect } from "@/libs/mongoose";
import { Product } from "@/models/Product";
import Center from "@/widgets/Center";
import ProductGrid from "@/widgets/ProductGrid";

export default function Products({ products }) {
  return (
    <main>
      <Center>
        <h1>All Products</h1>
        <ProductGrid products={products} />
      </Center>
    </main>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const products = await Product.find({}, null, { sort: { _id: -1 } });

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
