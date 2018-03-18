var express = require('express');
var router = express.Router();
var app = express();
var http = require('http');
var port = process.env.PORT || 8080;
var cors = require('cors');
var bodyParser = require('body-parser')

//Functions
var functions = require('./lib/functions')

//Live Stream URL
var urlStream = 'http://10.104.10.84:8090/';


app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(cors());

app.get('/', function(req,res,next){
    res.next();
})


app.get('/api/video', function(req,res,next){
    res.send(urlStream);
    res.next();
})

app.post('/api/motion/', function(req,res){

    var motionString  = req.body.type;
    console.log(motionString);
    if(motionString == "STAT")
    {
        functions.initialMovement();
        res.sendStatus(200);
    }
    else if(motionString == "FWRD")
    {
        functions.updateUp(true);
        res.sendStatus(200);
    }
    else if(motionString == "BACK")
    {
        functions.updateDown(true);
        res.sendStatus(200);
    }
    else if(motionString == "LEFT")
    {
        functions.updateLeft(true);
        res.sendStatus(200);
    }
    else if(motionString == "RGHT")
    {
        functions.updateRight(true);
        res.sendStatus(200);
    }
    else
    {
        res.send("Command not found!");
    }
})

// Server Running
app.listen(port);
console.log('The server is running on: ' + port);
