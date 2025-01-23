const express = require("express");
const router = express.Router();
const pool = require("../data/db");
const auth = require("../middleware/auth");

// Get all challenges with completion status for logged-in user
router.get("/", auth, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
        c.*,
        CASE WHEN cc.challenge_id IS NOT NULL THEN true ELSE false END as completed
       FROM challenges c
       LEFT JOIN completed_challenges cc ON 
        c.id = cc.challenge_id AND 
        cc.user_id = $1
       ORDER BY c.created_at ASC`,
      [req.user.id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching challenges:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Debug endpoint to verify route
router.get("/test", (req, res) => {
  res.json({ message: "Challenges route is working" });
});

// Add points and mark challenge as completed
router.post("/complete", auth, async (req, res) => {
  const { challengeId } = req.body;

  try {
    // Start a transaction
    await pool.query('BEGIN');

    // Insert into completed_challenges if not already completed
    await pool.query(
      `INSERT INTO completed_challenges (user_id, challenge_id)
       VALUES ($1, $2)
       ON CONFLICT (user_id, challenge_id) DO NOTHING`,
      [req.user.id, challengeId]
    );

    // Update user's score
    await pool.query(
      `UPDATE users 
       SET sustain_score = COALESCE(sustain_score, 0) + 10 
       WHERE id = $1`,
      [req.user.id]
    );

    // Get updated score
    const scoreResult = await pool.query(
      "SELECT sustain_score FROM users WHERE id = $1",
      [req.user.id]
    );

    await pool.query('COMMIT');

    res.status(200).json({
      success: true,
      newScore: scoreResult.rows[0].sustain_score
    });

  } catch (err) {
    await pool.query('ROLLBACK');
    console.error("Error completing challenge:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
