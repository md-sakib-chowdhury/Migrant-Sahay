const express = require("express");
const router = express.Router();
const { getAgencies, getAgencyById, addReview } = require("../controllers/agencyController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", getAgencies);
router.get("/:id", getAgencyById);
router.post("/:id/review", protect, addReview);

module.exports = router;