const bookingController = require("../controllers/booking.controller")

module.exports = [
    {
        method: 'POST',
        path: '/booking',
        options: bookingController.createBooking
    },
    {
        method: 'GET',
        path: '/booking/{id}',
        options: bookingController.getBookingById
    },
    {
        method: 'GET',
        path: '/bookings',
        options: bookingController.getAllBooking
    },
    {
        method: 'PUT',
        path: '/booking/update/{id}',
        options: bookingController.updateBooking
    },
    {
        method: 'DELETE',
        path: '/booking/delete/{id}',
        options: bookingController.deleteBooking
    }
];