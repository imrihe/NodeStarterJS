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

var userScheme = new Schema({
    email: {type: String, index: true},
    creationDate: Date
},{strict: false})

var model =   mongoose.model(global.conf.db.collections.users, userScheme);

/**
 * @param: email String
 * @param: cb Function(err,result)
 * @return the user object if exists 
 * */
function findUserByEmail(email,cb){
    model.findOne({email: email},function(err,result){
        if (err) cb({err: "couldn't pull user from DB",mongoError: err})
        else cb(err,tOb(result));
    })
}

/**
 * @param: id String - mongodb object id string
 * @param: cb Function(err,result)
 * @return the user object if exists 
 * */
function findUserByID(id,cb){
    model.findOne({_id: id},function(err,result){
        if (err) cb({err: "couldn't pull user from DB",mongoError: err})
        else cb(err,tOb(result));
    })
}




/**
 * @param token String
 * @param cb Function(err,result)
 * @return the user object if exists 
 * */
function findUserByToken(token,cb){
    model.findOne({token: token},function(err,result){
        if (err) cb({err: "couldn't pull user from DB",mongoError: err})
        else cb(err,tOb(result));
    })
}


/**
 * @param token String the token to be set (setting to null can be used to logout user)
 * @param uId String the uId of the user (identifier)
 * @param cb function(err,result)
 * @return the user object with the new token (on success)
 * */
function setUserToken(token,uId,cb){
    model.findOneAndUpdate({_id: uId},{'$set': {token: token}},function(err,result){
        if (err) cb({err: "couldn't update user",mongoError: err})
        else cb(err,tOb(result));
    })
}


/**
 * @param name String the name to be set
 * @param email String the email of the user (identifier)
 * @param cb function(err,result)
 * @return the user object with the new token (on success)
 * */
function setUserName(name,email,cb){
    model.findOneAndUpdate({email: email},{'$set': {name: name}},function(err,result){
        if (err) cb({err: "couldn't update user",mongoError: err})
        else cb(err,tOb(result));
    })
}


/**
 * @param name String the name to be set
 * @param email String the email to be set (key)
 * @param password String the password (hashed or not - your choice)
 * @param token String the access token for this user's session
 * @param cb function(err,result)
 * @return the user object with the new token (on success)
 * */
function createNewUser(name,email,password, token,cb){
    var user = new model({
        email: email,
        name: name,
        password: password,
        token: token,
        creationDate: new Date()
    })
    user.save(function(err,result){
        if (err) cb({err: "couldn't create user",mongoError: err});
        else cb(err,tOb(result));
    })
}





module.exports={
    findUserByEmail: findUserByEmail,
    findUserByID: findUserByID,
    findUserByToken: findUserByToken,
    setUserToken: setUserToken,
    setUserName: setUserName,
    createNewUser: createNewUser
}