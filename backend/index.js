const express = require('express'),
    mongoose = require('mongoose'),
    multer = require('multer'),
    app = express(),
    upload = multer(),
    port = 3001,
    Schema = mongoose.Schema,
    cors = require('cors');

app.use(cors());

const imageSchema = new Schema({
    image: Buffer,
    name: String,
    size: Number,
    mimeType: String
});

const Image = mongoose.model('Image', imageSchema);

// Handle POST requests with Multer middleware to upload images coming as multipart/form-data
app.post('/images', upload.array('images'), (req, res) => {
    // req.files contains all the images' data
    // In this case, the form input field needs to have 'images' as the value of the 'name' attribute

    // Iterate over every image received to create an array of Image objects
    const imagesToUpload = req.files.map(image => {
        return new Image({
            image: image.buffer,
            name: image.originalname,
            size: image.size,
            mimeType: image.mimetype
        });
    })

    // Save all the Images in the array with insertMany()
    Image.insertMany(imagesToUpload, (err, result) => {
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