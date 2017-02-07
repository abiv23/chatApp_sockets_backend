const socket = require('socket.io');
const port = process.env.PORT || 4200;
const client = require('socket.io').listen(port).sockets;
// const messageDB = require('./models/message');

let messages = [{
    name: "mob",
    message: "Bob0 is awesomey"
}, {
    name: "Moe",
    message: "Mary is my friend"
}]

client.on('connection', function(socket) {
  console.log('connected');

  socket.on(`new-user`, function(data) {
    client.emit(`${data.url}-add-new-user`, data);
  });

  socket.on('first-contact', function(data) {
    //This needs to be rethought now that we arent useing cookies
      let obj = {
          messageRay: messages,
          name: "MJB",
          socketId: socket.id
      };
      socket.emit('start-up-info', obj)
  });


  // socket.on('send-message', function(data) {
  //     console.log(data);
  //     //The trick here is that the data.url is the name of the event
  //     //This makes it so tht only the people at that website recieve it
  //     messages.push(data);
  //     console.log(messages);
  //     client.emit(`${data.url}-send-message`, data);
  // });

  socket.on('new-message', function(data) {
      console.log(data.message);
      // messageDB.save(data);
      client.emit(`${data.url}-new-message`, data);
  });

  socket.on('disconnect', function() {

      socket.emit(`disconnect-event`, {id: socket.id});
      console.log(socket.id);
  });

});
