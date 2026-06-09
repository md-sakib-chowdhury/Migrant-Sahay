const Agency = require("../models/Agency");

// @GET /api/agencies
const getAgencies = async (req, res) => {
    try {
        const { country, verified, search, page = 1, limit = 10 } = req.query;
        const query = { isActive: true };
        if (country) query.countries = { $in: [country] };
        if (verified === "true") query.isVerified = true;
        if (search) query.name = { $regex: search, $options: "i" };

        const total = await Agency.countDocuments(query);
        const agencies = await Agency.find(query)
            .skip((page - 1) * limit)
            .limit(Number(limit))
            .sort({ createdAt: -1 });

        res.json({ agencies, total, page: Number(page), pages: Math.ceil(total / limit) });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @GET /api/agencies/:id
const getAgencyById = async (req, res) => {
    try {
        const agency = await Agency.findById(req.params.id).populate("reviews.user", "name avatar");
        if (!agency) return res.status(404).json({ message: "Agency not found" });
        res.json(agency);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @POST /api/agencies/:id/review
const addReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const agency = await Agency.findById(req.params.id);
        if (!agency) return res.status(404).json({ message: "Agency not found" });

        const alreadyReviewed = agency.reviews.find(
            (r) => r.user.toString() === req.user._id.toString()
        );
        if (alreadyReviewed)
            return res.status(400).json({ message: "Already reviewed this agency" });

        agency.reviews.push({ user: req.user._id, rating, comment });
        agency.avgRating =
            agency.reviews.reduce((acc, r) => acc + r.rating, 0) / agency.reviews.length;
        await agency.save();
        res.status(201).json({ message: "Review added" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getAgencies, getAgencyById, addReview };