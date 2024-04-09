const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
        credentials: true
    }
});
const moment = require('moment');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    next();
});

app.use(express.static('public')); // Serve static files from the 'public' directory

const data = {
    userName: "auth.currentUser.displayName",
    recipientUserId: "recipientUserId",
    senderUserEmail: "auth.currentUser.email",
    senderUserId: "auth.currentUser.uid",
    type: "report",
    threadID: "threadID",
    threadData: "threadData",
    timestamp: moment().format(),
    isRead: false
};
const mess = {
    id: 1,
    sender: "Aliceooasods",
    subject: "Hello",
    message: "Hello, world!",
    timeSent: "2019-01-01T12:00:00"
};

app.post('/messages', (req, res) => {
    // Handle POST requests to '/messages' here
    console.log('Received a message:', req.body);
    res.sendStatus(200);
});

io.on('connection', (socket) => {
    console.log('A user connected!');

    setInterval(() => {
        socket.emit('receiveNotification', data);
        socket.emit('message1', mess);
        console.log('Mess sent to client!')
        console.log('Notification sent to client!')
    }, 1000);
});

const port = process.env.PORT || 4000;
http.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});