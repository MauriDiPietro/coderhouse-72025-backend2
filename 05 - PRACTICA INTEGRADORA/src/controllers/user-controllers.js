import { userServices } from "../services/user-services.js";

class UserControllers {
  constructor(service) {
    this.service = service;
  }

  register = async (req, res, next) => {
    try {
      const response = await this.service.register(req.body);
      res.status(201).json({
        status: "success",
        message: "Usuario creado",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  };

  login = async (req, res, next)=>{
    try {
        const { email, password } = req.body;
        const user = await this.service.login(email, password);
        const token = this.service.generateToken(user);
        res
            .cookie('currentUser', token, { signed: true, httpOnly: true })
            .redirect('/users/current');
    } catch (error) {
        next(error)
    }
  }
}

export const userControllers = new UserControllers(userServices);
