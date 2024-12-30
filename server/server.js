const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from GolfLab server!' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});