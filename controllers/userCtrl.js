const Users = require("../models/usersModel");
const validator = require("../validators/validator");

userCtrl = {
  getUsers: async (req, res) => {
    const users = await Users.find();
    res.send(users);
  },
  getUserById: async (req, res) => {
    try {
      const user = await Users.findOne({ _id: req.params.id });
      if (!user) {
        return res.status(404).send("Malumot topilmadi...");
      }
      res.status(200).send(user);
    } catch (err) {
      if (err.name === "CastError") {
        return res
          .status(404)
          .send("Berilgan IDga teng bo'lgan user topilmadi");
      }
    }
  },
  createUser: async (req, res) => {
    const { error } = await validator.checkUser(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const user = await Users.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
    });
    res.status(201).send(user);
  },
  login: async (req, res) => {
    console.log("Login....");
  },
  register: async (req, res) => {
    console.log("Register....");
  },
  logout: async (req, res) => {
    console.log("Logout....");
  },
};
module.exports = userCtrl;
