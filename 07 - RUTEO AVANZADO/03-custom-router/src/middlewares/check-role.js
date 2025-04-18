export const checkRole = (role) => {
  return async (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });
    if (req.user.role !== role)
      return res.status(403).json({ error: "You do not have permissions" });
    next();
  };
};
