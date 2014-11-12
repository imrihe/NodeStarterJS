var userDB = require("../db/user.js");
var async = require('async');


function isUserExists(email,cb){
    userDB.findUserByEmail(email,function(err,result){
        if (err) cb(err)
        else if (!result) cb(null)
        else { //user exists! that is not good for us!
            cb({err: "email allready in use!"})
        }
    })
}


function generateToken(){
    return  Math.random().toString(36).substring(7)+Math.random().toString(36).substring(7) + "_"+new Date().getTime();
}

/**This function will create the user if the given email doesn't already exists in the database'
 * @param email String
 * @param name String
 * @param password String
 * @param cb function(err,result) this function will be called with the result or err if such occurres
 * */
function createUser(email,name,password,cb){
    async.waterfall(
        [
            function(localCB){ //check if the user exists - cb(err) in case that he doesn't
                isUserExists(email, localCB)
            },
            
            function(localCB){ //create the user - this function won't be run in case that the prev func returned error!
                addUserToDB(email,name,password,localCB);
            }
        ],
        function(err,result){  //this function will be called anyhow
            cb(err,result);
        }
    )
}


function addUserToDB(email,name,password,cb){
    var token = generateToken();
    userDB.createNewUser(name,email,password,token,cb);
}

/**
 * @param email String the email of the user to be returned
 * @param cb function(err,result) this function will be called with the result or err if such occurres
 * 
 * */
function getUserByMail(email, cb){
    userDB.findUserByEmail(email,cb);
}


/**
 * @param id String (represents mongodb object id), the _id field in the user object model
 * @param cb function(err,result) this function will be called with the result or err if such occurres
 * 
 * */
function getUserByID(id, cb){
    userDB.findUserByID(id,cb);
}



function loginUser(email, password, cb){
    var token = generateToken();
    userDB.findUserByEmail(email,function(err,result){
        if (err) cb({status: 401, err: "couldn't find user, check your email and try again",originalError: err})
        else { //user exists - let's check the password
            if (result.password == password) {
                userDB.setUserToken(token, result._id, cb);
            }else cb({status: 401, err: "Wrong Password!"})
        }
    })
}

function logoutUser(uId,cb){
    userDB.setUserToken(null, uId, function(err, result){
        if (err) cb(err)
        else if (!result) cb({err: "couldn't find user to sign out"})
        else cb(err, result._id);
    });
}


module.exports = { //those are the objects/function that this module expose (the interface)
    createUser: createUser,
    getUserByMail: getUserByMail,
    getUserByID: getUserByID,
    loginUser: loginUser,
    logoutUser: logoutUser,
}


