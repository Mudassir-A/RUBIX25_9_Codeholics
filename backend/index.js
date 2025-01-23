const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Debug middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Serve static files
app.use(express.static(path.join(__dirname, "../public")));

// Routes
const postsRouter = require("./routes/posts");
const brandsRouter = require("./routes/brands");
const challengesRouter = require("./routes/challenges");
const authRouter = require("./routes/auth");

app.use("/api/posts", postsRouter);
app.use("/api/brands", brandsRouter);
app.use("/api/challenges", challengesRouter);
app.use("/api/auth", authRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something broke!" });
});

// Serve the index.html file for the root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

});
