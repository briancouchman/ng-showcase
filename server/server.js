var express = require('express');
var fs = require('fs');
var csvtojson = require("csvtojson");


var app = express();

app.get('*', function(req,res,next){
	console.log("Setting common headers");
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
	next();
});


app.get('/velo/signalisation', function(req, res) {
	console.log("Path /velo/signalisation");
	res.type('application/json'); // set content-type
	
	console.log("Start converting");
	//CSV_convert_stream('data/support_velo_sigs.csv', res);

	CSV_convert('data/support_velo_sigs.csv', function(json){
		res.send(json);
	});

});

app.listen(3000);
console.log("listening on port 3000");


/*
var CSV_convert_stream = function(file, res){
	var Converter=csvtojson.core.Converter;

	var csvConverter=new Converter(false); // The parameter false will turn off final result construction. It can avoid huge memory consumption while parsing. The trade off is final result will not be populated to end_parsed event.

	var writeStream=fs.createWriteStream("outputData.json", {flags: 'w'});

	var started=false;
	writeStream.write("[\n");
	csvConverter.on("record_parsed",function(rowJSON){
		if (started){
			writeStream.write(",\n");
		}
		console.log("parsing element #" + rowJSON.INV_ID);
		writeStream.write(JSON.stringify(rowJSON));  //write parsed JSON object one by one.
		if (started==false){
			started=true;
		}
	});
	csvConverter.on("end_parsed",function(){
		writeStream.write("\n]"); //end array symbol

		fs.createReadStream("outputData.json").pipe(res);
	});

	writeStream.on('error', function (err) {
		console.log(err);
	});
	var readStream=fs.createReadStream(file); 
	csvConverter.from(readStream);
}
*/

var CSV_convert = function(file, callback){
	var Converter=csvtojson.core.Converter;

	var csvConverter=new Converter(false); // The parameter false will turn off final result construction. It can avoid huge memory consumption while parsing. The trade off is final result will not be populated to end_parsed event.

	var json = "[";
	var record = 0;

	var started=false;
	csvConverter.on("record_parsed",function(rowJSON){
		json += (started?",":"") + JSON.stringify(rowJSON);  //write parsed JSON object one by one.
		if (started==false){
			started=true;
		}
	});
	csvConverter.on("end_parsed",function(){
		json += "]"; //end array symbol

		callback.call(this, json);
	});


	var readStream=fs.createReadStream(file); 
	csvConverter.from(readStream);
}
	/*var readStream=fs.createReadStream(file); 

	var writeStream=fs.createWriteStream("outputData.json");

	var started=false;
	csvConverter.on("record_parsed",function(rowJSON){
		if (started){
			writeStream.write(",\n");
		}
		writeStream.write(JSON.stringify(rowJSON));  //write parsed JSON object one by one.
		if (started==false){
			started=true;
		}
	});

	writeStream.write("[\n"); //write array symbol

	csvConverter.on("end_parsed",function(){
		writeStream.write("\n]"); //end array symbol
	});

	csvConverter.from(readStream);

	return writeStream;
	
}*/