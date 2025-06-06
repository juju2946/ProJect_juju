const { z } = require('zod');

const {Role} = require('@prisma/client');

const createBookingSchema = z.object({
    name: z.string().min(1, "Name is require"),
});

const updateBookingSchema = z.object({
    name: z.string().min(1, "Name is require").optional(),
});
module.exports ={
    createBookingSchema,
    updateBookingSchema
}