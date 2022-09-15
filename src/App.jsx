import React from 'react';

import { StarRating } from './StarRating';

export default function App() {
  const [rating, setRating] = React.useState(0);
  return (
    <div>
      Current Rating: {rating} <br />
      <StarRating rating={rating} onChange={setRating} />
    </div>
  );
}
