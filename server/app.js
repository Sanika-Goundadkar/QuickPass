const express = require('express');
const cors = require('cors');
const app = express();

// Use CORS middleware
app.use(cors());

// Define your routes here
app.post('/api/login', (req, res) => {
  // Your login logic
  res.send('Login endpoint');
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
