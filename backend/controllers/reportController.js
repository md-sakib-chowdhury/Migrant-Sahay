const Report = require("../models/Report");

// @GET /api/reports
const getReports = async (req, res) => {
    try {
        const { status, country, page = 1, limit = 10 } = req.query;
        const query = {};
        if (status) query.status = status;
        if (country) query.country = country;

        const total = await Report.countDocuments(query);
        const reports = await Report.find(query)
            .populate("user", "name avatar")
            .skip((page - 1) * limit)
            .limit(Number(limit))
            .sort({ createdAt: -1 });

        res.json({ reports, total, page: Number(page), pages: Math.ceil(total / limit) });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @POST /api/reports
const createReport = async (req, res) => {
    try {
        const { agencyName, agencyId, description, amount, country } = req.body;
        const report = await Report.create({
            user: req.user._id,
            agencyName,
            agencyId,
            description,
            amount,
            country,
        });
        res.status(201).json(report);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @PUT /api/reports/:id/upvote
const upvoteReport = async (req, res) => {
    try {
        const report = await Report.findById(req.params.id);
        if (!report) return res.status(404).json({ message: "Report not found" });

        const alreadyUpvoted = report.upvotes.includes(req.user._id);
        if (alreadyUpvoted) {
            report.upvotes = report.upvotes.filter(
                (id) => id.toString() !== req.user._id.toString()
            );
        } else {
            report.upvotes.push(req.user._id);
        }
        await report.save();
        res.json({ message: alreadyUpvoted ? "Upvote removed" : "Upvoted", upvotes: report.upvotes.length });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getReports, createReport, upvoteReport };