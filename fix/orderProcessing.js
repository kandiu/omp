var net = require("net")
var parser = require("./parser")

var client = new net.Socket()
var port = 4444
var host = "localhost"

client.handler = function(data){
	client.dataHandler(data);
};

client.dataHandler = function(data){
	let obj = JSON.parse(data);
	obj = Object.assign({},obj.header.fields,obj.fields);
	obj=parser.tagsToNames(obj)

	for (x in obj){
		obj[x]["value"]=obj[x]["object"];

		delete obj[x]["object"];
		delete obj[x]["isCalculated"]
	}
	
	data = JSON.stringify(obj,null,4);
	console.log("Received:" +data);
};

module.exports = {
	connect: function(){
		client.connect(port,host, function(){
			client.on("data",client.handler);
		});
	},

	send: function(order){
		if (!this.connected) return;
		client.write(JSON.stringify(order)+"\n");
	},


	setHandler: function(f){
		client.dataHandler=f;
	},
	connected : false
}


