import React from 'react';
import ItemGrid from '../components/ItemGrid';
import LoadingGrid from '../components/LoadingGrid';
import SEO from '../components/SEO';
import { HomePageGrid } from '../styles/Grids';
import useLatestData from '../utils/useLatestData';

function CurrentlySlicing({ items }) {
  return (
    <div>
      <h2>
        <span className="mark tilt">Slicemasters On</span>
      </h2>
      <p>Standing by, ready to slice you up!</p>
      {!items || !items.length ? (
        <LoadingGrid count={4} />
      ) : (
        <ItemGrid items={items} />
      )}
    </div>
  );
}

function HotSlices({ items }) {
  return (
    <div>
      <h2>
        <span className="mark tilt">Hot Slices</span>
      </h2>
      <p>Com on by, buy the slice!</p>
      {!items || !items.length ? (
        <LoadingGrid count={4} />
      ) : (
        <ItemGrid items={items} />
      )}
    </div>
  );
}

export default function HomePage() {
  const { hotSlices, slicemasters } = useLatestData();
  return (
    <>
      <SEO title="Best pizza in town" />
      <div className="center">
        <h1>The Best Pizza Downtown!</h1>
        <p>Open 11am to 11pm Every Single Day!</p>
        <HomePageGrid>
          <CurrentlySlicing items={slicemasters} />
          <HotSlices items={hotSlices} />
        </HomePageGrid>
      </div>
    </>
  );
}
