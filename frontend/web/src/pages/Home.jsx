import React from 'react';
import Carosell from '../components/Carosell';
import OfferPages from '../components/offerPages';
import Allprod from '../components/Allprod';

export default function Home() {
  return (
    <div className="p-8 space-y-8">
      <Carosell />
      <OfferPages />
      <Allprod />
    </div>
  );
}
