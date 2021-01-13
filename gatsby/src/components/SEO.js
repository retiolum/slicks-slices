import { useStaticQuery, graphql } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';

export default function SEO({ children, location, description, title, image }) {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          siteUrl
          description
          twitter
        }
      }
    }
  `);
  return (
    <Helmet titleTemplate={`%s - ${site.siteMetadata.title}`}>
      {/* Basics */}
      <html lang="en" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charset="utf-8" />

      {/* Title */}
      <title>{title}</title>

      {/* Favicon */}
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="alternate icon" href="/favicon.ico" />

      {/* Description */}
      <meta
        name="description"
        content={description ?? site.siteMetadata.description}
      />

      {/* OpenGraph */}
      {location && <meta property="og:url" content={location.href} />}
      <meta property="og:image" content={image || '/logo.svg'} />
      <meta property="og:title" content={title} />
      <meta
        property="og:description"
        content={description ?? site.siteMetadata.description}
      />
      <meta property="og:site_name" content={site.siteMetadata.title} />

      {/* Other stuff */}
      {children}
    </Helmet>
  );
}
