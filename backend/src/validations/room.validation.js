const { z } = require("zod");

// ✅ Schema สำหรับการสร้างห้อง
const createRoomSchema = z.object({
  Rname: z.string().min(1, "Room name is required"),
//   type: z.string().min(1, "Room type is required"),
  capacity: z.number().int("Capacity must be an integer").positive("Capacity must be greater than 0"),
  roomTypesId: z.number().int("RoomTypes ID must be an integer").positive("RoomTypes ID must be greater than 0"),
});

// ✅ Schema สำหรับการอัปเดตห้อง (optional ทุก field)
const updateRoomSchema = z.object({
  Rname: z.string().min(1, "Room name is required").optional(),
//   type: z.string().min(1, "Room type is required").optional(),
  capacity: z.number().int("Capacity must be an integer").positive("Capacity must be greater than 0").optional(),
  roomTypesId: z.number().int("RoomTypes ID must be an integer").positive("RoomTypes ID must be greater than 0").optional(),
});

// ✅ Schema สำหรับ path param (เช่น id)
const idParamSchema = z.object({
  id: z.string().regex(/^\d+$/, "Invalid ID format"),
});

// ✅ middleware สำหรับใช้งานกับ Hapi routes
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
  createRoomSchema,
  updateRoomSchema,
  idParamSchema,
  validateZod,
};
