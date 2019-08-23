const express = require('express');

const path = require('path');

const app = express();

app.get('/api/test', (req, res, next) => {
  res.send('API');
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log('EIS server running on port ' + PORT);
});
