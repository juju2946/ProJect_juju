const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllRoom = async () => {
    return await prisma.room.findMany();
};

const getRoomById = async (id) => {
    return await prisma.room.findUnique({ where: {id: Number(id)} });
};

const createRoom = async (data) => {
    return await prisma.room.create({data});
};

const updateRoom = async (id, data) => {
    return await prisma.room.update({ where: { id: Number(id)}, data});
};

const deleteRoom = async (id) => {
    return await prisma.room.delete({ where: {id: Number(id) }});
};
module.exports = {
    getAllRoom,
    getRoomById,
    createRoom,
    updateRoom,
    deleteRoom
};