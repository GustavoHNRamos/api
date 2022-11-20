const express = require("express");
const router = express.Router();

const {
  getChurches,
  getChurchById,
  updateChurch,
  deleteChurch,
} = require("../controllers/church");

router.get("/", getChurches);
router.get("/:id", getChurchById);
// router.get("/update/:id", updateChurch);
router.delete("/delete/:id", deleteChurch);

module.exports = router;
