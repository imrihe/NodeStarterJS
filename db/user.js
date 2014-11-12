var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId; //data type

//always run this method on the DB results before moving on.. it will save you lot's of troubles
var tOb = function(doc){
    try{
        return doc.toObject()
    }catch(e){
        return doc;
    }
}

var userScheme = new Schema({
    email: {type: String, index: true},
    creationDate: Date
},{strict: false})

var model =   mongoose.model(global.conf.db.collections.users, userScheme);




module.exports={
    //TODO: add your exported methods here
}