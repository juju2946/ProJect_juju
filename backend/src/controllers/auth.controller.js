const { signToken } = require("../utils/jwt");
const userService = require("../services/user.service");
const validateZod = require("../validations/validateZod");
const { loginSchema } = require("../validations/auth.validation");


const login = {
  description: "User login and get JWT token",
  tags: ["api", "auth"],
  auth: false,
  validate: {
    payload: validateZod(loginSchema),
  },
  handler: async (request, h) => {
    const { email, password } = request.payload;
    try {
      const userRecord = await userService.getUserByEmail(email);

      console.log('mail',email,'pass',password)
      if (!userRecord) {
        return h.response("Invalid credentials").code(401);
      }

      const valid = await userService.comparePassword(userRecord, password);
      if (!valid) {
        return h.response("Invalid credentials").code(401);
      }

      const token = signToken({ sub: userRecord.id, role: userRecord.role , firstName: userRecord.firstName,
        lastName: userRecord.lastName,email: userRecord.email,
       });

      // const safeUser = {
      //   id: userRecord.id,
      //   firstName: userRecord.firstName,
      //   lastName: userRecord.lastName,
      //   email: userRecord.email,
      //   role: userRecord.role,
      // };
      // return h.response({ token, user: safeUser }).code(200);
      return h.response({ token}).code(200);
    } catch (error) {
        console.error(err);
        return error(h, err.message);
    }
  }
};

module.exports = { login };
