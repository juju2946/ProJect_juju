const roomController = require("../controllers/room.controller");

module.exports = [
  {
    method: "POST",
    path: "/room/create",
    options: roomController.createRoom,
  },
  {
    method: "GET",
    path: "/room/{id}",
    options: roomController.getRoomById,
  },
  {
    method: "GET",
    path: "/Allroom",
    options: roomController.getAllRoom,
  },
  {
    method: "PUT",
    path: "/room/update/{id}",
    options: roomController.updateRoom,
  },
  {
    method: "DELETE",
    path: "/room/delete/{id}",
    options: roomController.deleteRoom,
  },
];
