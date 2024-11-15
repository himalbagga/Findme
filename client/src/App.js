import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import Router components
import Signup from "./components/Signup";
import HomePage from "./components/Homepage1";
import SearchResultsPage from "./components/SearchResultsPage";
import Login from "./components/LogIn";
import ServiceDetailsPage from "./components/ServiceDetailsPage";
import UserProfile from "./components/UserProfile";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/search-results" element={<SearchResultsPage />} />
        <Route exact path="/services/:serviceId" element={<ServiceDetailsPage />} />
        <Route exact path="**" element={<HomePage />} />
        <Route exact path="/profile" element={<UserProfile />} />
      </Routes>
    </Router>
  );
};

export default App;
