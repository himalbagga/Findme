// SearchResultsPage.js
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchResultsPage.css';

function SearchResultsPage() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [maxPrice, setMaxPrice] = useState('');
  const location = useLocation();


  // Extract query parameter from URL
  const query = new URLSearchParams(location.search).get('q');
  //maxPrice = new URLSearchParams(location.search).get('maxPrice');

  useEffect(() => {
    if (query) {
      handleSearch(query);
    }
  }, [query]);

  const handleSearch = async (query) => {
    setLoading(true);
    try {
      //here is where the API for the data base will be
      console.log(typeof query);

      const url = new URL('http://localhost:5000/api/services/search');
      const params = new URLSearchParams();
      params.set('q', query);

      if (maxPrice) params.set('maxPrice', maxPrice);
      url.search = params.toString();

      const response = await fetch(url);
      //console.log(typeof query);
      const data = await response.json();
      console.log(data.results);
      setResults(data.results);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };
  console.log(results.length);
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

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search jobs by keyword"
          value={query}
        //onChange={(e) => setQuery(e.target.value)}
        />
        {/* <select>
            <option value="">Filter</option>
            <option value="option">#Option#</option>
          </select> */}
        <select value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)}>
          <option value="">Max Price</option>
          <option value="25">25/hour</option>
          <option value="35">35/hour</option>
          <option value="45">45/hour</option>
          <option value="60">60/hour</option>
        </select>
        <button type="button" onClick={handleSearch}>Search</button>
      </div>



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


// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import './SearchResultsPage.css';

// function SearchResultsPage() {
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [query, setQuery] = useState('');
//   const location = useLocation();
//   const history = useNavigate();

//   // Extract query parameter from URL
//   useEffect(() => {
//     const searchQuery = new URLSearchParams(location.search).get('q');
//     if (searchQuery) {
//       setQuery(searchQuery);
//       handleSearch(searchQuery);
//     }
//   }, [location.search]);

//   const handleSearch = async (searchQuery) => {
//     setLoading(true);
//     try {
//       const response = await fetch(`http://localhost:5000/api/services/search?q=${searchQuery}`);
//       const data = await response.json();
//       setResults(data.results);
//     } catch (error) {
//       console.error('Error fetching search results:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearchSubmit = () => {
//     // Update URL with the new search query parameter
//     history.push(`?q=${query}`);
//     handleSearch(query);
//   };

//   return (
//     <div className="search-results-page">
//       <header>
//         <h1>Find Me</h1>
//         <p>Explore thousands of services available near you!</p>
//       </header>

//       <nav>
//         <a href="/">Home</a>
//         <a href="#">Why Find Me</a>
//         <a href="#">Find Talent</a>
//         <a href="#">Contact</a>
//         <a href="/signup">Login/Sign Up</a>
//       </nav>

//       {/* Search Bar */}
//       <div className="search-bar">
//         <input
//           type="text"
//           placeholder="Search jobs by keyword"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//         />
//         <select>
//           <option value="">Filter</option>
//           <option value="option">#Option#</option>
//         </select>
//         <button type="button" onClick={handleSearchSubmit}>
//           Search
//         </button>
//       </div>

//       <div className="results-container">
//         {loading ? (
//           <p>Loading...</p>
//         ) : results.length > 0 ? (
//           results.map((result, index) => (
//             <div key={index} className="result-item">
//               <h3>{result.title}</h3>
//               <p>{result.description}</p>
//             </div>
//           ))
//         ) : (
//           <p>No results found</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default SearchResultsPage;
