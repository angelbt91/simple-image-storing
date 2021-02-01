# Backend

This service will listen to incoming POST requests to `/upload`. If they include a multipart/form-data body with `image`, `name`, `mimetype` and `size` keys (of type `Buffer`, `String`, `String` and `Number` respectively), it will store the object in a MongoDB collection.

## How to run this service

### Pull and run mongo with Docker

Docker must be previously installed and configured.

`> sudo docker pull mongo`

`> sudo docker run -it -p 27017:27017 --name mongodb -d mongo`

To stop the mongodb image, run

`> sudo docker stop mongodb`

### Install dependencies & start the service

`> npm install`

`> npm start`