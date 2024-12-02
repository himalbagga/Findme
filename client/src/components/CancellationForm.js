import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext } from 'react';
import { UserContext } from './../UserContext';

const CancellationFormUI = () => {
  const form = useRef();
  const [userId, setUserId] = useState('');
  const [bookingId, setBookingId] = useState('');
  const [message, setMessage] = useState('');
  const { user: contextUser } = useContext(UserContext);
  console.log(contextUser.email);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_debeiyt', 'template_3s3y15a', form.current, {
        publicKey: '9B_G4UOwgNSsEHZiJ',
      })
      .then(
        () => {
          console.log('SUCCESS!');
          alert("Cancellation Email sent successfully")
        },
        (error) => {
          console.log('FAILED...', error.text);
          alert("Email failed...",error.text)
        },
      );
  };

  const cancelBooking = async (e) => {
    e.preventDefault();

    try {
      
      const response = await fetch('/api/users/bookings/cancel', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, bookingId }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Booking cancelled successfully.');
        sendEmail(e);
      } else {
        setMessage(data.message || 'Failed to cancel booking.');
      }
    } catch (error) {
      console.error('Error cancelling booking: ', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center">
      <div className="card shadow-sm" style={{maxWidth: '700px', width: '100%'}}>
        <div className="card-body">
          <form ref={form} onSubmit={cancelBooking}>
            <div className="mb-4">
              <input type="hidden" name="username" value={contextUser.username} />
              <input type="hidden" name="email" value={contextUser.email}/>
              <label htmlFor="cancellationReason" className="form-label">
                Describe your reason for cancelling
              </label>
              <textarea
                className="form-control"
                id="cancellationReason"
                rows="4"
                aria-describedby="cancellationReasonHelp"
              ></textarea>
              <div id="cancellationReasonHelp" className="form-text">
                Please provide details about why you're cancelling your booking.
              </div>
            </div>
            <div className="d-flex justify-content-center gap-2">
              <button type="button" className="btn btn-secondary">
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

