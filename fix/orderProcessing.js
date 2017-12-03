var net = require("net")
var client = new net.Socket()
var port = 4444
var host = "localhost"

client.handler = function(data){
	client.dataHandler(data);
};

client.dataHandler = function(data){
	console.log("Received:" +data);
};

module.exports = {
	connect: function(){

		client.connect(port,host, function(){
			client.on("data",client.handler);
		});
	},

	send: function(message){
		if (message[message.length-1]!='\n')
			message+="\n";

		client.write(message);
	},


	setHandler: function(f){
		client.dataHandler=f;
	},

	processOrder: function(order){
		
	}
}

// Dummie module: TODO implement FIX interface

/*module.exports.processOrder = function(order) {

    let logText = "\n  ********************\n" +
                    "  * PROCESSING ORDER *\n" +
                    "  ********************\n\n";

   
    for (let field in order)
        logText += "  " + field + " : " + order[field] + "\n";

    logText += "\n";

    console.log(logText);
}*/

