import passportLocal from "passport-local";
import { PassportStatic } from "passport";
import User, { UserT } from "./schemas/userS";
import { UserDAO } from "./daos/UserDAO";

const LocalStrategy = passportLocal.Strategy;
const bcrypt = require("bcryptjs");
const userDAO: UserDAO = new UserDAO();

function initialize(passport: PassportStatic) {
  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      async (email: string, password: string, done) => {
        const user = await userDAO.getUserByEmail(email);

        if (user == null) {
          return done(null, false, {
            message: "Usuario y/o contraseña incorrectos",
          });
        }

        try {
          if (await bcrypt.compare(password, user.password)) {
            return done(null, user);
          } else {
            return done(null, false, {
              message: "Usuario y/o contraseña incorrectos",
            });
          }
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.serializeUser((user: UserT, done) => {
    done(null, user._id);
  });
  passport.deserializeUser(async (_id: string, done) => {
    return done(null, await userDAO.getUserNoPwd(_id));
  });
}

module.exports = initialize;
