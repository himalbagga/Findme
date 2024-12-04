import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { UserContext, UserProvider } from "../UserContext";
import "../styles/ServiceDetailsPage.css";
import axios from 'axios';


// Import Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faMapMarkerAlt, faFileDownload, faLanguage, faCalendarAlt, faClock, faDollarSign, faCheckCircle, faCreditCard, faPerson, faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartOutline } from "@fortawesome/free-regular-svg-icons";
import CheckoutForm from "./CheckoutForm"
//// import { useContext } from 'react';
//// import { UserContext } from './../UserContext';

function ServiceDetailsPage() {
  const { serviceId } = useParams(); // Get the service ID from the URL parameters
  const navigate = useNavigate(); // Initialize navigate function
  const [serviceData, setServiceData] = useState(null); // State to store fetched service data
  const [selectedDays, setSelectedDays] = useState([]);
  const [dayTimes, setDayTimes] = useState({});
  const [subtotal, setSubtotal] = useState(0);
  const { user } = useContext(UserContext);
  const [service, setService] = useState(null);
  const [ratings, setRatings] = useState([]); // To store existing ratings
  const [averageRating, setAverageRating] = useState(0);
  const [isHeartSolid, setIsHeartSolid] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const pricePerHour = serviceData ? serviceData.pricePerHour : 0; // Use the price from fetched data

  //const { user } = useContext(UserContext);
  //const user = UserProvider();
  const userId = user ? user._id: null;

  useEffect(() => {
    // Simulate fetching data from backend
    const fetchServiceData = async () => {
      // Simulate an API call delay
      //await new Promise((resolve) => setTimeout(resolve, 500));

      // Demo data
      // const demoData = {
      //   id: serviceId,
      //   title: "Baby Sitter",
      //   providerFirstName: "John",
      //   providerLastName: "Doe",
      //   location: "New York, NY",
      //   languages: ["English", "Spanish"],
      //   availableDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      //   startTime: "09:00 AM",
      //   endTime: "05:00 PM",
      //   pricePerHour: 50,
      //   resumeUrl: "resume.pdf",
      // };

      // setServiceData(demoData);

      try {
        console.log(serviceId);
        const response = await axios.get(`http://localhost:5001/api/services/${serviceId}`);
        console.log(response.data);
        setServiceData(response.data);
      } catch (error) {
        console.error("Error fetching service data:", error);
        alert("Failed to load service data.");
      }
  
    };

    fetchServiceData();
  }, [serviceId]);

  // Fetch service details and reviews
useEffect(() => {
  const fetchServiceDetails = async () => {
    try {
      // Fetch service data
      const serviceResponse = await axios.get(`http://localhost:5001/api/services/${serviceId}`);
      setService(serviceResponse.data);

      // Fetch reviews for the specific service
      const reviewsResponse = await axios.get(`http://localhost:5001/api/reviews/${serviceId}`);
      setRatings(reviewsResponse.data);

      // Calculate the average rating for the specific service
      const avgRating =
        reviewsResponse.data.reduce((acc, review) => acc + review.rating, 0) /
        reviewsResponse.data.length || 0;
      setAverageRating(avgRating.toFixed(1));
    } catch (error) {
      console.error("Error fetching service details or reviews:", error);
    }
  };

  fetchServiceDetails();
}, [serviceId]);


  const handleDaySelection = (day) => {
    if (selectedDays.includes(day)) {
      // Remove day
      setSelectedDays((prevDays) => prevDays.filter((d) => d !== day));
      setDayTimes((prevTimes) => {
        const newTimes = { ...prevTimes };
        delete newTimes[day];
        return newTimes;
      });
    } else {
      // Add day with default times
      setSelectedDays((prevDays) => [...prevDays, day]);
      setDayTimes((prevTimes) => ({
        ...prevTimes,
        [day]: {
          startTime: "09:00",
          endTime: "17:00",
        },
      }));
    }
  };

  const handleTimeChange = (day, timeType, value) => {
    setDayTimes((prevTimes) => ({
      ...prevTimes,
      [day]: {
        ...prevTimes[day],
        [timeType]: value,
      },
    }));
  };

  const getTimeInHours = (timeStr) => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    return hours + minutes / 60;
  };

  const handleAddToFavorites = async () => {
    if (!user) {
      alert("You must be logged in to add favorites.");
      return;
    }

    try {
      await axios.post("http://localhost:5001/api/users/favorites", {
        userId: user._id,
        serviceId: serviceId,
      });
      alert("Service added to favorites!");
    } catch (error) {
      console.error("Error adding to favorites: ", error);
      alert("Failed to add service to favorites.");
    }
  };

  useEffect(() => {

    if (!serviceData || !price) return;

    const totalHours = selectedDays.reduce((sum, day) => {
      const times = dayTimes[day];
      if (times && times.startTime && times.endTime) {
        const start = getTimeInHours(times.startTime);
        const end = getTimeInHours(times.endTime);
        const hours = end - start;
        return sum + (hours > 0 ? hours : 0);
      } else {
        return sum;
      }
    }, 0);
    setSubtotal(totalHours * price);
  }, [selectedDays, dayTimes, pricePerHour]);

  const handlePaymentChange = (e) => {
    setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value });
  };

  const handlePay = () => {
    alert("Payment Successful!");
    // Reset form
    setSelectedDays([]);
    setDayTimes({});
    setSubtotal(0);
    setPaymentInfo({ cardNumber: "", expiryDate: "", cvv: "" });
  };

  if (!serviceData) {
    return <div>Loading...</div>;
  }

  const { title, username,/*providerFirstName, providerLastName,*/ location, languages, availableDays, startTime, endTime, resumeUrl, price } = serviceData;

 // Function to render stars based on the rating
const renderStars = (rating) => {
  if (rating === 0 || !rating) {
    return "☆☆☆☆☆"; // Display empty stars when there's no rating
  }

  const fullStars = Math.floor(rating); // Number of full stars
  const halfStar = rating % 1 >= 0.5 ? 1 : 0; // Half star logic
  const emptyStars = 5 - fullStars - halfStar; // Remaining empty stars

  // Generate the stars as a string
  return (
    <>
      {"★".repeat(fullStars)} {/* Full stars */}
      {halfStar ? "⯪" : ""}   {/* Half star if applicable */}
      {"☆".repeat(emptyStars)} {/* Empty stars */}
    </>
  );
};
  
  return (

    <div className="service-details">
      <div className="back-icon" onClick={() => navigate("/")}>
        <FontAwesomeIcon icon={faArrowLeft} /> Back to Home
      </div>

      <div className="profile-section">
        <div className="profile-header">
          <div className="profile-avatar">
            <span className="initials">
              {/* {providerFirstName.charAt(0)}
              {providerLastName.charAt(0)} */}
              {username.charAt(0)}
            </span>
          </div>
          <div className="profile-info">
            <h2>{title}</h2>
            <p className="service-type">
              <FontAwesomeIcon icon={faPerson} /> {username}{/*{providerFirstName} {providerLastName}*/}
            </p>
            <p className="location">
              <FontAwesomeIcon icon={faMapMarkerAlt} /> {location}
            </p>
          </div>
        </div>
        <a href={resumeUrl} download className="download-resume">
          <FontAwesomeIcon icon={faFileDownload} /> Download Resume
        </a>
        <button
          className="btn"
          onClick={() => setIsHeartSolid(!isHeartSolid)}
          style={{ marginLeft: "10px", background: "none", border: "none", cursor: "pointer" }}
        >
          <FontAwesomeIcon
            icon={isHeartSolid ? faHeart : faHeartOutline}
            style={{ color: isHeartSolid ? "red" : "gray", fontSize: "1.5rem" }}
          />
        </button>
        
        <div className="profile-details">
          <p>
            <FontAwesomeIcon icon={faLanguage} /> <strong>Languages:</strong> {languages.join(", ")}
          </p>
          <p>
            <FontAwesomeIcon icon={faCalendarAlt} /> <strong>Available Days:</strong>
          </p>
          <div className="days">
            {availableDays.map((day) => (
              <span key={day} className="day">
                {day}
              </span>
            ))}
          </div>
          <p>
            <FontAwesomeIcon icon={faClock} /> <strong>Start Time:</strong> {startTime}
          </p>
          <p>
            <FontAwesomeIcon icon={faClock} /> <strong>End Time:</strong> {endTime}
          </p>
          <p>
            <FontAwesomeIcon icon={faDollarSign} /> <strong>Price per Hour:</strong> ${price}
          </p>
        </div>
        {/* Ratings Section */}

        
        <section className="ratings-section">
        <p>Ratings & Reviews</p>
        <p>
          <strong>Average Rating:</strong> 
          <span className="stars"> 
            {renderStars(averageRating)} {/* Display the average rating stars */}
          </span>
        </p>
        
        {/* If there are no reviews, display a message */}
        {ratings.length === 0 && (
          <p>No ratings yet. Be the first to check back for updates!</p>
        )}
      </section>
        <Link to={'/review'} className="btn btn-primary mt-3">
              Write a Review
        </Link>
        <button className="btn btn-secondary mt-3" onClick={handleAddToFavorites}>
          Add to Favorites
        </button>
      </div>
      
      

      <div className="booking-form">
        <h3>Book Service</h3>
        <div className="form-group">
          <label>Select Days:</label>
          <div className="days-select">
            {availableDays.map((day) => (
              <label key={day} className="checkbox-label">
                <input type="checkbox" value={day} checked={selectedDays.includes(day)} onChange={() => handleDaySelection(day)} />
                <span className="custom-checkbox">
                  <FontAwesomeIcon icon={faCheckCircle} />
                </span>
                {day}
              </label>
            ))}
          </div>
        </div>

        {selectedDays.length > 0 && (
          <div className="time-inputs">
            {selectedDays.map((day) => (
              <div key={day} className="time-selection">
                <h4>{day}</h4>
                <div className="time-group">
                  <label>Start Time:</label>
                  <input type="time" value={dayTimes[day]?.startTime || ""} onChange={(e) => handleTimeChange(day, "startTime", e.target.value)} />
                </div>
                <div className="time-group">
                  <label>End Time:</label>
                  <input type="time" value={dayTimes[day]?.endTime || ""} onChange={(e) => handleTimeChange(day, "endTime", e.target.value)} />
                </div>
              </div>
            ))}
          </div>
        )}

        {subtotal > 0 && (
          <CheckoutForm subtotal={subtotal} user={user} service={service} dayTimes={dayTimes}/>
        )}
      </div>
    </div>
  );
}

export default ServiceDetailsPage;
