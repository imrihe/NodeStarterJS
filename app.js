var express =       require('express');
var path =          require('path');
var logger =        require('morgan');
var bodyParser =    require('body-parser');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');



//TODO: add your middlewares here


//TODO: add your routres  here





app.set('port', process.env.PORT || 3000);


//TODO: here you should set the server to listen on port app.get('port') and log once the server is listenning 


