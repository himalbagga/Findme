import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import 'bootstrap/dist/css/bootstrap.min.css';

const CancellationFormUI = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_debeiyt', 'template_3s3y15a', form.current, {
        publicKey: '9B_G4UOwgNSsEHZiJ',
      })
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center">
      <div className="card shadow-sm" style={{maxWidth: '700px', width: '100%'}}>
        <div className="card-body">
          <form ref={form} onSubmit={sendEmail}>
            <div className="mb-4">
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
              <button type="button" className="btn btn-danger">
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

