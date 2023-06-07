import { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";
import axios from "axios";

import { CartContext } from "@/store/CartContext";
import Center from "@/widgets/Center";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Table from "@/components/Table";

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
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
const ProductImageBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 10px;
  max-width: 100px;
  max-height: 100px;
  border: 1px solid rgba(0, 0, 0, 0.1);

  img {
    max-width: 100%;
  }
`;
const QuantityWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }
`;
const QuantityLabel = styled.span`
  padding: 0 3px;
`;
const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;

export default function Cart() {
  const { cartProducts, addProduct, removeProduct, clearCart } =
    useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");

  function moreOfThisProduct(id) {
    addProduct(id);
  }
  function lessOfThisProduct(id) {
    removeProduct(id);
  }
  async function goToPayment(ev) {
    ev.preventDefault();

    const res = await axios.post("/api/checkout", {
      name,
      email,
      city,
      postalCode,
      streetAddress,
      country,
      products: cartProducts,
    });

    if (res.data.url) {
      window.location = res.data.url;
    }
  }
  useEffect(() => {
    if (cartProducts?.length > 0) {
      axios
        .post("/api/cart", { ids: cartProducts })
        .then((res) => setProducts(res.data))
        .catch((err) => console.log(err));
    } else {
      setProducts([]);
    }
  }, [cartProducts]);
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (window?.location.href.includes("success")) {
      setIsSuccess(true);
      clearCart();
    }
  }, []);

  let amount = 0;
  for (const producId of cartProducts) {
    const price = products.find((item) => item._id === producId)?.price || 0;
    amount += price;
  }

  if (isSuccess) {
    return (
      <main>
        <Center>
          <ColumnsWrapper>
            <Box>
              <h1>Thanks for your order!</h1>
              <p>We will email you when your order will be sent.</p>
            </Box>
          </ColumnsWrapper>
        </Center>
      </main>
    );
  }

  return (
    <main>
      <Center>
        <ColumnsWrapper>
          <Box>
            {!cartProducts?.length && <div>Your cart is empty</div>}

            {products?.length > 0 && (
              <>
                <h2>Cart</h2>
                <Table>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Price</th>
                    </tr>
                  </thead>

                  <tbody>
                    {products.map((item) => (
                      <tr key={item._id}>
                        <td>
                          <ProductImageBox>
                            <img
                              src={`${process.env.NEXT_PUBLIC_API_URL}/public/${item.images[0]}`}
                              alt={item.title}
                            />
                          </ProductImageBox>
                          {item.title}
                        </td>
                        <td>
                          <QuantityWrapper>
                            <Button onClick={() => lessOfThisProduct(item._id)}>
                              -
                            </Button>
                            <QuantityLabel>
                              {
                                cartProducts.filter((id) => id === item._id)
                                  .length
                              }
                            </QuantityLabel>
                            <Button onClick={() => moreOfThisProduct(item._id)}>
                              +
                            </Button>
                          </QuantityWrapper>
                        </td>
                        <td>
                          $
                          {cartProducts.filter((id) => id === item._id).length *
                            item.price}
                        </td>
                      </tr>
                    ))}

                    <tr>
                      <td></td>
                      <td></td>
                      <td>${amount}</td>
                    </tr>
                  </tbody>
                </Table>
              </>
            )}
          </Box>

          {!!cartProducts?.length && (
            <Box>
              <h2>Order information</h2>
              <form onSubmit={goToPayment}>
                <Input
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={name}
                  onChange={(ev) => setName(ev.target.value)}
                />
                <Input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={(ev) => setEmail(ev.target.value)}
                />
                <CityHolder>
                  <Input
                    type="text"
                    placeholder="City"
                    name="city"
                    value={city}
                    onChange={(ev) => setCity(ev.target.value)}
                  />
                  <Input
                    type="text"
                    placeholder="Postal Code"
                    name="postalCode"
                    value={postalCode}
                    onChange={(ev) => setPostalCode(ev.target.value)}
                  />
                </CityHolder>
                <Input
                  type="text"
                  placeholder="Street Address"
                  name="streetAddress"
                  value={streetAddress}
                  onChange={(ev) => setStreetAddress(ev.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Country"
                  name="country"
                  value={country}
                  onChange={(ev) => setCountry(ev.target.value)}
                />
                {/* <input type="hidden" name="products" value={cartProducts.join(',')} /> */}
                <Button block={1} black={1} type="submit">
                  Continue to payment
                </Button>
              </form>
            </Box>
          )}
        </ColumnsWrapper>
      </Center>
    </main>
  );
}
