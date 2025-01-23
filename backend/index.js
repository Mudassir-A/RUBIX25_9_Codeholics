const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, "../public")));

// Routes
const postsRouter = require("./routes/posts");
const brandsRouter = require("./routes/brands");
const challengesRouter = require("./routes/challenges");

app.use("/api/posts", postsRouter);
app.use("/api/brands", brandsRouter);
app.use("/api/challenges", challengesRouter);

// Serve the index.html file for the root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
