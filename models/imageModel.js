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

function listUserImages(uId, cb){
    imageDB.getImagesByUserID(uId,cb);
}

function searchImagesByKeywords(keywords, uId, cb){
    imageDB.getImagesByKeywords(keywords,uId,cb);
}

function searchImagesByFreeText(text,uId,cb){
    imageDB.searchUserImagesByText(text,uId,cb);
}

function searchImagesByCategory(cat,uId,cb){
    imageDB.getImagesByCategory(cat,uId,cb);
}

function searchImagesByTitle(title,uId,cb){
    imageDB.getImagesByTitle(title,uId,cb);
}




module.exports = {
    createImage: createImage,
    updateImageMetaData: updateImageMetaData,
    getImageData: getImageData,
    listUserImages: listUserImages,
    searchImagesByKeywords: searchImagesByKeywords,
    searchImagesByFreeText: searchImagesByFreeText,
    searchImagesByCategory: searchImagesByCategory,
    searchImagesByTitle: searchImagesByTitle
}

