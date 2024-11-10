// SearchResultsPage.js
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function SearchResultsPage() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  // Extract query parameter from URL
  const query = new URLSearchParams(location.search).get('q');

  useEffect(() => {
    if (query) {
      handleSearch(query);
    }
  }, [query]);

  const handleSearch = async (query) => {
    setLoading(true);
    try {
    //here is where the API for the data base will be
      const response = await fetch(`https://api.example.com/search?q=${query}`); 
      const data = await response.json();
      setResults(data.results);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-results-page">
      <h2>Search Results for "{query}"</h2>
      <div className="results-container">
        {loading ? (
          <p>Loading...</p>
        ) : results.length > 0 ? (
          results.map((result, index) => (
            <div key={index} className="result-item">
              <h3>{result.title}</h3>
              <p>{result.description}</p>
            </div>
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
}

export default SearchResultsPage;
