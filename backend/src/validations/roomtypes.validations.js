const { z } = require("zod");

//Create RoomTypes
const createRoomtypesSchema = z.object({
  name: z.string().min(1, "Room type name is required"),
  capacity: z.number().int("Capacity must be an integer").positive("Capacity must be greater than 0"),
});

// Update RoomTypes
const updateRoomtypesSchema = z.object({
  name: z.string().min(1, "Room type name is required").optional(),
  capacity: z.number().int("Capacity must be an integer").positive("Capacity must be greater than 0").optional(),
});

//ตรวจสอบ id ที่อยู่ใน path params
const idParamSchema = z.object({
  id: z.string().regex(/^\d+$/, "Invalid ID format"),
});

//Middleware ตรวจสอบข้อมูลด้วย Zod
const validateZod = (schema) => async (value, options) => {
  try {
    await schema.parseAsync(value);
  } catch (err) {
    throw new Error(
      `Validation error: ${err.errors.map((e) => e.message).join(", ")}`
    );
  }
};

module.exports = {
  createRoomtypesSchema,
  updateRoomtypesSchema,
  idParamSchema,
  validateZod,
};
