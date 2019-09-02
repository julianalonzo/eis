const path = require('path');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const itemRoutes = require('./routes/item');
const templateRoutes = require('./routes/template');
const filesRoutes = require('./routes/files');

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use('/api/items', itemRoutes);
app.use('/api/templates', templateRoutes);
app.use('/api/files', filesRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'build')));

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/eis';

console.log('Connecting database at', MONGO_URI);

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('Database connected at ' + MONGO_URI);

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log('EIS server running on port ' + PORT);
    });
  })
  .catch(mongooseError => {
    console.log('Database error', mongooseError);
  });
