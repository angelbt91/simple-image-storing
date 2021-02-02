const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const app = express();
const upload = multer();
const port = 3001;
const Schema = mongoose.Schema;
const cors = require('cors');
app.use(cors());

const imageSchema = new Schema({
    image: Buffer,
    name: String,
    size: Number,
    mimeType: String
});

const Image = mongoose.model('Image', imageSchema);

// Handle POST requests with Multer middleware to upload images coming as multipart/form-data
app.post('/image', upload.single('image'), (req, res) => {
    // req.file contains all the image's data,
    // in this case, the form input field needs to have 'image' as the value of the 'name' attribute
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

// Handle GET requests to send all images, converting the buffer into a base64 string
app.get('/images', async (req, res) => {
    let all = await Image.find();

    // Iterate over each image to convert the buffer array into a base64 string
    all = all.map(image => {
        return {
            ...image._doc,
            image: image.image.toString('base64')
        };
    });

    return res.status(200).json(all);
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