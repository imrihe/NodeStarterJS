var express = require('express');
var router = express.Router();
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({uploadDir: 'uploads/userImages'});
var imageModel = require('../models/imageModel.js')
var ensureAuthenticated = require('../models/auth.js').ensureAuthenticated;
//OCR: https://api.idolondemand.com/1/api/sync/ocrdocument/v1?apikey=7bac1a45-4335-45b8-8920-4044d84e2404&url=IMAGE_URL&mode=document_photo


router.post('/upload', multipartMiddleware, function(req, res) {
  var fileName  = (req.files[0] && req.files[0].path.split('/').pop())
                  || (req.files['fileName'] && req.files['fileName'].path.split('/').pop())
  imageModel.createImage(fileName,function(err,result){
    if (err) res.send({err: err})
    else res.send({result: true, content: result, fileName: fileName});
  })
  
});

router.post('/setMetaData', ensureAuthenticated,function(req, res) {
  imageModel.updateImageMetaData(req.param('fileName'), req.body,function(err,result){
    if (err) res.send({err: err})
    else res.send({result: true, content: result});
  })
  
});



router.post('/searchImagesByText', ensureAuthenticated, function(req, res) {
  imageModel.searchImagesByFreeText(req.param('text'), null, function(err,result){
    if (err) res.send({err: err});
    else res.send({result: true, content: result});
  })
  
});

router.post('/getImageData',ensureAuthenticated, function(req, res) {
  imageModel.getImageData(req.param('name'), function(err,result){
    if (err) res.send({err: err});
    else res.send({result: true, content: result});
  })
  
});


router.post('/listUserImages',ensureAuthenticated, function(req, res) {
  imageModel.listUserImages(req.param('uId'), function(err,result){
    if (err) res.send({err: err});
    else res.send({result: true, content: result});
  })
});


router.post('/searchImagesByKeywords',ensureAuthenticated, function(req, res) {
  imageModel.searchImagesByKeywords(req.param('keywords'),req.param('uId') || null, function(err,result){
    if (err) res.send({err: err});
    else res.send({result: true, content: result});
  })
});

router.post('/searchImagesByCategory', ensureAuthenticated, function(req, res) {
  imageModel.searchImagesByCategory(req.param('category'), req.param('uId') ||null, function(err,result){
    if (err) res.send({err: err});
    else res.send({result: true, content: result});
  })
});

router.post('/searchImagesByTitle',ensureAuthenticated,  function(req, res) {
  imageModel.searchImagesByTitle(req.param('title'), req.param('uId') ||null, function(err,result){
    if (err) res.send({err: err});
    else res.send({result: true, content: result});
  })
});



module.exports = router;

