import "dotenv/config";
import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import { userService } from "../../services/user-service.js";

const strategyConfig = {
  clientID: process.env.CLIENT_ID_GOOGLE,
  clientSecret: process.env.CLIENT_SECRET_GOOGLE,
  callbackURL: "/users/oauth2/redirect/accounts.google.com",
  scope: ["profile", "email"],
  state: true,
};

const registerOrLogin = async (accessToken, refreshToken, profile, done) => {
  console.log(profile);
  try {
    const email = profile._json.email;
    if (!email) return done(null, false, { messages: "Email no encontrado" });
    const user = await userService.getByEmail(email);
    if (user) return done(null, user);
    const newUser = await userService.register({
      first_name: profile._json.given_name,
      last_name: profile._json.family_name,
      email,
      password: profile._json.sub,
      age: 0,
      isGoogle: true,
    });
    return done(null, newUser);
  } catch (error) {
    done(error);
  }
};

passport.use("google", new Strategy(strategyConfig, registerOrLogin));

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
