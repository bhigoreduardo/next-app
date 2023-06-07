import { useContext } from "react";
import { styled } from "styled-components";

import { CartContext } from "@/store/CartContext";
import Center from "./Center";
import Button from "@/components/Button";
import ButtonLink from "@/components/ButtonLink";

const StyledSection = styled.section`
  background-color: #222;
  padding: 50px 0;
`;
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  align-items: center;
  gap: 40px;

  img {
    max-width: 100%;
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;

    div:nth-child(1) {
      order: 2;
    }
  }
`;
const Title = styled.h1`
  margin: 0;
  color: #fff;
  font-weight: normal;
  font-size: 3rem;
`;
const Description = styled.p`
  color: #aaa;
  font-size: 0.8rem;
`;
const WrapperButton = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 20px;

  @media screen and (max-width: 768px) {
    justify-content: center;
  }
`;
const WrapperImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

function Featured({ product }) {
  const { addProduct } = useContext(CartContext);

  function addFeaturedToCart() {
    addProduct(product._id);
  }

  return (
    <StyledSection>
      <Center>
        <Wrapper>
          <div>
            <Title>{product.title}</Title>
            <Description>{product.description}</Description>

            <WrapperButton>
              <ButtonLink
                href={`/products/${product._id}`}
                white={1}
                outlined={1}
              >
                Read more
              </ButtonLink>

              <Button white={1} onClick={addFeaturedToCart}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                </svg>
                Add to cart
              </Button>
            </WrapperButton>
          </div>

          <WrapperImage>
            <img
              src={`${process.env.NEXT_PUBLIC_API_URL}/public/${product.images[0]}`}
              alt={product.title}
            />
            {/* <Image
              loader={() => product.images[0]}
              src={product.images[0]}
              width={100}
              height={100}
              alt={product.title}
            /> */}
          </WrapperImage>
        </Wrapper>
      </Center>
    </StyledSection>
  );
}

export default Featured;
