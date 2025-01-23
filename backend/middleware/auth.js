const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    // Get token from header
    const token = req.header("x-auth-token");

    console.log("Received token:", token); // Debug log

    // Check if no token
    if (!token) {
        console.log("No token provided"); // Debug log
        return res.status(401).json({ error: "No token, authorization denied" });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key");
        console.log("Decoded token:", decoded); // Debug log
        req.user = decoded;
        next();
    } catch (err) {
        console.error("Token verification error:", err); // Debug log
        res.status(401).json({ error: "Token is not valid" });
    }
}; 