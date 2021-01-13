import { graphql } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import SEO from '../components/SEO';

const BeerGridStyles = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

const BeerStyles = styled.div`
  border: 1px solid var(--grey);
  padding: 2rem;
  text-align: center;
  img {
    width: 100%;
    height: 200px;
    object-fit: contain;
    display: block;
    display: grid;
    align-items: center;
    font-size: 10px;
    background: var(--grey);
  }
`;

function SingleBeer({ beer }) {
  const rating = Math.round(beer.rating.average);
  return (
    <BeerStyles>
      <img src={beer.image} alt={beer.name} />
      <h2>
        {beer.name} ({beer.price})
      </h2>
      <p title={`${rating} out of 5 stars`}>
        {`⭐`.repeat(rating)}
        <span style={{ filter: `grayscale(100%)` }}>
          {`⭐`.repeat(5 - rating)}
        </span>
        &nbsp; ({`${beer.rating.reviews} reviews`})
      </p>
    </BeerStyles>
  );
}

export default function BeersPage({ data }) {
  return (
    <>
      <SEO title="All beers" />
      <h1>Beers</h1>
      <BeerGridStyles>
        {data.beers.nodes.map((beer) => (
          <SingleBeer key={beer.id} beer={beer} />
        ))}
      </BeerGridStyles>
    </>
  );
}

export const query = graphql`
  query {
    beers: allBeer {
      nodes {
        id
        name
        price
        rating {
          average
          reviews
        }
        image
      }
    }
  }
`;
