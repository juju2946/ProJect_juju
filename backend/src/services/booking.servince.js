const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


const getBookingById = (id) => {
    return prisma.booking.findUnique({ where: {id: Number(id)} });
};

const getAllBooking = async () => {
    return await prisma.booking.findMany();
};

const createBooking = async (data) => {
    // const hashedPassword = await bcrypt.hash(data.password,SALT_RPUNDS);

    const createBookingData = {
        name: data.name,
        starttime: data.starttime,
        endtime: data.endtime,
        detail: data.detail
    };

    const booking = await prisma.booking.create({ data: createBookingData });
    return {
        id: booking.id,
        name: booking.name,
        starttime: booking.starttime,
        endtime: booking.endtime,
        detail: booking.detail,
    };
};

const updateBooking = async (id, data) => {
    return await prisma.booking.update({ where: { id: Number(id) }, data});
};

const deleteBooking = async (id) => {
    return await prisma.booking.delete({ where: { id: Number(id) }});
};

module.exports = {
    getAllBooking,
    getBookingById,
    createBooking,
    deleteBooking,
    updateBooking,

}



 
