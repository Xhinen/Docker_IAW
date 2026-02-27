const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// dummy users
const users = [
  { id: 1, name: 'Admin', email: 'admin@example.com' }
];

app.get('/users', (req, res) => {
  res.json(users);
});

app.listen(port, () => {
  console.log(`User service listening on port ${port}`);
});
