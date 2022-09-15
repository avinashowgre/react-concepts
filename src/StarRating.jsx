import React, { useState } from 'react';

export function StarRating(props) {
  const { onChange, rating } = props;
  const [over, setOver] = useState(0);

  const renderStar = (star) => {
    if (star <= rating) {
      return 'X';
    }

    if (star <= over) {
      return 'x';
    }

    return 'o';
  };

  return (
    <>
      {Array(5)
        .fill(0)
        .map((item, index) => (
          <button
            key={index}
            onClick={() => onChange(rating === index + 1 ? 0 : index + 1)}
            onMouseOver={() => setOver(index + 1)}
            onMouseOut={() => setOver(0)}
            type="button"
            style={{
              width: '30px',
              height: '30px',
              textAlign: 'center',
            }}
          >
            {renderStar(index + 1)}
          </button>
        ))}
    </>
  );
}
