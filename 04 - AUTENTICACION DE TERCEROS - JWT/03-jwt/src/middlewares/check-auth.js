import jwt from "jsonwebtoken";
import 'dotenv/config'
import CustomError from "../utils/custom-error.js";

export const checkAuth = (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    // const token = req.cookies.token;
    if (!authHeader) throw new CustomError("No se ha enviado el token", 401);
    // Bearer asasdasodjasoidj3209234u230dsnadjknasdbfa
    const token = authHeader.split(" ")[1];
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    next(error);
  }
};
