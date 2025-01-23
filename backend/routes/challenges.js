const express = require("express");
const pool = require("../data/db"); // Ensure this path points to your PostgreSQL connection file

const router = express.Router();

// Get all challenges
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM challenges");
    res.json(result.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to fetch challenges" });
  }
});

// Mark a challenge as completed
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("UPDATE challenges SET completed = true WHERE id = $1", [id]);
    res.json({ message: "Challenge marked as completed!" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to update challenge" });
  }
});

module.exports = router;
