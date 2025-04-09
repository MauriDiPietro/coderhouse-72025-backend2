import CustomError from "../utils/custom-error.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const checkAuthTokenCookies = (req, res, next) => {
  try {
    const tokenCookie = req.signedCookies.currentUser;
    if (!tokenCookie)
      throw new CustomError("No se ha encontrado el token", 401);
    const payload = jwt.verify(tokenCookie, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (error) {
    next(error);
  }
};

export const checkUserLogged = (req, res, next) => {
  try {
    const tokenCookie = req.signedCookies.currentUser;
    if (!tokenCookie) return next()
    jwt.verify(tokenCookie, process.env.JWT_SECRET);
    res.redirect("/users/current");
  } catch (error) {
    res.clearCookie("currentUser", { signed: true });
    next(error);
  }
};
