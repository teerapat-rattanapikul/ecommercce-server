const jwt = require("jsonwebtoken");

module.exports = () => (req, res, next) => {
  try {
    const authorization = req.header("Authorization");
    if (authorization === undefined) {
      res.json({ status: false, data: "ต้องมี Authorization header" });
    }
    const token = authorization.replace("Bearer ", "");
    const decoded = jwt.verify(token, "ecommerce_secret_key");
    const user = decoded.user;
    req.id = user.id;
    req.name = user.name;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      error.status = 401;
    }
    res.json(error);
  }
};
