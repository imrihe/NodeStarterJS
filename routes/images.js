var express = require('express');
var router = express.Router();
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({uploadDir: global.conf.imagesDir});



router.post('/upload', multipartMiddleware, function(req, res) {
  var fileName  = (req.files[0] && req.files[0].path.split('/').pop())
                  || (req.files['fileName'] && req.files['fileName'].path.split('/').pop())
  if (!fileName){
    res.send({err: "Image is empty! You should send an image if you want to upload one."});
  }else{
      res.send({result: true, fileName: fileName});
  }
  
});




module.exports = router;

