import styled from "styled-components";

import ProductBox from "@/components/ProductBox";

const StyledProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  align-items: center;
  margin-top: 20px;

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export default function ProductGrid({ products }) {
  return (
    <StyledProductGrid>
      {products?.length > 0 &&
        products.map((item) => <ProductBox key={item._id} {...item} />)}
    </StyledProductGrid>
  );
}
