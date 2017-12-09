const dbRw = require('./db_io/readAndWrite');

var io = null;
var sessions = [];

function startServer(httpServer) {

    io = require('socket.io')(httpServer);
    const eventBus = require('./pubsub');

    io.on('connection', function(socket) {

        sessions.push({sock : socket, user : "xxx"});

        console.log(sessions.length + " clients connected");

        socket.on('disconnect', function() {

            sessionsObj = sessions.find(function(so) 
                          { return so.sock == socket; });

            let idx = sessions.indexOf(sessionsObj);
            sessions.splice(idx, 1);
            console.log(sessions.length + " clients connected");

        });

        socket.on('session_user', function(user) {

            sessionsObj = sessions.find(function(so) 
                          { return so.sock == socket; });

            sessionsObj.user = user;

            console.log("SESSIONS:");

            sessions.forEach(function(s) { 

                console.log(s.user);
            });
        });

        socket.on('test_message', function(msg) {
            io.emit("test_reply", {content : "hello from server"});
            console.log("got message: " + msg);
        });
    });


    eventBus.on('order_report', function(report){
        io.emit('order_report', report);
    });

    eventBus.on('order_acknowledged', function(blotter){
        checkUser(blotter);
        io.emit('order_acknowledged', blotter);
    });

    eventBus.on('order_executed', function(blotter){
        io.emit('order_executed', blotter);
    });

    eventBus.on('order_canceled', function(blotter){
        io.emit('order_canceled', blotter);
    });

    eventBus.on('order_rejected', function(blotter){
        io.emit('order_rejected', blotter);
    });

    eventBus.on('new_book_entry', function(blotter){
        io.emit('new_book_entry', blotter);
    });
}


function checkUser(blotter) {

    dbRw.blotterUser(blotter, function(user) {
        console.log("SENDING TO: " + user);
    });
}

function updateSessions() {

    if (io != null) {
        io.emit('session_poll');
    }
}













module.exports = {'startServer' : startServer,
                  'updateSessions' : updateSessions
                };



