//Image routes
const log = console.log;

const express = require("express");
const router = express.Router(); 

const { mongoChecker, isMongoError } = require("./helpers/mongo_helpers");
const { authenticate } = require("./helpers/authentication");

// import the mongoose model
const { Image } = require("../models/image");

// multipart middleware: allows you to access uploaded file from req.file
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();

// cloudinary: configure using credentials found on your Cloudinary Dashboard
// sign up for a free account here: https://cloudinary.com/users/register/free
const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'da8psy9pu',
    api_key: '121244149562754',
    api_secret: 'aM5skLU3JFS7_ZEtI-Aevc1fvCc'
});

/*********************************************************/

/*** Image API Routes below ************************************/

// a POST route to *create* an image
router.post("/images", multipartMiddleware, (req, res) => {

    // Use uploader.upload API to upload image to cloudinary server.
    cloudinary.uploader.upload(
        req.files.image.path, // req.files contains uploaded files
        function (result) {

            // Create a new image using the Image mongoose model
            var img = new Image({
                image_id: result.public_id, // image id on cloudinary server
                image_url: result.url, // image url on cloudinary server
                created_at: new Date(),
            });

            // Save image to the database
            img.save().then(
                saveRes => {
                    res.send(saveRes);
                },
                error => {
                    res.status(400).send(error); // 400 for bad request
                }
            );
        });
});

// a GET route to get all images
router.get("/images", (req, res) => {
    Image.find().then(
        images => {
            res.send({ images }); // can wrap in object if want to add more properties
        },
        error => {
            res.status(500).send(error); // server error
        }
    );
});


// export the router
module.exports = router