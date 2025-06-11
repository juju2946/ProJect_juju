const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getBookingById = (id) => {
  return prisma.booking.findUnique({ where: { id: Number(id) } });
};

const getAllBooking = async () => {
  return await prisma.booking.findMany();
};

const createBooking = async (data) => {
  const { Name, starttime, endtime, detail, userId, roomId } = data; // ใช้ Name ให้สอดคล้องกับ schema
  // ตรวจสอบว่า userId และ roomId มีอยู่จริง
  const userExists = await prisma.user.findUnique({ where: { id: Number(userId) } });
  const roomExists = await prisma.room.findUnique({ where: { id: Number(roomId) } });

  if (!userExists) throw new Error("User not found");
  if (!roomExists) throw new Error("Room not found");

  const createBookingData = {
    Name, // ใช้ Name แทน name
    starttime: new Date(starttime), // แปลง string เป็น Date
    endtime: new Date(endtime),     // แปลง string เป็น Date
    detail,
    userId: Number(userId),
    roomId: Number(roomId),
  };

  const booking = await prisma.booking.create({ data: createBookingData });
  return {
    id: booking.id,
    Name: booking.Name,
    starttime: booking.starttime,
    endtime: booking.endtime,
    detail: booking.detail,
    userId: booking.userId,
    roomId: booking.roomId,
  };
};

const updateBooking = async (id, data) => {
  const { Name, starttime, endtime, detail, userId, roomId } = data;
  const updateData = {
    Name,
    starttime: starttime ? new Date(starttime) : undefined,
    endtime: endtime ? new Date(endtime) : undefined,
    detail,
    userId,
    roomId,
  };
  return await prisma.booking.update({ where: { id: Number(id) }, data: updateData });
};

const deleteBooking = async (id) => {
  return await prisma.booking.delete({ where: { id: Number(id) } });
};

module.exports = {
  getAllBooking,
  getBookingById,
  createBooking,
  deleteBooking,
  updateBooking,
};