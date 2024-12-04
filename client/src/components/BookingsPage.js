// BookingHistoryPage.js
import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../UserContext';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faClock, faDollarSign, faInfoCircle, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';


const BookingHistoryPage = () => {

    const dummyBookings = [
      {
        _id: '1',
        serviceProvider: {
          _id: 'sp1',
          serviceName: 'Home Cleaning',
          location: '123 Main Street, Cityville',
        },
        date: '2024-12-01T10:30:00Z',
        timeSlot: '10:30 AM - 12:30 PM',
        paymentInfo: {
          amount: 50,
          paymentStatus: 'Paid',
        },
      },
      {
        _id: '2',
        serviceProvider: {
          _id: 'sp2',
          serviceName: 'Gardening Service',
          location: '45 Greenway Blvd, Gardentown',
        },
        date: '2024-12-02T15:00:00Z',
        timeSlot: '3:00 PM - 5:00 PM',
        paymentInfo: {
          amount: 30,
          paymentStatus: 'Pending',
        },
      },
      {
        _id: '3',
        serviceProvider: {
          _id: 'sp3',
          serviceName: 'Plumbing Repair',
          location: '78 Pipe St, Watercity',
        },
        date: '2024-12-03T09:00:00Z',
        timeSlot: '9:00 AM - 10:00 AM',
        paymentInfo: {
          amount: 100,
          paymentStatus: 'Paid',
        },
      },
    ];

  const [bookings, setBookings] = useState(dummyBookings);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchBookings = async () => {
      if (user && user.id) {
        try {
          console.log('Fetching bookings for user:', user.id);
          const response = await axios.get(`http://localhost:5001/api/bookings/user/${user.id}`);
          console.log('Bookings response:', response.data);
          setBookings(response.data);
          
        } catch (error) {
          console.error('Error fetching bookings:', error);
          setError(error.response?.data?.message || 'Failed to fetch bookings');
        } finally {
          setLoading(false);
        }
      } else {
        console.log('No user found in context');
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  const handleCancelBooking = async (bookingId) => {
    try {
      // await axios.delete(`http://localhost:5001/api/bookings/${bookingId}`);
      setBookings(bookings.filter(booking => booking._id !== bookingId));
    } catch (error) {
      console.error('Error cancelling booking:', error);
      setError('Failed to cancel booking. Please try again later.');
    }
  };

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-center py-4 text-red-500">Error: {error}</div>;

  return (
    <div className="booking-history-page">
      <header className="bg-gray-100 py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Booking History</h1>
          <p className="text-gray-600 mt-2">View and manage your service bookings</p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {bookings.length === 0 ? (
          <div className="text-center text-gray-600">
            <p>No bookings found.</p>
            <p className="mt-2">User ID: {user.id}</p>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {bookings.map((booking) => (
              <div key={booking._id} className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-2">
                    {booking.serviceName || 'Unknown Service'}
                  </h2>
                  <div className="text-gray-600 space-y-2">
                    <p>
                      <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                      Date: {new Date(booking.date).toLocaleDateString()}
                    </p>
                    {/* <p>
                      <FontAwesomeIcon icon={faClock} className="mr-2" />
                      Time: {booking.timeSlot}
                    </p> */}
                    {booking.timeSlot.map((slot, index) => (
                      <div key={index}>
                        <p>
                          <FontAwesomeIcon icon={faClock} className="mr-2" />
                          Day: {slot.day}
                        </p>
                        <p>
                          Time: {slot.startTime} - {slot.endTime}
                        </p>
                      </div>
                    ))}
                    <p>
                      <FontAwesomeIcon icon={faDollarSign} className="mr-2" />
                      Amount: ${booking.amount}
                    </p>
                    <p>
                      <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
                      Status: {booking.paymentInfo.paymentStatus}
                    </p>
                    <p>
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                      Location: {booking.location}
                    </p>
                  </div>
                </div>
                <div className="bg-gray-50 px-6 py-4 flex justify-between items-center">
                  <Link 
                    to={`/services/${booking.serviceProvider}`} 
                    className="text-blue-500 hover:underline"
                  >
                    View Service Provider
                  </Link>
                  <button
                    onClick={() => handleCancelBooking(booking._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingHistoryPage;