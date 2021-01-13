import { useState, useEffect } from 'react';

const gql = String.raw;

const itemData = gql`
  _id
  name
  image {
    asset {
      url
      metadata {
        lqip
      }
    }
  }
`;

export default function useLatestData() {
  const [hotSlices, setHotSlices] = useState([]);
  const [slicemasters, setSlicemasters] = useState([]);

  useEffect(function () {
    fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        query: gql`
          query {
            StoreSettings(id: "downtown") {
              slicemasters {
                ${itemData}
              }
              hotSlices {
                ${itemData}
              }
            }
          }
        `,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setHotSlices(res.data.StoreSettings.hotSlices);
        setSlicemasters(res.data.StoreSettings.slicemasters);
      })
      .catch((err) => {
        console.log(`Error when querying Sanity`, err);
      });
  }, []);

  return { hotSlices, slicemasters };
}
