import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import React from 'react';
import styled from 'styled-components';
import SEO from '../components/SEO';
import formatMoney from '../utils/formatMoney';

const PizzaGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
`;

export default function SinglePizzaPage({ data: { pizza } }) {
  return (
    <>
      <SEO
        title={pizza.name}
        description={`${pizza.name} for ${formatMoney(pizza.price)}`}
        image={pizza.image?.asset?.fluid?.src}
      />
      <PizzaGrid>
        <Img fluid={pizza.image.asset.fluid} alt={pizza.name} />
        <div>
          <h1>
            {pizza.name} ({formatMoney(pizza.price)})
          </h1>
          <ul>
            {pizza.toppings.map((topping) => (
              <li key={topping.id}>
                {topping.name} {topping.vegetarian ? '🌱' : ''}
              </li>
            ))}
          </ul>
        </div>
      </PizzaGrid>
    </>
  );
}

export const query = graphql`
  query($id: String!) {
    pizza: sanityPizza(id: { eq: $id }) {
      id
      name
      slug {
        current
      }
      price
      toppings {
        id
        name
        vegetarian
      }
      image {
        asset {
          fluid(maxWidth: 800) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
`;
