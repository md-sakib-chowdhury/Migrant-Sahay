const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        text: { type: String, required: true },
    },
    { timestamps: true }
);

const postSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        title: { type: String, required: true },
        body: { type: String, required: true },
        category: {
            type: String,
            enum: ["general", "job", "legal", "health", "remittance", "other"],
            default: "general",
        },
        country: { type: String, default: "" },
        isActive: { type: Boolean, default: true },
        likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        comments: [commentSchema],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
