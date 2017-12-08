
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


    eventBus.on('order_report', function(order){
        io.emit('order_report', order);
    });

    eventBus.on('order_acknowledged', function(order){
        io.emit('order_acknowledged', order);
    });

    eventBus.on('order_executed', function(order){
        io.emit('order_executed', order);
    });

    eventBus.on('order_canceled', function(order){
        io.emit('order_canceled', order);
    });

    eventBus.on('order_rejected', function(order){
        io.emit('order_rejected', order);
    });

    eventBus.on('new_book_entry', function(order){
        io.emit('new_book_entry', order);
    });
}

module.exports = {'startServer' : startServer};
