const express = require("express");
const router = express.Router();
const JobInfo = require("../models/JobInfo");

// @GET /api/jobs — public
router.get("/", async (req, res) => {
    try {
        const { country, category } = req.query;
        const query = { isActive: true };
        if (country) query.country = country;
        if (category) query.category = category;
        const jobs = await JobInfo.find(query).sort({ createdAt: -1 });
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @GET /api/jobs/:id — public
router.get("/:id", async (req, res) => {
    try {
        const job = await JobInfo.findById(req.params.id);
        if (!job) return res.status(404).json({ message: "Not found" });
        res.json(job);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;