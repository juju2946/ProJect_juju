const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

const getUserByEmail = (email) => {
  return prisma.user.findUnique({ where: {email} });
};

const comparePassword = async (user, plainPassword) => {
  return bcrypt.compare(plainPassword, user.password);
};

const getAllUsers = async () => {
  return await prisma.user.findMany();
};

const getUserById = async (id) => {
  return await prisma.user.findUnique({ where: { id: Number(id) } });
};

// const createUser = async (data) => {
//   return await prisma.user.create({ data });
// };

const createUser = async (data) => {
  const hashedPassword = await bcrypt.hash(data.password,SALT_ROUNDS);

  const createData = {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    password: hashedPassword,
    role: data.role || "USER",
  };

  const user = await prisma.user.create({ data: createData });
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  };
};

const updateUser = async (id, data) => {
  return await prisma.user.update({ where: { id: Number(id) }, data });
};

const deleteUser = async (id) => {
  return await prisma.user.delete({ where: { id: Number(id) } });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail,
  comparePassword,
};
