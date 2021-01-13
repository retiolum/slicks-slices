import { graphql } from 'gatsby';
import React from 'react';
import PizzaList from '../components/PizzaList';
import SEO from '../components/SEO';
import ToppingsFilter from '../components/ToppingsFilter';

export default function PizzasPage({ data, pageContext }) {
  const pizzas = data.pizzas.nodes;
  return (
    <>
      <SEO
        title={
          pageContext.toppingName
            ? `Pizzas with ${pageContext.toppingName}`
            : 'All pizzas'
        }
      />
      <ToppingsFilter activeId={pageContext.toppingId} />
      <PizzaList pizzas={pizzas} />
    </>
  );
}

export const query = graphql`
  query PizzaQuery($toppingId: [String]) {
    pizzas: allSanityPizza(
      filter: { toppings: { elemMatch: { id: { in: $toppingId } } } }
    ) {
      nodes {
        id
        name
        slug {
          current
        }
        price
        toppings {
          id
          name
        }
        image {
          asset {
            fixed(width: 200, height: 200) {
              ...GatsbySanityImageFixed
            }
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
