const express = require("express");
const router = express.Router();
const pool = require("../data/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

// Register endpoint
router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validate input
        if (!username || !email || !password) {
            return res.status(400).json({
                error: "Please provide username, email and password"
            });
        }

        // Check if email already exists
        const userExists = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        if (userExists.rows.length > 0) {
            return res.status(400).json({
                error: "User with this email already exists"
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert new user
        const newUser = await pool.query(
            "INSERT INTO users (username, email, password, sustain_score) VALUES ($1, $2, $3, $4) RETURNING id, username, email, sustain_score",
            [username, email, hashedPassword, 0]
        );

        // Create JWT token
        const token = jwt.sign(
            { id: newUser.rows[0].id },
            process.env.JWT_SECRET || "your-secret-key",
            { expiresIn: "1d" }
        );

        res.json({
            user: {
                id: newUser.rows[0].id,
                username: newUser.rows[0].username,
                email: newUser.rows[0].email,
                sustain_score: newUser.rows[0].sustain_score
            },
            token
        });
    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({ error: "Server error during registration" });
    }
});

// Login endpoint (email and password only)
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                error: "Please provide both email and password"
            });
        }

        // Check if user exists
        const result = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const user = result.rows[0];

        // Verify password
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // Create JWT token
        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET || "your-secret-key",
            { expiresIn: "1d" }
        );

        res.json({
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                sustain_score: user.sustain_score
            },
            token
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: "Server error during login" });
    }
});

// Get user profile
router.get("/profile", auth, async (req, res) => {
    try {
        const user = await pool.query(
            "SELECT id, username, email, sustain_score FROM users WHERE id = $1",
            [req.user.id]
        );

        if (user.rows.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json(user.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router; 