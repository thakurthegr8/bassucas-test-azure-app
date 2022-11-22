const Joi = require("joi");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../../database/models/User");

router.get("/", async (req, res) => {
  try {
    const users = await User.find(
      {},
      { password: 0, createdAt: 0, updatedAt: 0, __v: 0 }
    );
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id, {
      password: 0,
      createdAt: 0,
      updatedAt: 0,
      __v: 0,
    });
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

router.post(
  "/",
  async (req, res, next) => {
    const validator = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });
    try {
      await validator.validateAsync(req.body);
      next();
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
  async (req, res) => {
    const body = req.body;
    try {
      const password = await bcrypt.hash(body.password, 10);
      const isVerified = false;
      const user = await User.create({ ...body, password, isVerified });
      return res.status(200).json(user);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
);

module.exports = router;
