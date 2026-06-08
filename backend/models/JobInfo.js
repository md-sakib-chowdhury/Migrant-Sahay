const mongoose = require("mongoose");

const jobInfoSchema = new mongoose.Schema(
    {
        country: { type: String, required: true },
        jobTitle: { type: String, required: true },
        minSalary: { type: Number, required: true },
        maxSalary: { type: Number, required: true },
        currency: { type: String, default: "BDT" },
        workingHours: { type: String, default: "8 hours/day" },
        visaType: { type: String, default: "Work Visa" },
        requirements: [{ type: String }],
        benefits: [{ type: String }],
        isActive: { type: Boolean, default: true },
        category: {
            type: String,
            enum: ["construction", "domestic", "hospitality", "manufacturing", "healthcare", "other"],
            default: "other",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("JobInfo", jobInfoSchema);