var net = require("net")
var parser = require("./parser")

var client = new net.Socket()
var port = 4444
var host = "localhost"
const eventBus = require('../pubsub')

const eventBus = require('../pubsub');

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

	eventBus.emit('order_accepted', data);

};

module.exports = {
	connect: function(){

		this.connected=true
		client.connect(port,host, function(){
			client.on("data",client.handler);
		});
	},

	send: function(order){
<<<<<<< HEAD
		
		if (!this.connected) throw "not conntected, please connect";
=======

		if (!this.connected) throw new Exception("not conntected, please connect");
>>>>>>> 186088148916c02f114e524781e8fab595d9ca1d
		client.write(JSON.stringify(order)+"\n");
	},


	setHandler: function(f){
		client.dataHandler=f;
	},
	connected : false
}
