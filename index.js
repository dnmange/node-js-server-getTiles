/*
* Author: Darshan Mange
* Description: get image content from image url and send data back in encoded form using base64 Encoding
* Date: 10th November 2017
*/

var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');

var request = require('request').defaults({ 
	encoding: null 
});


app.set('port', (process.env.PORT || 5000));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

/*Allowing "https://www.dronedeploy.com"  to access getTiles and parse each request in json format using bodyParser*/
app.use(express.static(__dirname + '/public'));
app.use(function(req, res, next) {                    
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.json()); 

/*Post request to get encoded data*/
app.post('/getTiles',function(req, response){
	console.log("hey there");
	var tiles = req.body;
	var encodedTileData = [];
	var count = 0;
	for(var i=0;i<tiles.length;i++){
		request(tiles[i], function(error, res, body){
	     	var toBase64 = body.toString('base64');
	        encodedTileData.push(toBase64);
	        count++;
	        if(count==tiles.length){
	        	response.send(encodedTileData);
	        }
	 	});
	}
});

//server listening
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
