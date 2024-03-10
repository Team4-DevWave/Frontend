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
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//     next();
// });

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


// Handle socket connections
io.on('connection', (socket) => {
    console.log('A user connected!');

    // send notification to client every 5 seconds
    setInterval(() => {
        socket.emit('receiveNotification', data);
        console.log('Notification sent to client!')
    }, 1000);
});


const port = process.env.PORT || 4000;
http.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

