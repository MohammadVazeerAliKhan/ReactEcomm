import React from "react";
import { Container } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
  background-color: #333;
  color: white;
`;

const NavbarLink = styled(NavLink)`
  color: white;
  text-decoration: none;
  margin: 0 10px;

  &.active {
    font-weight: bold;
    color: cyan;
  }
`;

const CartIconLink = styled(NavLink)`
  display: flex;
  align-items: center;
  color: white;
  text-decoration: none;

  &.active {
    font-weight: bold;
    color: cyan;
  }
`;

const Navbar = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartCount = cartItems.length;
  return (
    <>
      <NavbarContainer>
        <NavbarLink to="/">My Store</NavbarLink>
        <NavbarLink to="/create">Add New Product</NavbarLink>
        <CartIconLink to="/cart" className="cart-icon">
          <FaShoppingCart aria-label="Shopping Cart" /> <sup>{cartCount}</sup>
        </CartIconLink>
        <CartIconLink to="/">
          <FaUser />
        </CartIconLink>
      </NavbarContainer>
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default Navbar;
