const express = require('express');

const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'client', 'build')));

app.get('/api/test', (req, res, next) => {
  res.send('API');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

const SERVER_PORT = 4000;
app.listen(SERVER_PORT, () => {
  console.log('EIS server running on port ' + SERVER_PORT);
});
