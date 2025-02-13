const express = require("express");
const router = express.Router();
const pool = require("../data/db");
const auth = require("../middleware/auth");

// Get all brands
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT brands.*, users.username 
       FROM brands 
       LEFT JOIN users ON brands.user_id = users.id 
       ORDER BY brands.created_at DESC`
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Add a new brand (protected route)
router.post("/", auth, async (req, res) => {
  const { name, description, website } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO brands (name, description, website, user_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, description, website, req.user.id]
    );

    // Fetch the username for the response
    const userResult = await pool.query(
      "SELECT username FROM users WHERE id = $1",
      [req.user.id]
    );

    const brand = {
      ...result.rows[0],
      username: userResult.rows[0].username
    };

    res.json(brand);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Delete a brand (only the owner can delete)
router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    // Check if brand exists and belongs to user
    const brand = await pool.query(
      "SELECT * FROM brands WHERE id = $1 AND user_id = $2",
      [id, req.user.id]
    );

    if (brand.rows.length === 0) {
      return res.status(404).json({ error: "Brand not found or unauthorized" });
    }

    await pool.query("DELETE FROM brands WHERE id = $1", [id]);
    res.json({ message: "Brand deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
