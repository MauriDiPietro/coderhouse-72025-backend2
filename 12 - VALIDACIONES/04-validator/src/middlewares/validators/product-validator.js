export const createValidator = (req, res, next) => {
  const errors = [];

  const body = req.body;

  if (!body.name || body.name.length <= 2) {
    errors.push(
      {message: "La propiedad name es oblitoria y debe tener al menos 2 caracteres", prop: "name"}
    );
  }

  if (!body.description || body.description.length < 25 || typeof body.description !== "string") {
    errors.push(
      "La propiedad description es oblitoria, debe ser texto y tener al menos 25 caracteres"
    );
  }

  if (!body.price || body.price <= 0) {
    errors.push("La propiedad price es oblitoria y debe ser mayor a 0");
  }

  if (!body.stock || body.stock <= 0) {
    errors.push("La propiedad stock es oblitoria y debe ser mayor a 0");
  }

  if (errors.length) return res.status(400).send(errors);
  return next();
};
