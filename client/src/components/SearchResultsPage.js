// SearchResultsPage.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import ServiceCard from './ServiceCard';  // Import ServiceCard component
import '../styles/SearchResultsPage.css';
import { useContext } from 'react';
import { UserContext } from './../UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

function SearchResultsPage() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [showFilter, setShowFilter] = useState(false); 
  const [selectedDate, setSelectedDate] = useState("");
  //const [day, setDayOfWeek] = useState("");

  useEffect(() => {
    const initialQuery = new URLSearchParams(location.search).get('q');
    if (initialQuery) {
      setQuery(initialQuery);
      fetchResults(initialQuery, maxPrice, selectedDate);
    }
  }, [location.search]);

  const fetchResults = async (searchQuery, priceFilter, sDate) => {
    setLoading(true);
    try {
      const url = new URL('http://localhost:5001/api/services/search');
      const params = new URLSearchParams();
      params.set('q', searchQuery);
      if (priceFilter) params.set('maxPrice', priceFilter);
      console.log(sDate);
      if (sDate) 
        {
          const date = new Date(sDate);


          const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday","Sunday"];
          const day = days[date.getDay()];
          console.log(day);
          params.set('selectedDay', day);
        }

      url.search = params.toString();

      const response = await fetch(url);
      const data = await response.json();
      console.log(data.results);
      console.log(data.results._id);
      setResults(data.results);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = () => {
    navigate(`/search-results?q=${query}&maxPrice=${maxPrice}&selectedDate=${selectedDate}`);
    fetchResults(query, maxPrice, selectedDate);
  };

  return (
    <div className="search-results-page">
      <header>
        <h1>Find Me</h1>
        <p>Explore thousands of services available near you!</p>
      </header>
      {/* <nav>
        <a href="/">Home</a>
        <a href="#">Why Find Me</a>
        <a href="#">Find Talent</a>
        <a href="#">Contact</a>
        <a href="/signup">Login/Sign Up</a>
      </nav> */}

<nav>
        <Link to="/">Home</Link>
        <Link to="/why-find-me">Why Find Me</Link>
        <Link to="/listofservices">Find Talent</Link>
        <Link to="/contact">Contact</Link>
        {user ? (
          <>
            <Link title="Click to show profile" to="/profile">Welcome { user?.username }</Link>
            <Link to="/add-service" className="add-service-link">Add Service</Link>
            <Link to="/bookings">Bookings</Link>
          </> )
           : (
            <>
            <Link to="/signup">Sign Up</Link>
          <Link to="/login">Login</Link>
            </>
           )}
        
      </nav>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search jobs by keyword"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {/* <select value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)}>
          <option value="">Max Price</option>
          <option value="25">25/hour</option>
          <option value="35">35/hour</option>
          <option value="45">45/hour</option>
          <option value="60">60/hour</option>
        </select>
        <button type="button" onClick={handleSearchSubmit}>
          Search
        </button>
      </div> */}
      <button type="button" onClick={handleSearchSubmit}>
            Search
          </button>

          {/* Filter Button (with Font Awesome filter icon) */}
          <button type="button" onClick={() => setShowFilter(!showFilter)}>
            <FontAwesomeIcon icon={faFilter} /> {/* Filter settings icon */}
          </button>
        </div>

        {/* Filter Options */}
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

              <input type="text" placeholder="Enter location" />
          </div>
        )}

      <div className="body_container">
        {loading ? (
          <p>Loading...</p>
        ) : results.length > 0 ? (
          <div className="service-list">
            {results.map((result) => (
              console.log(result._id),
              <ServiceCard
                key={result._id}
                id={result._id}
                //id={result.id}
                title={result.serviceName}
                location={result.location}
                languages={result.languages}
                pricePerHour={result.price}
              />
            ))}
          </div>
        ) : (
          <p style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>No results found</p>
        )}
      </div>
    </div>
  );
}

export default SearchResultsPage;
