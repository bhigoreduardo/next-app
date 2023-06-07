import Link from "next/link";
import { useContext, useState } from "react";
import { styled } from "styled-components";

import Center from "./Center";
import CloseIcon from "@/components/CloseIcon";
import BarsIcon from "@/components/BarsIcon";
import { CartContext } from "@/store/CartContext";

const StyledHeader = styled.header`
  background-color: #222;
  position: relative;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
`;
const Logo = styled(Link)`
  color: #fff;
  text-decoration: none;
  z-index: 3;
`;
const StyledNav = styled.nav`
  display: flex;
  align-items: center;
  gap: 10px;

  @media screen and (max-width: 768px) {
    ${(props) =>
      props.$mobileNavActive
        ? `
      display: flex;
    `
        : `
      display: none;
    `}
    flex-direction: column;
    position: fixed;
    top: 0px;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 50px;
    background-color: #222;
    z-index: 2;
  }
`;
const NavLink = styled(Link)`
  color: #aaa;
  text-decoration: none;
  &:hover {
    color: #fff;
  }
`;
const StyledBars = styled.button`
  background-color: transparent;
  color: #fff;
  width: 25px;
  height: 25px;
  padding: 0;
  border: none;
  cursor: pointer;
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
    z-index: 3;
  }
`;

function Header() {
  const { cartProducts } = useContext(CartContext);

  const [mobileNavActive, setMobileNavActive] = useState(false);

  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href="/">Ecommerce</Logo>

          <StyledNav $mobileNavActive={mobileNavActive}>
            <NavLink href="/">Home</NavLink>
            <NavLink href="/products">All Products</NavLink>
            <NavLink href="/categories">Categories</NavLink>
            <NavLink href="/account">Account</NavLink>
            <NavLink href="/cart">Cart ({cartProducts?.length})</NavLink>
          </StyledNav>

          <StyledBars onClick={() => setMobileNavActive((prev) => !prev)}>
            {mobileNavActive ? <CloseIcon /> : <BarsIcon />}
          </StyledBars>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}

export default Header;
