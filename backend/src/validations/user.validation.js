const { z } = require('zod');

const {Role} = require('@prisma/client')

const createUserSchema = z.object({
  firstName: z.string().min(1, "firstName is required"),
  lastName: z.string().min(1, "lastName is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(1,"Invalid password format"),
  role: z.nativeEnum(Role).optional(),
});

const updateUserSchema = z.object({
  firstName: z.string().min(1, "firstName is required").optional(),
  lastName: z.string().min(1, "lastName is required").optional(),
  email: z.string().email("Invalid email format").optional(),
  password: z.string().min(1,"Invalid password format").optional(),
  role: z.nativeEnum(Role).optional(),
});

module.exports = {
  createUserSchema,
  updateUserSchema
};
