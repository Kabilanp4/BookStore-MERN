const express = require("express");
const router = express.Router();
const User = require("./users.model");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET_KEY;
router.post("/admin", async (req, res) => {
  const { userName, password } = req.body;
  try {
    const admin = await User.findOne({ userName });
    console.log("admin", admin, userName, password);
    if (!admin) {
      return res.status(400).send("Admin not found");
    }
    if (admin.password !== password) {
      return res.status(400).send("Invalid Credentials");
    }
    const token = jwt.sign(
      { id: admin._id, userName: admin.userName, role: admin.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    return res.status(200).json({
      message: "Authentication successful",
      token: token,
      user: {
        userName: admin.userName,
        role: admin.role,
      },
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
