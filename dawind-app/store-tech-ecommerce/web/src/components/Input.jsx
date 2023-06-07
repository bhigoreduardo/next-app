import { styled } from "styled-components";

const StyledInput = styled.input`
  width: 100%;
  margin-bottom: 5px;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export default function Input(props) {
  return <StyledInput {...props} />;
}
