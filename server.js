'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({storage: storage, limits: {fileSize: 524288}});
const app = express();

app.use((req, res, next) => {
  console.log(`${Date.now()}: ${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.get('/hello', (req, res) => {
  res.json({greetings: 'Hello, API'});
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  res.json({
    'filename': req['file'].originalname,
    'filesize': req['file'].size,
  });
});

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    console.log(`${Date.now()}: MulterError: ${err.code}`);
    res.status(500).type('txt').send('Internal Server Error');
  } else {
    next();
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Node.js listening ...');
});
