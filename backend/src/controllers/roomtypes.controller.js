const { z } = require("zod");

const { createRoomtypesSchema, updateRoomtypesSchema, idParamSchema, validateZod } = require("../validations/roomtypes.validations");
// const { createParams } = require("@prisma/client/runtime/library");
const roomtypesService = require("../services/roomtypes.services");
// Get All Roomtypes
const getAllRoomtypes = {
  description: "Get list of all Roomtyprs",
  tags: ["api", "roomtypes"],
  auth: false,
  handler: async (request, h) => {
    try {
      const roomtypes = await roomtypesService.getAllRoomtypes();
      return h.response(roomtypes).code(200);
    } catch (error) {
      console.error("Error fetching Roomtypes:", error);
      return h.response({ message: "Failed to fetch Roomtypes" }).code(500);
    }
  },
};

const getRoomtypesById = {
  description: "Get list of all Roomtyprs",
  tags: ["api", "roomtypes"],
  auth: false,
  validate: {
    params:validateZod(idParamSchema)},
  handler: async (request, h) => {
    try {
        const {id} = request.params
      const roomtypes = await roomtypesService.getRoomtypesById(id);
      return h.response(roomtypes).code(200);
    } catch (error) {
      console.error("Error fetching Roomtypes:", error);
      return h.response({ message: "Failed to fetch Roomtypes" }).code(500);
    }
  },
};
//Create
const createRoomtypes = {
  description: "Get list of all Roomtyprs",
  tags: ["api", "roomtypes"],
  auth: false,
 validate: { payload:validateZod(createRoomtypesSchema)},
  handler: async (request, h) => {
    try {
        const data = request.payload 
      const roomtypes = await roomtypesService.createRoomtypes(data);
      return h.response(roomtypes).code(200);
    } catch (error) {
      console.error("Error fetching Roomtypes:", error);
      return h.response({ message: "Failed to fetch Roomtypes" }).code(500);
    }
  },
};
//UpDate
const updateRoomtypes = {
  description: "Get list of all Roomtyprs",
  tags: ["api", "roomtypes"],
  auth: false,
 validate: { payload:validateZod(updateRoomtypesSchema),
            params:validateZod(idParamSchema)},
  handler: async (request, h) => {
    try {
        const data = request.payload 
        const {id} = request.params
      const roomtypes = await roomtypesService.updateRoomtypes(id, data);
      return h.response(roomtypes).code(200);
    } catch (error) {
      console.error("Error fetching Roomtypes:", error);
      return h.response({ message: "Failed to fetch Roomtypes" }).code(500);
    }
  },
};

//UpDate
const deleteRoomtypes = {
  description: "Get list of all Roomtyprs",
  tags: ["api", "roomtypes"],
  auth: false,
 validate: {params:validateZod(idParamSchema)},
  handler: async (request, h) => {
    try { 
        const {id} = request.params
      const roomtypes = await roomtypesService.deleteRoomtypes(id);
      return h.response(roomtypes).code(200);
    } catch (error) {
      console.error("Error fetching Roomtypes:", error);
      return h.response({ message: "Failed to fetch Roomtypes" }).code(500);
    }
  },
};

module.exports = {
    getAllRoomtypes,
    getRoomtypesById,
    createRoomtypes,
    updateRoomtypes,
    deleteRoomtypes
};
