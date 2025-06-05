// const loginRoutes = require('../routes/auth.route');
const userRoutes = require('./user.routes');
const authRoutes = require('./auth.routes');

module.exports = [
  // ...loginRoutes,
  ...userRoutes,
  ...authRoutes,
];