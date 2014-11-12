var express = require('express');
var router = express.Router();

//OCR: https://api.idolondemand.com/1/api/sync/ocrdocument/v1?apikey=7bac1a45-4335-45b8-8920-4044d84e2404&url=IMAGE_URL&mode=document_photo





router.post('/create', function(req, res) {
  //TODO: add content here
  res.send("I think this is your job to build this..")
});



router.post('/signIn', function(req, res) {
  //TODO: add content here
  res.send("I think this is your job to build this..")
});



router.post('/signOut', function(req, res) {
  //TODO: add content here
  res.send("I think this is your job to build this..")
});


router.post('/getUserData', function(req, res) {
  res.send("I think this is your job to build this..")
});



module.exports = router;

