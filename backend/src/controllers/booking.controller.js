const { z } = require("zod");
const { createBookingSchema, updateBookingSchema } = require("../validations/booking.validation");
const idParamSchema = z.object({
  id: z.string().regex(/^\d+$/, "Invalid ID format"),
});
const bookingService = require('../services/booking.service');

const validateZod = (schema) => async (value, options) => {
  try {
    await schema.parseAsync(value);
  } catch (err) {
    throw new Error(`Validation error: ${err.errors.map((e) => e.message).join(", ")}`);
  }
};

// Get All Booking
const getAllBooking = {
  description: "Get list of all Bookings",
  tags: ["api", "booking"],
  auth: false,
  handler: async (request, h) => {
    try {
      const bookings = await bookingService.getAllBooking();
      return h.response(bookings).code(200);
    } catch (error) {
      console.error("Error fetching Booking:", error);
      return h.response({ message: "Failed to fetch Booking" }).code(500);
    }
  },
};

// Get Booking By ID
const getBookingById = {
  description: "Get Booking by ID",
  tags: ["api", "booking"],
  auth: false,
  validate: {
    params: validateZod(idParamSchema),
  },
  handler: async (request, h) => {
    const { id } = request.params;
    try {
      const booking = await bookingService.getBookingById(Number(id));
      if (!booking) {
        return h.response({ message: "Booking not found" }).code(404);
      }
      return h.response(booking).code(200);
    } catch (error) {
      console.error("Error fetching booking", error);
      return h.response({ message: "Failed to fetch booking" }).code(500);
    }
  },
};

// Create Booking
const createBooking = {
  description: "Create new Booking",
  tags: ["api", "booking"],
  auth: false,
  validate: {
    payload: validateZod(createBookingSchema),
  },
  handler: async (request, h) => {
    try {
      const newBooking = await bookingService.createBooking(request.payload);
      return h.response(newBooking).code(201);
    } catch (error) {
      console.error("Error creating booking", error);
      return h.response({ message: error.message || "Failed to create booking" }).code(500);
    }
  },
};

// Update Booking
const updateBooking = {
  description: "Update Booking by ID",
  tags: ["api", "booking"],
  auth: false,
  validate: {
    params: validateZod(idParamSchema),
    payload: validateZod(updateBookingSchema),
  },
  handler: async (request, h) => {
    const { id } = request.params;
    try {
      const updatedBooking = await bookingService.updateBooking(Number(id), request.payload);
      return h.response(updatedBooking).code(200); // เปลี่ยน code เป็น 200 สำหรับ update
    } catch (error) {
      console.error("Error updating booking:", error);
      return h.response({ message: "Failed to update booking" }).code(500);
    }
  },
};

// Delete Booking
const deleteBooking = {
  description: "Delete Booking by ID",
  tags: ["api", "booking"],
  auth: false,
  validate: {
    params: validateZod(idParamSchema),
  },
  handler: async (request, h) => {
    const { id } = request.params;
    try {
      const booking = await bookingService.getBookingById(Number(id));
      if (!booking) {
        return h.response({ message: 'Booking not found' }).code(404);
      }

      await bookingService.deleteBooking(Number(id));
      return h.response({ message: 'Booking deleted successfully' }).code(200);
    } catch (error) {
      console.error('Error deleting booking:', error);
      return h.response({ message: 'Failed to delete booking' }).code(500);
    }
  }
};

module.exports = {
  getAllBooking,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking
};