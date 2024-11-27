import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ListOfServices.css';
import { useContext } from 'react';
import { UserContext } from './../UserContext';

function ListOfServices() {
  const [services, setServices] = useState([]); // Store fetched services
  const [categorizedServices, setCategorizedServices] = useState({}); // Grouped services by category
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    fetchServiceDetails();
  }, []);

  const fetchServiceDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5001/api/services/details');
      if (!response.ok) {
        console.error('API error:', response.statusText);
        setServices([]);
        return;
      }
      const data = await response.json();

      // Debugging: Check the data structure
      console.log('Fetched services:', data);

      // Update services if the response contains an array
      const results = data.results || data; // Adjust if `results` is absent
      if (Array.isArray(results)) {
        setServices(results);
        setCategorizedServices(categorizeServices(results));
      } else {
        console.error('Unexpected API response format:', data);
        setServices([]);
      }
    } catch (error) {
      console.error('Error fetching service details:', error);
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  const categorizeServices = (services) => {
    const categories = {};
    services.forEach((service) => {
      const category = service.serviceType || 'Other'; // Default to "Other" if no category exists
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(service);
    });
    return categories;
  };

  return (
    <div className="list-of-services-page">
      <header>
        <h1>Services</h1>
        <p>Explore categorized services available in your area.</p>
      </header>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/why-find-me">Why Find Me</Link>
        <Link to="/listofservices">Find Talent</Link>
        <Link to="/contact">Contact</Link>
        {user ? (
          <>
            <Link title="Click to show profile" to="/profile">
              Welcome {user?.username}
            </Link>
          </>
        ) : (
          <>
            <Link to="/signup">Sign Up</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </nav>

      <div className="services-container">
        {loading ? (
          <p>Loading...</p>
        ) : Object.keys(categorizedServices).length > 0 ? (
          Object.entries(categorizedServices).map(([category, services]) => (
            <div key={category} className="service-category">
              <h2>{category}</h2>
              <ul>
                {services.map((service) => (
                  <li key={service._id}>
                    <h3>{service.serviceName}</h3>
                    <p>Location: {service.location}</p>
                    <p>Languages: {service.languages?.join(', ')}</p>
                    <p>Price: ${service.price}/hour</p>
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p>No services available at the moment.</p>
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
