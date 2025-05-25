const express = require('express');
const app = express();
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'API läuft einwandfrei.' });
});

app.post('/npc/decide', (req, res) => {
  const { situation } = req.body;
  res.json({
    decision: `Reaktion wird realistisch auf "${situation}" zurückgegeben.`
  });
});

module.exports = app;
