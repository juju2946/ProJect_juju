const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllRoomtypes = async () => {
    return await prisma.roomTypes.findMany();
};

const getRoomtypesById = async (id) => {
    return await prisma.roomTypes.findUnique({ where: {id: Number(id)} });
};

const createRoomtypes = async (data) => {
    return await prisma.roomTypes.create({data});
};

const updateRoomtypes = async (id, data) => {
    return await prisma.roomTypes.update({ where: { id: Number(id)}, data});
};

const deleteRoomtypes = async (id) => {
    return await prisma.roomTypes.delete({ where: {id: Number(id) }});
}
module.exports = {
    getAllRoomtypes,
    getRoomtypesById,
    createRoomtypes,
    updateRoomtypes,
    deleteRoomtypes

}