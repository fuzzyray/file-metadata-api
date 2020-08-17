'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

// require and use "multer"...

const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.get('/hello', (req, res) => {
  res.json({greetings: 'Hello, API'});
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Node.js listening ...');
});
