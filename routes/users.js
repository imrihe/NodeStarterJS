var express = require('express');
var router = express.Router();

var userModel = require('../models/userModel.js')
var ensureAuthenticated = require('../models/auth.js').ensureAuthenticated;
//OCR: https://api.idolondemand.com/1/api/sync/ocrdocument/v1?apikey=7bac1a45-4335-45b8-8920-4044d84e2404&url=IMAGE_URL&mode=document_photo





router.post('/create', function(req, res) {
  userModel.createUser(req.param('email'),req.param('name'),req.param('password'),function(err,result){
    if (err) res.send({result:false, err: err})
    else res.send({result: true, content: result});
  })
  
});



router.post('/signIn', function(req, res) {
  userModel.loginUser(req.param('email'), req.param('password'), function(err,result){
    if (err) res.send({result: false, err: err})
    else res.send({result: true, content: result});
  })
  
});



router.post('/signOut',ensureAuthenticated, function(req, res) {
  userModel.logoutUser(req.param('uId'), function(err,result){
    if (err) res.send({result:false, err: err})
    else res.send({result: true, content: result});
  })
  
});


router.post('/getUserData',ensureAuthenticated, function(req, res) {
    res.send({result: true, content: req.user});
});



module.exports = router;

