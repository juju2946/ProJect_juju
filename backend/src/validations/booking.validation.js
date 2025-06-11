const { z } = require('zod');

const createBookingSchema = z.object({
  Name: z.string().min(1, "Name is required"),
  starttime: z.string().datetime().transform(str => new Date(str)), // รับ string และแปลงเป็น Date
  endtime: z.string().datetime().transform(str => new Date(str)),   // รับ string และแปลงเป็น Date
  detail: z.string().optional(),
  userId: z.number().int().positive("userId must be a positive integer"),
  roomId: z.number().int().positive("roomId must be a positive integer"),
});

const updateBookingSchema = z.object({
  Name: z.string().min(1, "Name is required").optional(),
  starttime: z.string().datetime().transform(str => new Date(str)).optional(),
  endtime: z.string().datetime().transform(str => new Date(str)).optional(),
  detail: z.string().optional(),
  userId: z.number().int().positive("userId must be a positive integer").optional(),
  roomId: z.number().int().positive("roomId must be a positive integer").optional(),
});

module.exports = {
  createBookingSchema,
  updateBookingSchema
};