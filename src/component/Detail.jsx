import React from 'react';

const Detail = ({ req }) => {
  return (
    <div>
      <h2>Detail View</h2>
      <p>Date: {req.datetime}</p>
      <p>Max Temperature: {req.max_temp}</p>
      <p>Min Temperature: {req.min_temp}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default Detail;