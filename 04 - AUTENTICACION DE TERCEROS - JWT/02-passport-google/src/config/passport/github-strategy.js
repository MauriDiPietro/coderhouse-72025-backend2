import passport from "passport";
import { Strategy } from "passport-github2";
import "dotenv/config";
import { userService } from "../../services/user-service.js";

const strategyConfig = {
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: "http://localhost:8080/users/profile-github",
};

const registerOrLogin = async (accessToken, refreshToken, profile, done) => {
  console.log(profile);
  try {
    const email =
      profile._json.email !== null
        ? profile._json.email
        : profile._json.notification_email;
    const name = profile._json.name;
    if (!email) return done(null, false, { messages: "Email no encontrado" });
    const user = await userService.getByEmail(email);
    if (user) return done(null, user);
    const newUser = await userService.register({
      first_name: profile._json.name.split(" ")[0],
      last_name:
        name.split(" ").length > 2
          ? `${name.split(" ")[1]} ${name.split(" ")[2]}`
          : name.split(" ")[1],
      email,
      password: profile._json.node_id,
      age: 0,
      isGithub: true,
    });
    return done(null, newUser);
  } catch (error) {
    done(error);
  }
};

passport.use("github", new Strategy(strategyConfig, registerOrLogin));

passport.serializeUser((user, done) => {
  try {
    done(null, user._id); //--> req.session.passport.user
  } catch (error) {
    done(error);
  }
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userService.getById(id);
    return done(null, user);
  } catch (error) {
    done(error);
  }
});
