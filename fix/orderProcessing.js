var net = require("net")
var parser = require("./parser")
var translate = require("../db_io/translations")
var dbRw = require("../db_io/readAndWrite");

var client = new net.Socket()
var port = 4444
var host = "localhost"

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

    eventBus.emit("order_report", obj);

    let status = obj.ordStatus.value;
    
    if (status == 0) {
        processAsNew(obj);
    }
    else if (status == 2) {
        processAsExecution(obj);
    }
    else if (status == 4) {
        processAsCanceled(obj);
    }
    else if (status == 8) {
        processAsRejected(obj);
    }


};


function processAsNew(order) {

//    let dbObj = translate.reportToBlotter(order);

//    dbRw.writeBlotter(dbObj, function(saved) {
//        dbRw.readBlotter(saved.order_id, function(found) {
            eventBus.emit("order_acknowledged", order);
//        });
//    });
}

function processAsExecution(order) {

    let dbObj = translate.reportToFillOrCancel(order);

    dbRw.writeFillOrCancel(dbObj, function(saved) {
        dbRw.readFillOrCancel(saved.order_id, function(found) {
            eventBus.emit("order_executed", found);
        });
    });
}

function processAsCanceled(order) {

    let dbObj = translate.reportToFillOrCancel(order);

    dbRw.writeFillOrCancel(dbObj, function(saved) {
        dbRw.readFillOrCancel(saved.order_id, function(found) {
            eventBus.emit("order_canceled", found);
        });
    });
}

function processAsRejected(order) {

    eventBus.emit("order_rejected", order);
}


module.exports = {
	connect: function(){

		this.connected=true
		client.connect(port,host, function(){
			client.on("data",client.handler);
		});
	},

	send: function(order){		
		if (!this.connected) throw "not conntected, please connect";

		client.write(JSON.stringify(order)+"\n");
	},


	setHandler: function(f){
		client.dataHandler=f;
	},
	connected : false
}
