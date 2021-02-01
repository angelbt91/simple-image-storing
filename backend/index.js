const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const app = express();
const upload = multer();
const port = 3001;
const Schema = mongoose.Schema;
const cors = require('cors');
app.use(cors());

// Create object Schema
const imageSchema = new Schema({
    image: Buffer,
    name: String,
    size: Number,
    mimeType: String
});

// Initialize object Model
const Image = mongoose.model('Image', imageSchema);

// Handle POST requests
app.post('/upload', upload.single('image'), (req, res) => {
    const imgToUpload = new Image({
        image: req.file.buffer,
        name: req.file.originalname,
        size: req.file.size,
        mimeType: req.file.mimetype
    });

    imgToUpload.save(function (err, result) {
        if (err) {
            res.status(400).send(err);
        } else {
            res.status(200).send(result);
        }
    });
});

// Initialize Mongoose
(async () => {
    await mongoose.connect('mongodb://localhost/', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });
})();

// Start service
app.listen(port, () => {
    console.log(`Image storing service listening at http://localhost:${port}`)
});