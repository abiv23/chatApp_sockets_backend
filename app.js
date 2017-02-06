const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const userRoutes = require('./routes/user');
const roomRoutes = require('./routes/room');
const messageRoutes = require('./routes/message');

app.use(bodyParser.json());
app.use(cors());

app.use('/api/users', userRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/messages', messageRoutes);


app.listen(5200, function () {
  console.log('app listening on port 5200');
});
