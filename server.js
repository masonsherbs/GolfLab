const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001; // Use 3001 to avoid conflict with React's default port

app.use(cors());
app.use(express.json());

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from GolfLab server!' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});