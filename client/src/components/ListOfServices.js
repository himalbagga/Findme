import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ListOfServices.css';
import ServiceCard from './listOfServicesCard';
import { UserContext } from './../UserContext';
import debounce from "lodash.debounce";

function ListOfServices() {
  const [services, setServices] = useState([]); // Store fetched services
  const [filteredServices, setFilteredServices] = useState([]); // Store filtered services
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState(""); // State for search query
  const [showFilter, setShowFilter] = useState(false); // Toggle filter display
  const [price, setPrice] = useState(""); // Filter by price
  const [date, setDate] = useState(""); // Filter by date
  const navigate = useNavigate();
  const { user } = useContext(UserContext); // Get logged-in user details
  const [location, setLocation] = useState(null); // Store user's location
  const [error, setError] = useState(null); // Store error messages

  // Fetch all services when the component mounts
  useEffect(() => {
    console.log('User from context:', user);  // Log the user object to check if it's properly fetched
    fetchServiceDetails();  // Call the function to fetch all services
  }, []);

  // Function to fetch all services from the backend
  const fetchServiceDetails = async () => {
    console.log('Start fetching all service details...');
    setLoading(true);

    try {
      console.log('Making API request to fetch all services...');
      const response = await fetch('http://localhost:5001/api/services/listofservices'); // Adjusted endpoint

      if (!response.ok) {
        console.error('Failed to fetch services. HTTP status:', response.status);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response:', data);  // Log the full response for debugging

      if (data) {
        console.log('Services received:', data);
        // Extract only the required fields (serviceName, location, and price) from each service
        const fetchedServices = Array.isArray(data)
        ? data.map(item => ({
          serviceName: item.serviceName,
          location: item.location,
          price: item.price,
          _id: item._id,
        }))
        :[];
        setServices(fetchedServices); // Set the fetched services
        setFilteredServices(fetchedServices); // Initialize filtered services
      } else {
        setServices([]);
        setFilteredServices([]);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
      setServices([]); // In case of error, set services to empty array
      setFilteredServices([]);
    } finally {
      console.log('Finished fetching services.');
      setLoading(false);
    }
  };

  const handleSearch = debounce(() => {
    const results = services.filter(service => {
      const matchesQuery =
        query === "" || service.serviceName.toLowerCase().includes(query.toLowerCase());
      const matchesPrice =
        price === "" || parseFloat(service.price) <= parseFloat(price);
      return matchesQuery && matchesPrice;
    });

    setFilteredServices(results);
  }, 300);

  useEffect(() => {
    handleSearch();
  }, [query, price])

  const handleFilterToggle = () => setShowFilter(!showFilter);
  
  const clearFilters = () => {
    setQuery("");
    setPrice("");
    setDate("");
    setFilteredServices(services); // Reset to all services
  };

  // Handle Get Location
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        setError(null);

        // You can call a reverse geocoding API here to get a human-readable address
        console.log("User's location:", latitude, longitude);
      },
      (error) => {
        setError("Unable to retrieve your location. Please try again.");
        console.error("Geolocation error:", error);
      }
    );
  };

  return (
    <div className="list-of-services-page">
      <header>
        <h1>Services</h1>
        <p>Explore the services you offer.</p>
      </header>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/why-find-me">Why Find Me</Link>
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

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search services by keyword"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
       

      {error && <p className="error">{error}</p>}
        <button type="button" onClick={handleFilterToggle}>
          Filter
        </button>
        {showFilter && (
          <div className="filter-options">
            <select
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            >
              <option value="">Max Price</option>
              <option value="25">25/hour</option>
              <option value="35">35/hour</option>
              <option value="45">45/hour</option>
              <option value="60">60/hour</option>
            </select>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        )}
      </div>

      <div className="body_container">
        {loading ? (
          <p>Loading...</p>
        ) : filteredServices.length > 0 ? (
          <div className="service-list">
            {filteredServices.map((service, index) => (
              <ServiceCard
                key={index}
                id={service._id}  // Ensure each service has an ID or unique identifier
                title={service.serviceName}
                location={service.location}
                pricePerHour={service.price}
              />
            ))}
          </div>
        ) : (
          <p style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}>No services available at the moment.</p>
        )}
      </div>

      <footer>
        <p>&copy; 2024 Service Listings. All rights reserved.</p>
        <p>
          <Link to="/privacy-policy" style={{ color: '#ddd' }}>
            Privacy Policy
          </Link>{' '}
          |{' '}
          <Link to="/terms-of-service" style={{ color: '#ddd' }}>
            Terms of Service
          </Link>
        </p>
      </footer>
    </div>
  );
}

export default ListOfServices;
