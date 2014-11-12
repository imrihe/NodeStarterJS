var userModel = require("./userModel.js");


/**This function will authenticate the user using the userModel and will add the user object the req object and the uId to the req.body object
 * in case that the user is not authenticated the method will call next(401)
 * @param req express.js request object
 * @param req express.js response object
 * @param next express.js next middlware
 * */
function ensureAuthenticated(req,res,next){
    var auth = req.param('auth');
    if (!auth)  next({status: 401})
    else{
        userModel.getUserByID(auth.uId,function(err,result){
            //console.log(err,result);
            if (err) next(err)
            else if (!result)  next({status: 401})
            else{
                if (result.token && result.token == auth.token){ //can add here check of expiration date and more verifications
                    console.log("User authenticated!")
                    req.user = result;
                    delete req.user['password'] //we don't want to expose the password.. event it it is hashed!
                    req.body.uId = result._id;
                    next();
                }else {
                    console.log("Wrong Authentication!")
                    next({status: 401})
                }
            }
        })
    }
    
}







module.exports = {
    ensureAuthenticated: ensureAuthenticated
    
}