import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import './ListOfServices.css';
import ServiceCard from './ServiceCard';
import { UserContext } from './../UserContext';

function ListOfServices() {
  const [services, setServices] = useState([]); // Store fetched services
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext); // Get logged-in user details

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
      const response = await fetch('http://localhost:5001/api/listofservices'); // Adjusted endpoint

      if (!response.ok) {
        console.error('Failed to fetch services. HTTP status:', response.status);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response:', data);  // Log the full response for debugging

      if (data.services) {
        console.log('Services received:', data.services);
        // Extract only the required fields (serviceName, location, and price) from each service
        const filteredServices = data.services.map(service => ({
          serviceName: service.serviceName,
          location: service.location,
          price: service.price
        }));
        setServices(filteredServices); // Set the filtered services
      } else {
        console.log('No services found in response, setting empty list.');
        setServices([]); // If no services, set to empty array
      }
    } catch (error) {
      console.error('Error fetching services:', error);
      setServices([]); // In case of error, set services to empty array
    } finally {
      console.log('Finished fetching services.');
      setLoading(false);
    }
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
            <Link title="Click to show profile" to="/profile">
              Welcome {user.username}
            </Link>
          </>
        ) : (
          <>
            <Link to="/signup">Sign Up</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </nav> 

      <div className="results-container">
        {loading ? (
          <p>Loading...</p>
        ) : services.length > 0 ? (
          <div className="service-list">
            {services.map((service, index) => (
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
