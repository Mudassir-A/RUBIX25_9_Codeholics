require('dotenv').config();
const express = require('express');
const cors = require('cors');
const retailRoutes = require('./routes/retailRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Allow React app
  credentials: true
}));
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Sustainable Retail Finder API is running' });
});

// Routes
app.use('/api/retail', retailRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Add this to see more detailed errors
process.on('unhandledRejection', (error) => {
  console.error('Unhandled Rejection:', error);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 