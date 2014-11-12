var imageDB = require("../db/image.js")


function createImage(imgName, cb){
    imageDB.addImage(imgName,cb);
}


function updateImageMetaData(imgName,data,cb){
    data.keywords = data.keywords.split(',');
    imageDB.setImageMetDataByName(imgName,data,cb);
}

function getImageData(imgName, cb){
    imageDB.getImageDataByName(imgName,cb);
}




module.exports = {
    createImage: createImage,
    updateImageMetaData: updateImageMetaData,
    getImageData: getImageData,
}
