import { param, check, validationResult } from "express-validator";

export const createValidator = [
  check(
    "name",
    "La propiedad name debe tener un mínimo de 3 caracteres"
  ).isLength({ min: 3 }),
  check("name", "La propiedad name es obligatoria").exists(),
  check(
    "description",
    "La propiedad description debe tener un mínimo de 15 caracteres"
  ).isLength({ min: 15 }),
  check("description", "La propiedad description es obligatoria").exists(),
  check("price", "La propiedad price es obligatoria").exists(),
  check("price", "La propiedad price debe ser de tipo número").isInt(),
  check("stock", "La propiedad stock es obligatoria").exists(),
  check("stock", "La propiedad stock debe ser de tipo número").isInt(),
  check("stock", "El stock debe ser mayor a 0").custom((value) => {
    if (value && value <= 0) throw new Error("El stock debe ser mayor a 0");
  }),
  (req, res, next) => {
    try {
      validationResult(req).throw();
      return next();
    } catch (error) {
      res.status(400).send(error);
    }
  },
];

export const paramValidator = [
  param("id", "El id debe tener mínimo 20 caracteres").isLength({ min: 20 }),
  (req, res, next) => {
    try {
      validationResult(req).throw();
      return next();
    } catch (error) {
      res.status(400).send(error);
    }
  },
];
