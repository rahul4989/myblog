const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('video'), (req, res) => {
  res.send({ message: 'File uploaded successfully' });
});

app.post('/generate', (req, res) => {
  // In a real application, you would use the text from req.body.text
  // to generate a video. For this MVP, we'll just return the sample video.
  res.send({ videoUrl: 'http://localhost:3001/sample.mp4' });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
