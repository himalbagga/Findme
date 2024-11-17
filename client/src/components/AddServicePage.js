// AddServicePage Component for adding a new service
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddServicePage.css";

function AddServicePage() {
    const [serviceName, setServiceName] = useState("");
    const [location, setLocation] = useState("");
    const [languages, setLanguages] = useState("");
    const [price, setPrice] = useState("");
    const [availableDays, setAvailableDays] = useState([]);
    const [startTime, setStartTime] = useState("09:00 AM");
    const [endTime, setEndTime] = useState("05:00 PM");
    const navigate = useNavigate();

    const handleDayChange = (day) => {
        setAvailableDays((prevDays) =>
            prevDays.includes(day)
                ? prevDays.filter((d) => d !== day)
                : [...prevDays, day]
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newService = {
            serviceName,
            location,
            languages: languages.split(","),
            price: parseFloat(price),
            availableDays,
            startTime,
            endTime,
        };

        navigate('/profile');
    };

    return (
        <div className="add-service-page">
            <header>
                <h1>Add a New Service</h1>
            </header>
            <form onSubmit={handleSubmit} className="add-service-form">
                <label>
                    Service Name:
                    <input
                        type="text"
                        value={serviceName}
                        onChange={(e) => setServiceName(e.target.value)}
                    />
                </label>
                <label>
                    Location:
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Languages (comma-separated):
                    <input
                        type="text"
                        value={languages}
                        onChange={(e) => setLanguages(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Rate ($/hour):
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </label>
                <div className="available-days">
                    <p>Available Days:</p>
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                        <label key={day}>
                            <input
                                type="checkbox"
                                checked={availableDays.includes(day)}
                                onChange={() => handleDayChange(day)}
                            />
                            {day}
                        </label>
                    ))}
                </div>
                <label>
                    Start Time:
                    <input
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        required
                    />
                </label>
                <label>
                    End Time:
                    <input
                        type="time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        required
                    />
                </label>
                <div className="form-buttons">
                    <button type="button" className="cancel-button" onClick={() => navigate('/')}>Cancel</button>
                    <button type="submit" className="submit-button">Create Service</button>
                </div>
            </form>
        </div>
    );
}

export default AddServicePage;