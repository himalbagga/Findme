// HomePage1.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Hompage.css';

function HomePage() {
  const [query, setQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    // Redirect to search results page, passing the query as a URL parameter

    // const url = maxPrice ? `/search-results?q=${query}&maxPrice=${maxPrice}` : `/search-results?q=${query}`;
    // console.log()
    // navigate(url);

    navigate(`/search-results?q=${query}`);
  };

  return (
    <div>
      <header>
        <h1>Find Me</h1>
        <p>Explore thousands of services available near you!</p>
      </header>
      <nav>
        <a href="/">Home</a>
        <a href="#">Why Find Me</a>
        <a href="#">Find Talent</a>
        
        <a href="#">Contact</a>
        <a href="/signup">Login/Sign Up</a>
      </nav>
      <div className="body_container">
        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search jobs by keyword"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {/* <select>
            <option value="">Filter</option>
            <option value="option">#Option#</option>
          </select> */}
          
          {/* <select value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)}>
            <option value="">Max Price</option>
            <option value="25">25/hour</option>
            <option value="35">35/hour</option>
            <option value="45">45/hour</option>
            <option value="60">60/hour</option>
          </select> */}

          <button type="button" onClick={handleSearch}>Search</button>
        </div>

        {/* Services Sections */}
        <section className="services">
          <div className="section-content">
            <h2 className="section-title">Top Services</h2>
            <div className="service-list">
              {/* Repeatable Service Component */}
              <ServiceCard
                title="Software Developer"
                description="ABC Tech - Part Time - Remote"
                details="Skilled developer proficient in Java, Python, C#, C++, C, and Rub."
              />
              <ServiceCard
                title="Experienced Carpenter"
                description="XYZ business - Self-employed"
                details="Experienced carpenter doing carpentry for more than 10 years. Available on weekends."
              />
            </div>
          </div>
        </section>

        <section className="services">
          <div className="section-content">
            <h2 className="section-title">Recent Service Postings</h2>
            <div className="service-list">
              {/* Repeatable Service Component */}
              <ServiceCard
                title="Data Analyst"
                description="DataCorp - Part Time - $35/hr"
                details="Able to analyze and interpret complex data sets to help drive business decisions."
              />
              <ServiceCard
                title="Cleaner"
                description="STU - Freelancer"
                details="A professional cleaner specialized in deep cleaning. Willing to do yard-work as well."
              />
            </div>
          </div>
        </section>
      </div>

      <footer>
        <p>&copy; 2024 Service Listings. All rights reserved.</p>
        <p>
          <a href="#" style={{ color: '#ddd' }}>Privacy Policy</a> |
          <a href="#" style={{ color: '#ddd' }}>Terms of Service</a>
        </p>
      </footer>
    </div>
  );
}

// ServiceCard Component for Reusability
function ServiceCard({ title, description, details }) {
  return (
    <div className="service">
      <h3>{title}</h3>
      <p>{description}</p>
      <p>{details}</p>
      <a href="#">Book Now</a>
    </div>
  );
}

export default HomePage;
