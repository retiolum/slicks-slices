import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import Logo from './Logo';

const NavStyles = styled.nav`
  .logo-item {
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
    display: block;
    font-size: clamp(1.5rem, 4vw, 3rem);
    text-decoration: none;

    &:hover {
      color: var(--red);
    }
  }

  @media (max-width: 600px) {
    --columns: 4;
    ul {
      grid-template-rows: auto auto;
      grid-template-columns: repeat(var(--columns), 1fr);
      justify-items: center;
    }
    .logo-item {
      order: 0;
      grid-column: 1 / -1;
      transform: none;
    }
    margin-bottom: 2rem;
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
        <li className="logo-item">
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
