import React, { useRef, useState, useContext } from 'react';
import emailjs from '@emailjs/browser';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams, useNavigate  } from 'react-router-dom';
import { UserContext } from './../UserContext';
import axios from 'axios';

const CancellationFormUI = () => {
  const { bookingId } = useParams();
  const form = useRef();
  const [message, setMessage] = useState('');
  const { user: contextUser } = useContext(UserContext);
  const navigate = useNavigate();

  const cancelBooking = async (e) => {
    e.preventDefault();

    if (!bookingId) {
      alert('Booking ID not found.');
      return;
    }

    try {
      // Send the cancellation email
      await emailjs.sendForm(
        'service_debeiyt',
        'template_3s3y15a',
        form.current,
        {
          publicKey: '9B_G4UOwgNSsEHZiJ',
        }
      );
      alert('Cancellation email sent successfully.');

      // Make API call to cancel the booking
      await axios.delete(`http://localhost:5001/api/bookings/${bookingId}`);
      alert('Booking cancelled successfully.');
      navigate('/bookings');
    } catch (error) {
      console.error('Error cancelling booking:', error);
      alert('Failed to cancel booking. Please try again later.');
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center">
      <div className="card shadow-sm" style={{ maxWidth: '700px', width: '100%' }}>
        <div className="card-body">
          <form ref={form} onSubmit={cancelBooking}>
            <div className="mb-4">
              <input type="hidden" name="username" value={contextUser.username} />
              <input type="hidden" name="email" value={contextUser.email} />
              <label htmlFor="cancellationReason" className="form-label">
                Describe your reason for cancelling
              </label>
              <textarea
                className="form-control"
                id="cancellationReason"
                name="cancellationReason"
                rows="4"
                aria-describedby="cancellationReasonHelp"
                required
              ></textarea>
              <div id="cancellationReasonHelp" className="form-text">
                Please provide details about why you're cancelling your booking.
              </div>
            </div>
            <div className="d-flex justify-content-center gap-2">
              <button type="button" className="btn btn-secondary" onClick={() => navigate('/bookings')}>
                Cancel
              </button>
              <button type="submit" className="btn btn-danger">
                End Booking
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CancellationFormUI;
