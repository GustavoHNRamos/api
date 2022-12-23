const express = require("express");
const router = express.Router();

const { createUser, updateUser, deleteUser } = require("../controllers/user");

router.post("/create", createUser);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);

module.exports = router;
