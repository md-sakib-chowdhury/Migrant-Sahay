const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// @POST /api/auth/register
const register = async (req, res) => {
    try {
        const { name, email, password, phone, country } = req.body;
        const exists = await User.findOne({ email });
        if (exists) return res.status(400).json({ message: "Email already exists" });

        const user = await User.create({ name, email, password, phone, country });
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @POST /api/auth/login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        if (!user.isActive) {
            return res.status(403).json({ message: "Account is deactivated" });
        }
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @GET /api/auth/profile
const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @PUT /api/auth/profile
const updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const { name, phone, country, avatar } = req.body;
        if (name) user.name = name;
        if (phone) user.phone = phone;
        if (country) user.country = country;
        if (avatar) user.avatar = avatar;
        if (req.body.password) user.password = req.body.password;
        await user.save();
        res.json({ message: "Profile updated", user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { register, login, getProfile, updateProfile };