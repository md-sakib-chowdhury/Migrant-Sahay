const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        rating: { type: Number, min: 1, max: 5, required: true },
        comment: { type: String, required: true },
    },
    { timestamps: true }
);

const agencySchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        licenseNo: { type: String, required: true, unique: true },
        address: { type: String, required: true },
        phone: { type: String, required: true },
        email: { type: String },
        countries: [{ type: String }],
        isVerified: { type: Boolean, default: false },
        isActive: { type: Boolean, default: true },
        logo: { type: String, default: "" },
        description: { type: String, default: "" },
        reviews: [reviewSchema],
        avgRating: { type: Number, default: 0 },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Agency", agencySchema);