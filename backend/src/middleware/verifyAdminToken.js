const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET_KEY;

const verifyAdminToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  console.log("token ", token);
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access Denied. No token provided" });
  }
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid Credentials" });
    }
    req.user = user; //attach user to request object
    next();
  });
};

module.exports = verifyAdminToken;
