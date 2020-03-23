const express = require('express');
const app = express();

app.listen(3000, () => {
  console.log('Server is up on port 3000')
});

app.get('/api/test', (req, res) => {
  res.send({headers: req.headers});
});

// Error logging
app.post('/api/log', (req, res) => {
  // noop
  res.status(200).end();
});
