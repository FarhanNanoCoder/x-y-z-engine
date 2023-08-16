const express = require("express");
const {
  createRecordController,
  delRecordController,
  getRecordController,
  updateRecordController,
  listRecordController,
} = require("../controllers/record");
const router = express.Router();

router.post("/", createRecordController);
router.delete("/:_id", delRecordController);
router.get("/:_id", getRecordController);
router.patch("/:_id", updateRecordController);
router.get("/", listRecordController);

module.exports = router;
