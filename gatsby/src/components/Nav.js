import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import Logo from './Logo';

const NavStyles = styled.nav`
  .logo {
    transform: translateY(-25%);
  }

  ul {
    margin: 0;
    padding: 0;

    list-style: none;

    display: grid;
    grid-template-columns: 1fr 1fr auto 1fr 1fr;
    grid-gap: 2rem;
    align-items: center;

    text-align: center;

    margin-top: -6rem;
  }

  li {
    --rotate: -2deg;
    transform: rotate(var(--rotate));

    order: 1;

    &:nth-child(even) {
      --rotate: 1.5deg;
    }

    &:hover {
      --rotate: 3deg;
    }
  }

  a {
    font-size: 3rem;
    text-decoration: none;

    &:hover {
      color: var(--red);
    }
  }
`;

export default function Nav() {
  return (
    <NavStyles>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/pizzas">Pizza Menu</Link>
        </li>
        <li>
          <Link to="/">
            <Logo />
          </Link>
        </li>
        <li>
          <Link to="/slicemasters">Slicemasters</Link>
        </li>
        <li>
          <Link to="/order">Order Ahead!</Link>
        </li>
      </ul>
    </NavStyles>
  );
}
