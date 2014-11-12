var mongoose = require('mongoose');


 var options = {
        server:{
            poolSize: 10,
            auto_reconnect: true,
            socketOptions:{
                keepAlive: 200,
                connectTimeoutMS:20000 //3600000,
                //keepAlive: 36000,
                //socketTimeoutMS:36000 //3600000    putting this will terminate the connection after 36 seconds!! NOTE
            }
        },
        logger: console
    };

var dbURI ='mongodb://'+conf.db.dbhost+':'+conf.db.dbport+'/'+conf.db.dbname;
    
    
    

var con = mongoose.connection;
con.on('error', console.error.bind(console, 'MongoDB connection error:')); //TODO: check error handling
con.on('connecting', function() {
    console.log('connecting to MongoDB...');
});
con.on('connected', function() {
    console.log('MongoDB connected!');
});
con.once('open', function() {
    console.log('MongoDB connection opened!');
});
con.on('reconnected', function () {
    console.log('MongoDB reconnected!');
});
con.on('disconnected', function() {
    console.warn('MongoDB disconnected!');
   // global.adminNotifier.mailAdmin({msg: "mongo db disconnected",date: new Date()}, 'mongoDB disconnected')
    setTimeout(function(){
        mongoose.connect(dbURI, options);
    },1000*5)

});


var  db = mongoose.connect(dbURI,options,  function(err)
{
    if (err){
        console.error("connection problem!! ", err);
        mongoose.disconnect();
    }
    else{
        console.log("mongoDB connection: ", true);
    }
});    