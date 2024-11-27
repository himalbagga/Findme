import { Link } from 'react-router-dom';
import '../styles/SearchResultsPage.css';
import { useContext } from 'react';
import { UserContext } from './../UserContext';

function BookingsPage() {
    const { user } = useContext(UserContext);

    //code for fuctionality 



return (
    <div className="search-results-page">
      <header>
        <h1>Find Me</h1>
        <p>Explore thousands of services available near you!</p>
      </header>

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

      <div className="results-container">
          <p>You currently have no bookings</p>
      </div>
    </div>
  );
}
export default BookingsPage;