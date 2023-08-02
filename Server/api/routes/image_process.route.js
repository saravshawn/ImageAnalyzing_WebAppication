const express = require('express');
const image_controller = require('../controllers/image_process.controller');
const route = express.Router();

route.post('/uploadImage',image_controller.uploadFile);

route.get('/getAllimages',image_controller.getAllImageData);

route.get('/getOnlyImage/:imageName',image_controller.getOnlyImage);

route.delete('/deleteImage/:imageFile',image_controller.deleteFile);

route.delete('/deleteAllimages',image_controller.deleteAllimageFiles);

module.exports = route;