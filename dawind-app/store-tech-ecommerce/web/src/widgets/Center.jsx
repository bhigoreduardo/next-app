import { styled } from "styled-components";

const StyledSection = styled.section`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
`;

function Center({ children }) {
  return <StyledSection>{children}</StyledSection>;
}

export default Center;
