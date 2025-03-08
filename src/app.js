const express = require('express');
const emailRoutes = require('./routes/emailRoutes');
require('dotenv').config();

const app = express();
app.use(express.json()); // Parse JSON request body

// Định nghĩa routes
app.use('/api', emailRoutes);

// Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});