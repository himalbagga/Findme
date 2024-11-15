// ListOfServices.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ServiceCard from "./ServiceCard";
import "./ListOfServices.css";

function ListOfServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/services");
        const data = await response.json();
        setServices(data.services);  // Assuming the response has a `services` array
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Filter services based on the search query
  const filteredServices = services.filter((service) =>
    service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="page-wrapper">
      {/* Header with Navigation */}
      <header>
        <h1>Find Me</h1>
        <p>Browse all available services.</p>
      </header>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/why-find-me">Why Find Me</Link>
        <Link to="/find-talent">Find Talent</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/signup">Login/Sign Up</Link>
      </nav>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search services by keyword or location"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="button" onClick={() => setSearchQuery("")}>
          Clear
        </button>
      </div>

      {/* Services List */}
      <div className="services-container">
        {loading ? (
          <p>Loading services...</p>
        ) : filteredServices.length > 0 ? (
          <div className="service-list">
            {filteredServices.map((service) => (
              <ServiceCard 
                key={service.id} 
                id={service.id} 
                title={service.title} 
                location={service.location} 
                languages={service.languages} 
                pricePerHour={service.pricePerHour} 
              />
            ))}
          </div>
        ) : (
          <p>No services found.</p>
        )}
      </div>

      {/* Footer */}
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

export default ListOfServices;
