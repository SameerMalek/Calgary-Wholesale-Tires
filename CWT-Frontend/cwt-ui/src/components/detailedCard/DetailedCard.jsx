import React from 'react';
import PropTypes from 'prop-types';
import './detailedCard.scss';

const DetailedCard = ({ name, description, diameter, offset, width, boltPattern, centerBore, color, image }) => {
  return (
    <div className="detailed-card">
      <img src={image} alt={name} className="product-image" />
      <div className="product-details">
        <h3>{name}</h3>
        <p>{description}</p>
        <ul>
          <li>Diameter: {diameter}</li>
          <li>Offset: {offset}</li>
          <li>Width: {width}</li>
          <li>Bolt Pattern: {boltPattern}</li>
          <li>Center Bore: {centerBore}</li>
          <li>Color: {color}</li>
        </ul>
      </div>
    </div>
  );
};

DetailedCard.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  diameter: PropTypes.string.isRequired,
  offset: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  boltPattern: PropTypes.string.isRequired,
  centerBore: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default DetailedCard;

