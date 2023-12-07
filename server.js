/* eslint-disable no-undef */
const express = require("express");
const app = express();
const port = 3000;

app.get('/ssetest', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const func = () => {
    const dateTime = JSON.stringify({time: new Date().getTime()});
    res.write('event: timeUpdate\n');
    res.write(`data: ${dateTime}\n\n`);
  };

  const timerId = setInterval(func, 1000);

  setTimeout(() => {
    console.log('Internal server error!!');
    clearInterval(timerId);
    res.status(500).end();
  }, 10 * 1000);

  req.on('close', () => {clearInterval(timerId)});
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/`);
});