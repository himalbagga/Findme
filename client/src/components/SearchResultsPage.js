// SearchResultsPage.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ServiceCard from './ServiceCard';  // Import ServiceCard component
import './SearchResultsPage.css';

function SearchResultsPage() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const initialQuery = new URLSearchParams(location.search).get('q');
    if (initialQuery) {
      setQuery(initialQuery);
      fetchResults(initialQuery, maxPrice);
    }
  }, [location.search]);

  const fetchResults = async (searchQuery, priceFilter) => {
    setLoading(true);
    try {
      const url = new URL('http://localhost:5001/api/services/search');
      const params = new URLSearchParams();
      params.set('q', searchQuery);
      if (priceFilter) params.set('maxPrice', priceFilter);

      url.search = params.toString();

      const response = await fetch(url);
      const data = await response.json();
      setResults(data.results);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = () => {
    navigate(`/search-results?q=${query}&maxPrice=${maxPrice}`);
    fetchResults(query, maxPrice);
  };

  return (
    <div className="search-results-page">
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

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search jobs by keyword"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)}>
          <option value="">Max Price</option>
          <option value="25">25/hour</option>
          <option value="35">35/hour</option>
          <option value="45">45/hour</option>
          <option value="60">60/hour</option>
        </select>
        <button type="button" onClick={handleSearchSubmit}>
          Search
        </button>
      </div>

      <div className="results-container">
        {loading ? (
          <p>Loading...</p>
        ) : results.length > 0 ? (
          <div className="service-list">
            {results.map((result) => (
              <ServiceCard
                key={result.id}
                id={result.id}
                title={result.title}
                location={result.location}
                languages={result.languages}
                pricePerHour={result.pricePerHour}
              />
            ))}
          </div>
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
}

export default SearchResultsPage;
