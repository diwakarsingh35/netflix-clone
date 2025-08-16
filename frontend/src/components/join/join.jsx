import React from 'react';

const Join = ({ title, description, image }) => {
  return (
    <div className="more-reasons">
      <h2 className="title">{title}</h2>
      <p className="desp">{description}</p>
      <div className="image-container">
        <img src={image} alt={title} />
      </div>
    </div>
  );
};

export default Join;
