const express = require("express");
const router = express.Router();
const pool = require("../data/db"); // Ensure this path points to your PostgreSQL connection file
const auth = require("../middleware/auth");

// Fetch all posts with user information
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT posts.*, users.username 
       FROM posts 
       LEFT JOIN users ON posts.user_id = users.id 
       ORDER BY posts.created_at DESC`
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Add a new post (protected route)
router.post("/", auth, async (req, res) => {
  const { title, description } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO posts (title, description, user_id) VALUES ($1, $2, $3) RETURNING *",
      [title, description, req.user.id]
    );

    // Fetch the username for the response
    const userResult = await pool.query(
      "SELECT username FROM users WHERE id = $1",
      [req.user.id]
    );

    const post = {
      ...result.rows[0],
      username: userResult.rows[0].username
    };

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Delete a post (only the owner can delete)
router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    // Check if post exists and belongs to user
    const post = await pool.query(
      "SELECT * FROM posts WHERE id = $1 AND user_id = $2",
      [id, req.user.id]
    );

    if (post.rows.length === 0) {
      return res.status(404).json({ error: "Post not found or unauthorized" });
    }

    await pool.query("DELETE FROM posts WHERE id = $1", [id]);
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
