import { graphql, Link, useStaticQuery } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

function countPizzasForToppings(pizzas) {
  const toppingsWithCount = pizzas
    .map((pizza) => pizza.toppings)
    .flat()
    .reduce((carry, topping) => {
      const existingTopping = carry[topping.id];
      if (existingTopping) {
        existingTopping.count += 1;
      } else {
        carry[topping.id] = {
          ...topping,
          count: 1,
        };
      }
      return carry;
    }, {});
  const sortedToppingWithCount = Object.values(toppingsWithCount).sort(
    (a, b) => b.count - a.count
  );
  return sortedToppingWithCount;
}

const ToppingsStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 4rem;
  font-style: 2rem;
  font-size: clamp(12px, 3vw, 20px);

  a {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 0 1rem;
    background: var(--grey);
    padding: 5px;
    align-items: center;
    border-radius: 2px;

    .count {
      background: white;
      padding: 5px;
    }

    &[aria-current='page'] {
      background: var(--yellow);
    }
  }
`;

function Topping({ topping, activeId }) {
  return (
    <Link
      to={`/topping/${topping.slug.current}`}
      className={activeId === topping.id ? 'active' : ''}
    >
      <span className="name">
        {topping.name} {topping.vegetarian ? '🌱' : ''}
      </span>
      <span className="count">{topping.count}</span>
    </Link>
  );
}

export default function ToppingsFilter({ activeId }) {
  const { pizzas } = useStaticQuery(graphql`
    query {
      pizzas: allSanityPizza {
        nodes {
          toppings {
            id
            name
            vegetarian
            slug {
              current
            }
          }
        }
      }
    }
  `);
  const toppingsWithCount = countPizzasForToppings(pizzas.nodes);
  return (
    <ToppingsStyles>
      <Link to="/pizzas">
        <span className="name">All</span>
        <span className="count">{pizzas.nodes.length}</span>
      </Link>
      {toppingsWithCount.map((topping) => (
        <Topping key={topping.id} topping={topping} activeId={activeId} />
      ))}
    </ToppingsStyles>
  );
}
