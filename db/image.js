var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId; //data type
var tOb = function(doc){
    try{
        return doc.toObject()
    }catch(e){
        return doc;
    }
}

var imageScheme = new Schema({
    name: {type: String, unique: true},
    freeText: {type: String},
    title: {type: String},
    creationDate: Date,
    uId: Object,
},{strict: false})


imageScheme.index({ freeText: 'text',title: 'text',keywords: 1});
var model =   mongoose.model(global.conf.db.collections.images, imageScheme);


/**add image to the database with minimum name and userId
 * @name String the file name of the image
 * @userId String, user id that was returned during the user creation
 * @param: cb Function(err,result)
 * */
function addImage(name,cb){
    var image = new model({
        name: name,
        creationDate: new Date()
    })
    image.save(function(err,result){
        if (err) cb({err: "couldn't add image to DB",mongoError: err})
        else cb(err,tOb(result));
    })
}


/**get data of image by image file name
 * @name String the file name of the image
 * @param: cb Function(err,result)
 * */
function getImageDataByName(name,cb){
    model.findOne({name : name},function(err,result){
        if (err) cb({err : "couldn't get image from DB", mongoError: err})
        else cb(err,tOb(result));
    })
}


/**set meta data for image - by it's id (returned on image creation / getImageDataByName)'
 * @id String, id of the image
 * @data Object {title: String, freeText: String, keywords: Array{String}, category: String}
 * @param: cb Function(err,result)
 * */
function setImageMetDataById(id,data,cb){
    model.findOneAndUpdate({_id: id},{
        '$set': 
            {
               title: data.title || "",
                freeText: data.freeText || "",
                keywords: data.keywords || "",
                category: data.category || "",
                uId: data.uId || null
            }  
        },function(err,result){
            if (err || !result) cb({err : "couldn't set image data in DB", mongoError: err || "can't find image"})
            else cb(err,tOb(result));
        })
}


/**set meta data for image - by it's name (returned on image creation)'
 * @nameString, the name of the image
 * @data Object {title: String, freeText: String, keywords: Array{String}, category: String}
 * @param: cb Function(err,result)
 * */
function setImageMetDataByName(name,data,cb){
    model.findOneAndUpdate({name: name},{
        '$set': 
            {
                title: data.title || "",
                freeText: data.freeText || "",
                keywords: data.keywords || "",
                category: data.category || "",
                uId: data.uId || null
            }  
        },function(err,result){
            if (err || !result) cb({err : "couldn't set image data in DB", mongoError: err || "can't find image"})
            else cb(err,tOb(result));
        })
}

/**get image data by the creating user id'
 * @uId String, id of the user
 * @param: cb Function(err,result)
 * */
function getImagesByUserID(uId,cb){
    model.find({uId : uId},function(err,result){
        if (err) cb({err : "couldn't get images from DB", mongoError: err})
        else cb(err,tOb(result));
    })
}


/**search the db by given set of keywords (array of strings or a string)'
 * @keywordsArray Array || String, keywords to search by
 * @param: cb Function(err,result)
 * */
function getImagesByKeywords(keywordsArray,uId,cb){
    if (!Array.isArray(keywordsArray))  keywordsArray = [keywordsArray] //cast to array
    var query = {keywords : {'$in': keywordsArray}}
    if (uId) query.uId = uId
    model.find(query, 
        function(err,result){
            if (err) cb({err: "couldn't get images from DB", mongoError: err})
            else cb(err,tOb(result));
        })
}




/**get images of given category'
 * @category Array || String, keywords to search by
 * @uId String, filter the search results - show only data created by the given uId (send null if not needed to filter)
 * @param: cb Function(err,result)
 * */
function getImagesByCategory(category,uId,cb){
    var query = {
     category: category   
    }
    if (uId) query.uId = uId
    model.find(query,    
        function(err,result){
            if (err) cb({err: "couldn't get images from DB", mongoError: err})
            else cb(err,tOb(result));
        })
}

/**get images with the given title (by substring)'
 * @category Array || String, keywords to search by
 * @uId String, filter the search results - show only data created by the given uId (send null if not needed to filter)
 * @param: cb Function(err,result)
 * */
function getImagesByTitle(title,uId,cb){
    var query = {
     title: new RegExp(".*"+title+".*")
    }
    if (uId) query.uId = uId
    model.find(query,    
        function(err,result){
            if (err) cb({err: "couldn't get images from DB", mongoError: err})
            else cb(err,tOb(result));
        })
}


/**search the db by search string (will search title and freeText. search only the images created by the given userId'
 * @text String a text string (@see http://docs.mongodb.org/manual/reference/operator/query/text/#op._S_text)
 * @uId String, filter the search results - show only data created by the given uId
 * @param: cb Function(err,result)
 * */
function searchUserImagesByText(text,uId,cb){
    var query = {
  
            '$text': {'$search': text},
      
    }
    if (uId) query.uId = uId;
    model.find(query,
    function(err,result){
         if (err) cb({err: "couldn't get images from DB", mongoError: err})
        else cb(err,tOb(result));
    })
}

module.exports = {
    addImage : addImage,
    getImageDataByName : getImageDataByName,
    setImageMetDataById : setImageMetDataById,
    setImageMetDataByName: setImageMetDataByName,
    getImagesByUserID : getImagesByUserID,
    getImagesByKeywords : getImagesByKeywords,
    searchUserImagesByText : searchUserImagesByText,
    getImagesByCategory: getImagesByCategory,
    getImagesByTitle : getImagesByTitle
}