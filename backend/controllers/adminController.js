const User = require("../models/User");
const Agency = require("../models/Agency");
const Report = require("../models/Report");
const Post = require("../models/Post");
const JobInfo = require("../models/JobInfo");

// ─── DASHBOARD STATS ───────────────────────────────────────────
// @GET /api/admin/stats
const getStats = async (req, res) => {
    try {
        const [users, agencies, reports, posts, jobs] = await Promise.all([
            User.countDocuments(),
            Agency.countDocuments(),
            Report.countDocuments(),
            Post.countDocuments(),
            JobInfo.countDocuments(),
        ]);
        const pendingReports = await Report.countDocuments({ status: "pending" });
        const verifiedAgencies = await Agency.countDocuments({ isVerified: true });
        res.json({ users, agencies, reports, posts, jobs, pendingReports, verifiedAgencies });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ─── USERS ─────────────────────────────────────────────────────
// @GET /api/admin/users
const getUsers = async (req, res) => {
    try {
        const { page = 1, limit = 10, search } = req.query;
        const query = {};
        if (search) query.$or = [
            { name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
        ];
        const total = await User.countDocuments(query);
        const users = await User.find(query)
            .select("-password")
            .skip((page - 1) * limit)
            .limit(Number(limit))
            .sort({ createdAt: -1 });
        res.json({ users, total, page: Number(page), pages: Math.ceil(total / limit) });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @PUT /api/admin/users/:id
const updateUser = async (req, res) => {
    try {
        const { role, isActive } = req.body;
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { role, isActive },
            { new: true }
        ).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @DELETE /api/admin/users/:id
const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: "User deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ─── AGENCIES ──────────────────────────────────────────────────
// @GET /api/admin/agencies
const getAgencies = async (req, res) => {
    try {
        const { page = 1, limit = 10, search } = req.query;
        const query = {};
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

// @POST /api/admin/agencies
const createAgency = async (req, res) => {
    try {
        const agency = await Agency.create(req.body);
        res.status(201).json(agency);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @PUT /api/admin/agencies/:id
const updateAgency = async (req, res) => {
    try {
        const agency = await Agency.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!agency) return res.status(404).json({ message: "Agency not found" });
        res.json(agency);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @DELETE /api/admin/agencies/:id
const deleteAgency = async (req, res) => {
    try {
        await Agency.findByIdAndDelete(req.params.id);
        res.json({ message: "Agency deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ─── REPORTS ───────────────────────────────────────────────────
// @GET /api/admin/reports
const getReports = async (req, res) => {
    try {
        const { page = 1, limit = 10, status } = req.query;
        const query = {};
        if (status) query.status = status;
        const total = await Report.countDocuments(query);
        const reports = await Report.find(query)
            .populate("user", "name email")
            .skip((page - 1) * limit)
            .limit(Number(limit))
            .sort({ createdAt: -1 });
        res.json({ reports, total, page: Number(page), pages: Math.ceil(total / limit) });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @PUT /api/admin/reports/:id
const updateReport = async (req, res) => {
    try {
        const { status, adminNote } = req.body;
        const report = await Report.findByIdAndUpdate(
            req.params.id,
            { status, adminNote },
            { new: true }
        );
        if (!report) return res.status(404).json({ message: "Report not found" });
        res.json(report);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @DELETE /api/admin/reports/:id
const deleteReport = async (req, res) => {
    try {
        await Report.findByIdAndDelete(req.params.id);
        res.json({ message: "Report deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ─── POSTS ─────────────────────────────────────────────────────
// @GET /api/admin/posts
const getPosts = async (req, res) => {
    try {
        const { page = 1, limit = 10, search } = req.query;
        const query = {};
        if (search) query.title = { $regex: search, $options: "i" };
        const total = await Post.countDocuments(query);
        const posts = await Post.find(query)
            .populate("user", "name email")
            .skip((page - 1) * limit)
            .limit(Number(limit))
            .sort({ createdAt: -1 });
        res.json({ posts, total, page: Number(page), pages: Math.ceil(total / limit) });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @PUT /api/admin/posts/:id
const updatePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!post) return res.status(404).json({ message: "Post not found" });
        res.json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @DELETE /api/admin/posts/:id
const deletePost = async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.json({ message: "Post deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ─── JOB INFO ──────────────────────────────────────────────────
// @GET /api/admin/jobs
const getJobs = async (req, res) => {
    try {
        const { page = 1, limit = 10, country, category } = req.query;
        const query = {};
        if (country) query.country = country;
        if (category) query.category = category;
        const total = await JobInfo.countDocuments(query);
        const jobs = await JobInfo.find(query)
            .skip((page - 1) * limit)
            .limit(Number(limit))
            .sort({ createdAt: -1 });
        res.json({ jobs, total, page: Number(page), pages: Math.ceil(total / limit) });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @POST /api/admin/jobs
const createJob = async (req, res) => {
    try {
        const job = await JobInfo.create(req.body);
        res.status(201).json(job);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @PUT /api/admin/jobs/:id
const updateJob = async (req, res) => {
    try {
        const job = await JobInfo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!job) return res.status(404).json({ message: "Job not found" });
        res.json(job);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @DELETE /api/admin/jobs/:id
const deleteJob = async (req, res) => {
    try {
        await JobInfo.findByIdAndDelete(req.params.id);
        res.json({ message: "Job info deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getStats,
    getUsers, updateUser, deleteUser,
    getAgencies, createAgency, updateAgency, deleteAgency,
    getReports, updateReport, deleteReport,
    getPosts, updatePost, deletePost,
    getJobs, createJob, updateJob, deleteJob,
};