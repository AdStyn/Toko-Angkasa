var express = require("express");
var router = express.Router();
const models = require("../models/index");
const user = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtverify = require("../middleware/authMiddleware");

/* GET users listing. */
router.post("/register", async (req, res, next) => {
  console.log(req.body);
  try {
    const { role, name, password } = req.body;
    const hashedPaswword = await bcrypt.hash(password, 10);
    const make_data = await models.user.create({
      role: role,
      name,
      password: hashedPaswword,
    });
    res
      .status(201)
      .json({ data: make_data, message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});
router.post("/login", async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await models.user.findOne({ where: { name } });
    console.log(user);
    if (!user) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(404).json({ error: "password failed" });
    }
    const token = jwt.sign({ userId: user.id, role: user.role }, "lucky", {
      expiresIn: "1d",
    });
    console.log(token);
    res.status(200).json({ token, role: user.role });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Login failed" });
  }
});

module.exports = router;
