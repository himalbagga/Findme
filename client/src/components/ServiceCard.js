// ServiceCard.js
import React from 'react';
import { Link } from 'react-router-dom';

function ServiceCard({ id, title, location, languages, pricePerHour }) {
  return (
    <div className="service">
      <h3>{title}</h3>
      <p>
        <strong>Location:</strong> {location}
      </p>
      <p>
        <strong>Languages:</strong> {languages?.join(", ")}
      </p>
      <p>
        <strong>Price per Hour:</strong> ${pricePerHour}
      </p>
      <Link to={`/services/${id}`} className="view-details-button">
        View More Details
      </Link>
    </div>
  );
}

export default ServiceCard;
