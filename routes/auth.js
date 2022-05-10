const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../validation');
const { verifyToken } = require("../validation");

// User Registration
router.post("/register", async (req, res) => {
    const { error } = registerValidation(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) {
        return res.status(400).json({ error: "Email already exists." });
    }
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);
    const userObject = new User({
        name: req.body.name,
        email: req.body.email,
        password
    });
    try {
        const savedUser = await userObject.save();
        res.json({ error: null, data: savedUser._id });
    } catch (error) {
        res.status(400).json({ error });
    }
});

// User Login
router.post("/login", async (req, res) => {
    const { error } = loginValidation(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).json({ error: "Email is wrong" });
    }
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(400).json({ error: "Password is wrong" })
    }

    const token = jwt.sign
        ({
            email: user.email,
            id: user._id
        },
            process.env.TOKEN_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN },
        );
    res.header("auth-token", token).json({
        error: null,
        data: { token }
    })
});

// Get specific user by email
router.get("/:email", async (req, res) => {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
        return res.status(400).json({ error: "User not found" });
    }
    res.json({ error: null, data: user });
});

// Delete user by email
router.delete("/delete/:email", verifyToken, async (req, res) => {
    const user = await User.findOneAndDelete({ email: req.params.email });
    if (!user) {
        return res.status(400).json({ error: "User not found" });
    }
    res.json({ error: null, data: user });
});

// Get all users
router.get("/", verifyToken, (req, res) => {
    data = req.body;
    User.find(data)
        .then(data => { res.send(data); })
        .catch(err => { res.status(500).send({ message: err.message }); })
});

// User Logout
//router.post("/logout", async () => {
//    db = db.getSiblingDB('user')
//   await db.logout()
//});

module.exports = router;