const express = require("express");
const router = express.Router();

const {
  createChurch,
  getChurches,
  getChurchById,
  updateChurch,
  deleteChurch,
} = require("../controllers/church");

router.post("/create", createChurch);
router.get("/", getChurches);
router.get("/:id", getChurchById);
router.put("/update/:id", updateChurch);
router.delete("/delete/:id", deleteChurch);

module.exports = router;
