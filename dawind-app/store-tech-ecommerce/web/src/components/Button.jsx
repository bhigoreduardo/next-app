import { css, styled } from "styled-components";

export const ButtonStyle = css`
  display: inline-flex;
  align-items: center;
  border: 1px solid transparent;
  border-radius: 5px;
  padding: 5px 15px;
  text-decoration: none;
  cursor: pointer;

  svg {
    height: 16px;
    margin-right: 5px;
  }

  ${(props) =>
    props.block &&
    css`
      display: block;
      width: 100%;
    `}
  ${(props) =>
    props.white &&
    !props.outlined &&
    css`
      background-color: #fff;
      color: #000;
    `}
  ${(props) =>
    props.white &&
    props.outlined &&
    css`
      background-color: transparent;
      color: #fff;
      border-color: #fff;
    `}
  ${(props) =>
    props.black &&
    !props.outlined &&
    css`
      background-color: #000;
      color: #fff;
    `}
  ${(props) =>
    props.black &&
    props.outlined &&
    css`
      background-color: transparent;
      color: #000;
      border-color: #000;
    `}
  ${(props) =>
    props.primary &&
    css`
      background-color: #5542f6;
      color: #fff;
    `}
  ${(props) =>
    props.size === "l" &&
    css`
      font-size: 1.2rem;
      padding: 10px 20px;

      svg {
        height: 26px;
      }
    `}
`;

const StyledButton = styled.button`
  ${ButtonStyle}
`;

function Button({ children, ...rest }) {
  return <StyledButton {...rest}>{children}</StyledButton>;
}

export default Button;
