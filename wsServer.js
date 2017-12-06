
function startServer(httpServer) {

    const io = require('socket.io')(httpServer);
    const eventBus = require('./pubsub');
    console.log("initialized socket.io");


    io.on('connection', function(socket) {

        console.log("client connected");

        socket.on('disconnect', function(){
          console.log('client disconnected');
        });

        socket.on('test-message', function(msg) {
            console.log("got message: " + msg);
        });
    });
}

module.exports = {'startServer' : startServer};
