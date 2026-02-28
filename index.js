const express = require('express');

const app = express();

app.use(express.json());

// GET / - Hello World endpoint
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello World' });
});

// GET /health - Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

module.exports = app;
