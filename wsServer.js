
function startServer(httpServer) {

    const io = require('socket.io')(httpServer);
    const eventBus = require('./pubsub');
    console.log("initialized socket.io");


    io.on('connection', function(socket) {

        console.log("client connected");

        socket.on('disconnect', function(){
          console.log('client disconnected');
        });

        socket.on('test_message', function(msg) {
            io.emit("test_reply", {content : "hello from server"});
            console.log("got message: " + msg);
        });
    });

    eventBus.on('order_sent', function(order){
        io.emit('order_sent', order);
    });

    eventBus.on('order_accepted', function(order){
        io.emit('order_accepted', order);
    });

    eventBus.on('order_executed', function(order){
        io.emit('order_executed', order);
    });
}

module.exports = {'startServer' : startServer};
