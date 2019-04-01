const express = require('express');
const bodyParser = require('body-parser');
const Pusher = require('pusher');
const port = 3000;

const app = express();

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Session middleware
// Create an instance of Pusher

const pusher = new Pusher({
    appId: '603251',
    key: 'febfd391ce813c0c755c',
    secret: '958f29ea54ab81eb875d',
    cluster: 'ap2',
    encrypted: true
});

// get authentictation for the channel;
app.post("/pusher/auth", (req, res) => {
   const socketId = req.body.socket_id;
   const channel = req.body.channel_name;
   var presenceData = {
       user_id:
            Math.random().toString(36).slice(2) + Date.now()
   };
   const auth = pusher.authenticate(socketId, channel, presenceData);
   res.send(auth);
});

app.get('/', (req,res) => {
   return res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
   return console.log('listening on %d', port);
});