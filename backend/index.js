const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const port = 3000;

(async () => {
    await mongoose.connect('mongodb://localhost/', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });
})();

const Schema = mongoose.Schema;

const imageSchema = new Schema({
    body: Buffer,
    'content-type': String
});

const Image = mongoose.model('Image', imageSchema);

app.post('/', (req, res) => {
    const newImage = new Image(req.body);

    newImage.save(function (err, result) {
        if (err) {
            res.status(400).send(err);
        } else {
            res.status(200).send(result);
        }
    });
});

app.listen(port, () => {
    console.log(`Image storing service listening at http://localhost:${port}`)
});