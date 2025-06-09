const { z } = require("zod");
const { createRoomSchema, updateRoomSchema, idParamSchema, validateZod } = require("../validations/room.validation.js");
const roomService = require("../services/room.services.js");

//get All Room
const getAllRoom = {
  description: "Get list of all Room",
  tags: ["api", "room"],
  auth: false,
  handler: async (request, h) => {
    try {
      const room = await roomService.getAllRoom();
      return h.response(room).code(200);
    } catch (error) {
      console.error("Error fetching Room:", error);
      return h.response({ message: "Failed to fetch Room" }).code(500);
    }
  },
};
//Get By Id
const getRoomById = {
  description: "Get list of all Room",
  tags: ["api", "room"],
  auth: false,
  validate: {
    params:validateZod(idParamSchema)},
  handler: async (request, h) => {
    try {
        const {id} = request.params
      const room = await roomService.getRoomById(id);
      return h.response(room).code(200);
    } catch (error) {
      console.error("Error fetching Room:", error);
      return h.response({ message: "Failed to fetch Room" }).code(500);
    }
  },
};


//Create
const createRoom = {
  description: "Get list of all Room",
  tags: ["api", "room"],
  auth: false,
 validate: { payload:validateZod(createRoomSchema)},
  handler: async (request, h) => {
    try {
        const data = request.payload 
      const room = await roomService.createRoom(data);
      return h.response(room).code(200);
    } catch (error) {
      console.error("Error fetching Room:", error);
      return h.response({ message: "Failed to fetch Room" }).code(500);
    }
  },
};

//UpDate
const updateRoom = {
  description: "Get list of all Room",
  tags: ["api", "room"],
  auth: false,
 validate: { payload:validateZod(updateRoomSchema),
            params:validateZod(idParamSchema)},
  handler: async (request, h) => {
    try {
        const data = request.payload 
        const {id} = request.params
      const room = await roomService.updateRoom(id, data);
      return h.response(room).code(200);
    } catch (error) {
      console.error("Error fetching Room:", error);
      return h.response({ message: "Failed to fetch Room" }).code(500);
    }
  },
};

//Delete
const deleteRoom = {
  description: "Get list of all Room",
  tags: ["api", "room"],
  auth: false,
 validate: {params:validateZod(idParamSchema)},
  handler: async (request, h) => {
    try { 
        const {id} = request.params
      const room = await roomService.deleteRoom(id);
      return h.response(room).code(200);
    } catch (error) {
      console.error("Error fetching Room:", error);
      return h.response({ message: "Failed to fetch Room" }).code(500);
    }
  },
};

module.exports = {
    getAllRoom,
    getRoomById,
    createRoom,
    updateRoom,
    deleteRoom
   
};
