const { createUserSchema, updateUserSchema } = require('../validations/user.validation');
const { z } = require('zod');
const userService = require('../services/user.service'); // Import the user service

const idParamSchema = z.object({
  id: z.string().regex(/^\d+$/, "Invalid ID format"),
});

// Custom Zod validator for payload validation
const validateZod = (schema) => async (value, options) => {
  try {
    await schema.parseAsync(value); // Validate with Zod
  } catch (err) {
    throw new Error(`Validation error: ${err.errors.map(e => e.message).join(', ')}`);
  }
};

// Get all users
const getAllUsers = {
  description: 'Get list of all users',
  tags: ['api', 'user'],
  auth: false,
  handler: async (request, h) => {
    try {
      const users = await userService.getAllUsers();
      return h.response(users).code(200);
    } catch (error) {
      console.error('Error fetching users:', error);
      return h.response({ message: 'Failed to fetch users' }).code(500);
    }
  }
};

// Get user by ID
const getUserById = {
  description: 'Get user by ID',
  tags: ['api', 'user'],
  auth: false,
  validate: {
    params: validateZod(idParamSchema),
  },
  handler: async (request, h) => {
    const { id } = request.params;
    try {
      const user = await userService.getUserById(Number(id));

      if (!user) {
        return h.response({ message: 'User not found' }).code(404);
      }

      return h.response(user).code(200);
    } catch (error) {
      console.error('Error fetching user:', error);
      return h.response({ message: 'Failed to fetch user' }).code(500);
    }
  }
};

// Create user
const createUser = {
  description: 'Create new user',
  tags: ['api', 'user'],
  auth: false,
  validate: {
    payload: validateZod(createUserSchema),
  },
  handler: async (request, h) => {
    try {
      const newUser = await userService.createUser(request.payload);
      return h.response(newUser).code(201);
      
    } catch (error) {
      console.error('Error creating user:', error);
      return h.response({ message: 'Failed to create user' }).code(500);
    }
  }
};

const updateUser ={
  description: 'Update User by ID',
  tags:['api','user'],
  auth: false,
  validate: {
    params: validateZod(idParamSchema),
    payload: validateZod(updateUserSchema)
  },
  handler: async (request, h) => {
    const { id } = request.params
    try {
      const updateUser = await userService.updateUser(Number(id), request.payload)
      return h.response(updateUser).code(201) 
    } catch (error) {
      console.error('Error updating user:', error);
      return h.response({ message: 'Failed to update user' }).code(500);
      //ถ้ามี Error จะแสดงข้อความ Failed to update user ตอบกลับมา
    }
  } 
};

// Delete user
const deleteUser = {
  description: 'Delete user by ID',
  tags: ['api', 'user'],
  auth: false,
  validate: {
    params: validateZod(idParamSchema),
  },
  handler: async (request, h) => {
    const { id } = request.params;
    try {
      const user = await userService.getUserById(Number(id));

      if (!user) {
        return h.response({ message: 'User not found' }).code(404);
      }

      await userService.deleteUser(Number(id));

      return h.response({ message: 'User deleted successfully' }).code(200);
    } catch (error) {
      console.error('Error deleting user:', error);
      return h.response({ message: 'Failed to delete user' }).code(500);
    }
  }
};

//   Create pets
const createPet = {
    description: "Create new pet",
    tags: ["api", "pets"],
    auth: false,
    plugins: {
        'hapi-swagger': {
            consumes: ['multipart/form-data'],
        },
    },
    payload: {
        maxBytes: 10 * 1024 * 1024, // จำกัดขนาดไฟล์ 10MB
        parse: true,
        output: 'file', // รับไฟล์
        multipart: true, // เปิดใช้งาน multipart
    },
    handler: async (request, h) => {
        try {
            const { payload } = request;
            const file = payload.image_file; // ชื่อ field ที่ส่งไฟล์
            const newPet = await petService.createPet(payload, file);
            return h.response(newPet).code(201);
        } catch (error) {
            console.error("Error creating pet:", error);
            return h.response({ message: error.message || "Failed to create pet" }).code(500);
        }
    },
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
