var fixclient = require("./orderProcessing.js");
fixclient.connect()


//Example of NewSingleOrder

order = {
	 type: "SingleOrder",
     account: "Acount123",
     side: "1",
     clOrdID: "asf1235axaf",
     symbol: "EBAY",
     ordType: "1"

}
       
fixclient.send(order);

