# Backend

This service will listen to incoming POST requests. If they include a JSON body with `body` and `content-type` keys of type `Buffer` and `String` respectively, it will store the object in a MongoDB collection.

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