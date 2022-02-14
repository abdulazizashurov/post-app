const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/userCtrl");

// posts
router.get("/", userCtrl.getUsers);

router.get("/:id", userCtrl.getUserById);

router.post("/", userCtrl.createUser);

router.post("/register", userCtrl.register);

router.put("/login", userCtrl.login);

router.delete("/logout", userCtrl.login);

module.exports = router;
