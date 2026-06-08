const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        agencyName: { type: String, required: true },
        agencyId: { type: mongoose.Schema.Types.ObjectId, ref: "Agency" },
        description: { type: String, required: true },
        amount: { type: Number },
        country: { type: String },
        status: {
            type: String,
            enum: ["pending", "investigating", "resolved", "rejected"],
            default: "pending",
        },
        upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        adminNote: { type: String, default: "" },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Report", reportSchema);