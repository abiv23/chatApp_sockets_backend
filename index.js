const socket = require('socket.io');
const port = process.env.PORT || 4200;
const client = require('socket.io').listen(port).sockets;
const messageDB = require('./models/message');

client.on('connection', function(socket) {
    console.log('connected');

    socket.on('first-contact', function(data) {
        //Call the express server, it looks for a cookie in the header, if its not there it creates a new
        //account then it calls the db, then it gets the messages from the db, it
        //then sends the meaasges back here then I send them to the client
        //If there is a cookie to give to a new user I would send that along with the messages
        let obj = {
            messageRay: [{
                name: "bob",
                message: "Bob is awesomey"
            }, {
                name: "Joe",
                message: "Joe is awesomer"
            }]
        };
        client.emit('message-list', obj)
    });

    socket.on('new-message', function(data) {
        console.log(data.message);
        messageDB.save(data);
        //I could send this to the DB directly from here, but I think the Laravel back end wants to do it.

        //maybe one of the key value pairs in the object is the website, this way the clients could all decide for them selves if they want to display it

        //Or I coud make a string out of the data.url - Duh, thats the best
        socket.emit(data.url, data);
    });

    socket.on('disconnect', function() {
        console.log(socket.id);
    });

    // function getSocket(id) {
    //   let mySock = sockets[0];
    //   sockets.forEach(function(sock) {
    //     if(sock.id === id) {
    //       mySock = sock;
    //     }
    //   });
    //   return mySock;
    // }

});
