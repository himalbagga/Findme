import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Homepage.css";
import { useContext } from 'react';
import { UserContext } from './../UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons'; // Import filter icon
import Map from './Map';

function HomePage() {
  const [query, setQuery] = useState("");
  const [services, setServices] = useState([]); // State to store services data
  const [showFilter, setShowFilter] = useState(false); // State to toggle filter options
  const [maxPrice, setMaxPrice] = useState(""); // State for max price filter
  const [selectedDate, setSelectedDate] = useState(""); // State for selected date filter
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchServices = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const demoServices = [
        { id: "67397b81f87998d627cfa5ec", title: "BabySitter", location: "Toronto", languages: ["English"], price: 25 },
        { id: "6738d320754c1771d746fb5d", title: "Developer", location: "Toronto", languages: ["English"], price: 98 },
        { id: "673547b1b56491417c4b4534", title: "Plumbing", location: "Toronto", languages: ["English"], price: 36 },
        { id: "67377ee7b5ab62ce82a1b957", title: "Coding", location: "Toronto", languages: ["English"], pricePerHour: 97 },
      ];

      setServices(demoServices);
    };

    fetchServices();
  }, []);

  const handleSearch = () => {
    let url = `/search-results?q=${query}`;
    if (maxPrice) url += `&maxPrice=${maxPrice}`;
    if (selectedDate) url += `&date=${selectedDate}`;
    navigate(url);
  };

  return (
    <div>
      <header>
        <h1>Find Me</h1>
        <p>Explore thousands of services available near you!</p>
      </header>
      <nav>
        <Link to="/">Home</Link>
        {/* <Link to="/why-find-me">Why Find Me</Link> */}
        <Link to="/listofservices">Find Talent</Link>
        <Link to="/contact">Contact</Link>
        {user ? (
          <>
            <Link title="Click to show profile" to="/profile">Welcome {user?.username}</Link>
            <Link to="/add-service" className="add-service-link">Add Service</Link>
            <Link to="/bookings">Bookings</Link>
          </>
        ) : (
          <>
            <Link to="/signup">Sign Up</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </nav>
      <div className="body_container">
        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search services by keyword"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <button type="button" onClick={handleSearch}>
            Search
          </button>

          {/* Filter Button (with Font Awesome filter icon) */}
          {/* <button type="button" onClick={() => setShowFilter(!showFilter)}>
            <FontAwesomeIcon icon={faFilter} /> 
          </button> */}
        </div>

        {/* Filter Options
        {showFilter && (
          <div className="filter-options">
            <select value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)}>
              <option value="">Max Price</option>
              <option value="25">25/hour</option>
              <option value="35">35/hour</option>
              <option value="45">45/hour</option>
              <option value="60">60/hour</option>
            </select>

            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
        )} */}

        {/* Services Sections */}
        <section className="services">
          <div className="section-content">
            <h2 className="section-title">Available Services</h2>
            {services.length > 0 ? (
              <div className="service-list">
                {services.map((service) => (
                  <ServiceCard key={service.id} id={service.id} title={service.title} location={service.location} languages={service.languages} price={service.price} />
                ))}
              </div>
            ) : (
              <p>Loading services...</p>
            )}
          </div>
        </section>
        <Map />
      </div>

      <footer>
        <p>&copy; 2024 Service Listings. All rights reserved.</p>
        <p>
          <Link to="/privacy-policy" style={{ color: "#ddd" }}>
            Privacy Policy
          </Link>{" "}
          |{" "}
          <Link to="/terms-of-service" style={{ color: "#ddd" }}>
            Terms of Service
          </Link>
        </p>
      </footer>
    </div>
  );
}

// ServiceCard Component for Reusability
function ServiceCard({ id, title, location, languages, price }) {
  return (
    <div className="service">
      <h3>{title}</h3>
      <p><strong>Location:</strong> {location}</p>
      <p><strong>Languages:</strong> {languages?.join(", ")}</p>
      <p><strong>Price per Hour:</strong> ${price}/Hour</p>
      <Link to={`/services/${id}`} className="view-details-button">
        View More Details
      </Link>
    </div>
  );
}

export default HomePage;
