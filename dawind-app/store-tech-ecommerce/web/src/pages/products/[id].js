import { useContext } from "react";
import { styled } from "styled-components";
import { toast } from "react-toastify";

import { mongooseConnect } from "@/libs/mongoose";
import { Product } from "@/models/Product";
import { CartContext } from "@/store/CartContext";
import Center from "@/widgets/Center";
import ProductImages from "@/components/ProductImages";
import Button from "@/components/Button";
import CartIcon from "@/components/CartIcon";

const ColumnGrid = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: 40px;
  margin-top: 40px;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;
const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`;
const PriceRow = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;

  span {
    font-size: 1.4rem;
    font-weight: bold;
  }
`;

export default function ProductPage({ product }) {
  const { addProduct } = useContext(CartContext);

  function addProductToCart(productId) {
    addProduct(productId);
    toast.success("Product Add to Cart", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }

  return (
    <main>
      <Center>
        <ColumnGrid>
          <Box>
            <ProductImages title={product.title} images={product.images} />
          </Box>

          <div>
            <h1>{product.title}</h1>
            <p>{product.description}</p>

            <PriceRow>
              <span>${product.price}</span>
              <Button primary={1} onClick={() => addProductToCart(product._id)}>
                <CartIcon /> Add To Cart
              </Button>
            </PriceRow>
          </div>
        </ColumnGrid>
      </Center>
    </main>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;
  const product = await Product.findById(id);

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}
