const express = require("express");
const pool = require("../data/db"); // Ensure this path points to your PostgreSQL connection file
const router = express.Router();

// Get all brands
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM brands"); // Query the database
    res.json(result.rows); // Send data as JSON
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching brands");
  }
});

// Add a new brand
router.post("/", async (req, res) => {
  const { name, description, website } = req.body;
  try {
    await pool.query(
      "INSERT INTO brands (name, description, website) VALUES ($1, $2, $3)",
      [name, description, website]
    );
    res.json({ message: "Brand added successfully!" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to add brand" });
  }
});

module.exports = router;
