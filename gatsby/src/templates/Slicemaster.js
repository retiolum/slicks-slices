import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import React from 'react';
import styled from 'styled-components';
import SEO from '../components/SEO';

const SlicemasterStyles = styled.div`
  h1 {
    transform: rotate(-2deg);
    text-align: center;
    font-size: 4rem;
    margin-bottom: -2rem;
    position: relative;
    z-index: 2;
  }
  .description {
    background: var(--yellow);
    padding: 1rem;
    margin: 2rem;
    margin-top: -4rem;
    z-index: 2;
    transform: rotate(1deg);
    text-align: center;
  }
`;

export default function SingleSlicemasterPage({ data: { person } }) {
  return (
    <>
      <SEO
        title={`Slicemaster ${person.name}`}
        image={person.image?.asset?.fluid?.src}
        description={person.description}
      />
      <SlicemasterStyles>
        <h1>
          <span className="mark">{person.name}</span>
        </h1>
        <Img fluid={person.image.asset.fluid} alt={person.name} />
        <p className="description">{person.description}</p>
        <Link to="/slicemasters">Back</Link>
      </SlicemasterStyles>
    </>
  );
}

export const query = graphql`
  query($id: String!) {
    person: sanityPerson(id: { eq: $id }) {
      id
      name
      description
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
