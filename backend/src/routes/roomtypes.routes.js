const roomtypesController = require("../controllers/roomtypes.controller")

module.exports = [
    {
        method: 'POST',
        path: '/roomtypes/create',
        options: roomtypesController.createRoomtypes
    },
    {
        method: 'GET',
        path: '/roomtypes/{id}',
        options: roomtypesController.getRoomtypesById
    },
    {
        method: 'GET',
        path: '/Allroomtypes',
        options: roomtypesController.getAllRoomtypes
    },
    {
        method: 'PUT',
        path: '/roomtypes/update/{id}',
        options: roomtypesController.updateRoomtypes
    },
    {
        method: 'DELETE',
        path: '/roomtypes/delete/{id}',
        options: roomtypesController.deleteRoomtypes
    }
];