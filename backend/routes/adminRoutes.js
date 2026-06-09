const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");
const {
    getStats,
    getUsers, updateUser, deleteUser,
    getAgencies, createAgency, updateAgency, deleteAgency,
    getReports, updateReport, deleteReport,
    getPosts, updatePost, deletePost,
    getJobs, createJob, updateJob, deleteJob,
} = require("../controllers/adminController");

// All admin routes protected
router.use(protect, adminOnly);

// Stats
router.get("/stats", getStats);

// Users
router.get("/users", getUsers);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

// Agencies
router.get("/agencies", getAgencies);
router.post("/agencies", createAgency);
router.put("/agencies/:id", updateAgency);
router.delete("/agencies/:id", deleteAgency);

// Reports
router.get("/reports", getReports);
router.put("/reports/:id", updateReport);
router.delete("/reports/:id", deleteReport);

// Posts
router.get("/posts", getPosts);
router.put("/posts/:id", updatePost);
router.delete("/posts/:id", deletePost);

// Jobs
router.get("/jobs", getJobs);
router.post("/jobs", createJob);
router.put("/jobs/:id", updateJob);
router.delete("/jobs/:id", deleteJob);

module.exports = router;