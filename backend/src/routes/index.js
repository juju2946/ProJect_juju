// const loginRoutes = require('../routes/auth.route');
const userRoutes = require('./user.routes');
const authRoutes = require('./auth.routes');
const bookingRoutes = require('./booking.routers');
const roomtypesRoutes = require('./roomtypes.routes');
const roomRoutes = require('./room.routes');

module.exports = [
  // ...loginRoutes,
  ...userRoutes,
  ...authRoutes,
  ...bookingRoutes,
  ...roomtypesRoutes,
  ...roomRoutes,
];