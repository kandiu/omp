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
    else if (status == 8) {
        processAsRejected(obj);
    }
};


function processAsNew(report) {

    setBlotterFields(report, function() {

        let order_id = report.clOrdID.value;

        dbRw.readBlotter(order_id, function(found) {
            eventBus.emit("order_acknowledged", found);
        });
    });
}

function processAsRejected(report) { 

    setBlotterFields(report, function() {

        let order_id = report.clOrdID.value;

        dbRw.readBlotter(order_id, function(found) {
            eventBus.emit("order_rejected", found);
        });
    });
}

function processAsExecution(report) {

    let order_id = report.clOrdID.value;

    setBlotterFields(report, function() {

        addBookEntry(report, function() {

            dbRw.readBlotter(order_id, function(found) {

                eventBus.emit("order_executed", found);
            });       
        });
    });   
}


function setBlotterFields(report, next) {

    let order_id = report.clOrdID.value;

    let data = {

        external_order_id : report.orderID.value,
        timestamp : parseDateString(report.sendingTime.value),
        broker : report.senderCompID.value
    };

    if (report.ordStatus.value == 0)
        data.status = "new";
    else if (report.ordStatus.value == 8)
        data.status = "rejected";
    else if (report.ordStatus.value == 2) {
        data.status = "fill";
        data.price = report.lastPx.value;
        data.quantity = report.cumQty.value;
    }

    dbRw.updateBlotter(order_id, data, next);   
}

function addBookEntry(report, next) {

    next();
}


function parseDateString(dateString) {

    let Y = dateString.substring(0,4);
    let M = dateString.substring(4,6);
    let D = dateString.substring(6,8);
    let h = dateString.substring(9,11);
    let m = dateString.substring(12,14);
    let s = dateString.substring(15,17);
    let ms = dateString.substring(18,21);
    
    let date = new Date(Y,M,D,h,m,s,ms);

    console.log("DATE STRING: " + dateString);
    console.log("DATE: " + date);

    return date;
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
