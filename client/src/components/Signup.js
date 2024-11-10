import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const Signup = () => {
  const form = useRef();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobileNumber: "",
    userType: "",
    serviceType: "",
    serviceName: "",
    location: "",
    resume: null,
    availableDays: [],
    startTime: "",
    endTime: "",
    price: "",
    languages: [],
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.confirmPassword !== formData.password) newErrors.confirmPassword = "Passwords do not match";
    if (!formData.mobileNumber) newErrors.mobileNumber = "Mobile number is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, resume: e.target.files[0] });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      availableDays: checked
        ? [...prev.availableDays, value]
        : prev.availableDays.filter((day) => day !== value),
    }));
  };

  const sendEmail = (e) => {
    e.preventDefault();
    if (validateForm()) {
      emailjs
        .sendForm("service_debeiyt", "template_4wzuql7", form.current, {
          publicKey: "9B_G4UOwgNSsEHZiJ",
        })
        .then(
          () => {
            alert("Email sent successfully!");
            e.target.reset();
            setFormData({
              username: "",
              email: "",
              password: "",
              confirmPassword: "",
            });
            setErrors({});
          },
          (error) => alert("Failed to send email.")
        );
    }
  };

  return (
    <div style={styles.container}>
      <h3>Sign Up</h3>
      <form ref={form} onSubmit={sendEmail} className="signup-form">
        <div style={styles.formGroup}>
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            style={styles.input}
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p style={styles.error}>{errors.email}</p>}
        </div>

        <div style={styles.formGroup}>
          <label>Mobile Number</label>
          <input
            type="tel"
            name="mobileNumber"
            placeholder="Enter mobile number"
            style={styles.input}
            value={formData.mobileNumber}
            onChange={handleChange}
            pattern="[\d\+\-\(\)\s]*"
            title="Only digits and symbols (+, -, (, )) are allowed."
          />
          {errors.mobileNumber && <p style={styles.error}>{errors.mobileNumber}</p>}
        </div>

        {/* User Type Radio Buttons */}
        <div style={styles.formGroup}>
          <label>User Type</label>
          <div style={styles.radioGroup}>
            <label>
              <input
                type="radio"
                name="userType"
                value="ServiceProvider"
                onChange={handleChange}
                checked={formData.userType === "ServiceProvider"}
              />
              Service Provider
            </label>
            <label>
              <input
                type="radio"
                name="userType"
                value="ServiceSeeker"
                onChange={handleChange}
                checked={formData.userType === "ServiceSeeker"}
              />
              Service Seeker
            </label>
          </div>
        </div>

        {formData.userType === "ServiceProvider" && (
          <>
            <div style={styles.formGroup}>
              <label>Service Type</label>
              <select
                name="serviceType"
                style={styles.input}
                value={formData.serviceType}
                onChange={handleChange}
              >
                <option value="">Select Service Type</option>
                <option value="Full-time worker">Full-time worker</option>
                <option value="Part-time worker">Part-time worker</option>
                <option value="Freelancer">Freelancer</option>
                <option value="Small Business">Small Business</option>
                <option value="Company Administrator">Company Administrator</option>
                <option value="Student">Student</option>
                <option value="Volunteer">Volunteer</option>
              </select>
            </div>

            <div style={styles.formGroup}>
              <label>Service Name</label>
              <input
                type="text"
                name="serviceName"
                placeholder="Enter service name"
                style={styles.input}
                value={formData.serviceName}
                onChange={handleChange}
              />
            </div>

            <div style={styles.formGroup}>
              <label>Location</label>
              <select
                name="location"
                style={styles.input}
                value={formData.location}
                onChange={handleChange}
              >
                <option value="">Select Location</option>
                <option value="Toronto">Toronto</option>
                <option value="Vancouver">Vancouver</option>
                <option value="Montreal">Montreal</option>
                <option value="Calgary">Calgary</option>
                <option value="Edmonton">Edmonton</option>
              </select>
            </div>

            <div style={styles.formGroup}>
              <label>Upload Resume</label>
              <input
                type="file"
                name="resume"
                style={styles.input}
                onChange={handleFileChange}
              />
            </div>

            {/* Available Days */}
            <div style={styles.formGroup}>
              <label>Available Days</label>
              <div style={styles.checkboxGroup}>
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                  <label key={day}>
                    <input
                      type="checkbox"
                      name="availableDays"
                      value={day}
                      checked={formData.availableDays.includes(day)}
                      onChange={handleCheckboxChange}
                    />
                    {day}
                  </label>
                ))}
              </div>
            </div>

            {/* Time Range Field */}
            <div style={styles.formGroup}>
              <label>Available Time</label>
              <div style={{ display: "flex", gap: "10px" }}>
                <input
                  type="time"
                  name="startTime"
                  style={styles.input}
                  value={formData.startTime}
                  onChange={handleChange}
                  placeholder="From"
                />
                <input
                  type="time"
                  name="endTime"
                  style={styles.input}
                  value={formData.endTime}
                  onChange={handleChange}
                  placeholder="To"
                />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label>Price (CAD)</label>
              <input
                type="number"
                name="price"
                placeholder="Enter price in CAD"
                style={styles.input}
                value={formData.price}
                onChange={handleChange}
              />
            </div>

            <div style={styles.formGroup}>
              <label>Languages</label>
              <select
                name="languages"
                style={styles.input}
                value={formData.languages}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    languages: [...e.target.selectedOptions].map((o) => o.value),
                  })
                }
                multiple
              >
                <option value="English">English</option>
                <option value="French">French</option>
              </select>
            </div>
          </>
        )}

        <button type="submit" value="Send" style={styles.button}>
          Sign Up
        </button>
        <p style={styles.loginText}>
          Already have a profile? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
};

// Updated styles for wider form and input fields
const styles = {
  container: {
    width: "100%",
    maxWidth: "500px",
    margin: "0 auto",
    padding: "30px",
    textAlign: "center",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
  },
  formGroup: {
    marginBottom: "20px",
    textAlign: "left",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginTop: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  radioGroup: {
    display: "flex",
    gap: "15px",
  },
  checkboxGroup: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
  },
  error: {
    color: "red",
    fontSize: "14px",
  },
  loginText: {
    marginTop: "20px",
    fontSize: "14px",
  },
};

export default Signup;
