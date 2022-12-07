const express = require("express");
const router = express.Router();

const {
  createChurch,
  getChurches,
  getChurchById,
  updateChurch,
  deleteChurch,
} = require("../controllers/church");

router.get("/church", getChurches);
router.post("/church/create", createChurch);
router.get("/church/:id", getChurchById);
router.put("/church/update/:id", updateChurch);
router.delete("/church/delete/:id", deleteChurch);

module.exports = router;
