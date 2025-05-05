import Joi from "joi";

const productSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  description: Joi.string().min(3).max(30).required(),
  price: Joi.number().integer().required(),
  stock: Joi.number().integer().required(),
});

export const createValidator = (req, res, next) => {
  const { error } = productSchema.validate(req.body, { abortEarly: false });
  error ? res.status(400).send(error) : next();
};
