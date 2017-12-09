const dbRw = require('./db_io/readAndWrite');

var io = null;
var sessions = [];

function startServer(httpServer) {

    io = require('socket.io')(httpServer);
    const eventBus = require('./pubsub');

    io.on('connection', function(socket) {

        sessions.push({sock : socket, user : "xxx"});

        socket.on('disconnect', function() {

            sessionsObj = sessions.find(so => so.sock == socket);

            let idx = sessions.indexOf(sessionsObj);
            sessions.splice(idx, 1);
        });

        socket.on('session_user', function(user) {

            sessionsObj = sessions.find(function(so) 
                          { return so.sock == socket; });

            sessionsObj.user = user;

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
        sendToUser(blotter, 'order_acknowledged');
    });

    eventBus.on('order_executed', function(blotter){
        sendToUser(blotter, 'order_executed');
    });

    eventBus.on('order_rejected', function(blotter){
        sendToUser(blotter, 'order_rejected');
    });

    eventBus.on('new_book_entry', function(blotter){
        io.emit('new_book_entry', blotter);
    });
}


function sendToUser(blotter, messageType) {

    dbRw.blotterUser(blotter, function(user) {

        let relevantSessions = sessions.filter(s => s.user == user)

        relevantSessions.forEach(function(s) {
            s.sock.emit(messageType, blotter);
        });
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



