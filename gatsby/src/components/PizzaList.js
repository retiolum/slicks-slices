import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';
import formatMoney from '../utils/formatMoney';

const PizzaGridStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 4rem;
  grid-auto-rows: auto auto 500px;
`;

const PizzaStyles = styled.div`
  display: grid;
  @supports not (grid-template-rows: subgrid) {
    --rows: auto auto 1fr;
  }
  grid-template-rows: var(
    --rows,
    subgrid
  ); // Take row sizing from the parent grid!
  grid-row: span 3;
  grid-gap: 1rem;
  h2,
  p {
    margin: 0;
  }
`;

function SinglePizza({ pizza, withToppings = true }) {
  return (
    <PizzaStyles>
      <Link to={`/pizza/${pizza.slug.current}`}>
        <h2>
          <span className="mark">
            {pizza.name} ({formatMoney(pizza.price)})
          </span>
        </h2>
      </Link>
      {(() => {
        if (withToppings) {
          return (
            <p>{pizza.toppings.map((topping) => topping.name).join(', ')}</p>
          );
        }
      })()}
      <Img
        fluid={pizza.image.asset.fluid}
        alt={pizza.name}
        title={pizza.name}
      />
    </PizzaStyles>
  );
}

export default function PizzaList({ pizzas, withToppings = true }) {
  return (
    <PizzaGridStyles>
      {pizzas.map((pizza) => (
        <SinglePizza key={pizza.id} pizza={pizza} withToppings={withToppings} />
      ))}
    </PizzaGridStyles>
  );
}
