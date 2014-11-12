var express = require('express');
var router = express.Router();
//TODO: users = userModel  ->you need to cread the userModel.js file and import it to here






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

