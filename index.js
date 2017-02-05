const socket = require('socket.io');
const port = process.env.PORT || 3000;
const client = require('socket.io').listen(port).sockets;

client.on('connection', function(socket) {
    console.log('connected');

    socket.on('first-contact', function(data) {
      console.log('im here');
        //Call the Laravel server, it looks for a cookie in the header,
        //If it is there it gets the name associated with the cookie
        //if its not there it creates a cookie and unique name
        //then it gets the messages from the db, it then sends the messages back here then I send them to the client
        //If there is a cookie to give to a new user I would send that along with the messages (and the name too)
        let obj = {
            messageRay: [{
                name: "mob",
                message: "Bob0 is awesomey"
            }, {
                name: "Moe",
                message: "Mary is my friend"
            }],
            name: "MJB",//The name comes from Laravel Server
            isCookie : true //This is because there is gonna be a cookie set right here, I just dont know how to do that
        };
        client.emit('message-list-and-name', obj)
    });

    socket.on('send-message', function(data) {
        console.log(data);
        //The trick here is that the data.url is the name of the event
        //This makes it so tht only the people at that website recieve it
        socket.emit(data.url, data);
    });

    socket.on('disconnect', function() {
        console.log(socket.id);
    });

});
