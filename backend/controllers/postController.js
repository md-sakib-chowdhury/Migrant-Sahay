const Post = require("../models/Post");

// @GET /api/posts
const getPosts = async (req, res) => {
    try {
        const { category, country, search, page = 1, limit = 10 } = req.query;
        const query = { isActive: true };
        if (category) query.category = category;
        if (country) query.country = country;
        if (search) query.title = { $regex: search, $options: "i" };

        const total = await Post.countDocuments(query);
        const posts = await Post.find(query)
            .populate("user", "name avatar")
            .skip((page - 1) * limit)
            .limit(Number(limit))
            .sort({ createdAt: -1 });

        res.json({ posts, total, page: Number(page), pages: Math.ceil(total / limit) });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @GET /api/posts/:id
const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
            .populate("user", "name avatar")
            .populate("comments.user", "name avatar");
        if (!post) return res.status(404).json({ message: "Post not found" });
        res.json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @POST /api/posts
const createPost = async (req, res) => {
    try {
        const { title, body, category, country } = req.body;
        const post = await Post.create({ user: req.user._id, title, body, category, country });
        res.status(201).json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @POST /api/posts/:id/comment
const addComment = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: "Post not found" });
        post.comments.push({ user: req.user._id, text: req.body.text });
        await post.save();
        res.status(201).json({ message: "Comment added" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @PUT /api/posts/:id/like
const likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        const liked = post.likes.includes(req.user._id);
        if (liked) {
            post.likes = post.likes.filter((id) => id.toString() !== req.user._id.toString());
        } else {
            post.likes.push(req.user._id);
        }
        await post.save();
        res.json({ likes: post.likes.length });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getPosts, getPostById, createPost, addComment, likePost };