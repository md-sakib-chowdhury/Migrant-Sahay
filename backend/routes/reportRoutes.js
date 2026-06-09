const express = require("express");
const router = express.Router();
const { getReports, createReport, upvoteReport } = require("../controllers/reportController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", getReports);
router.post("/", protect, createReport);
router.put("/:id/upvote", protect, upvoteReport);

module.exports = router;