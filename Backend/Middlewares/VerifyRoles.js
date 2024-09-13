export const verifyRoles = (allowedRoles) => {
  return (req, res, next) => {
    console.log(req.user);
    if (!req?.user.role) return res.sendStatus(401);
    if (!allowedRoles.includes(req.user.role)) return res.sendStatus(401);
    next();
  };
};
