// const express = require('express');
// const http = require('http');
// const socketIO = require('socket.io');

// const app = express();
// const server = http.createServer(app);
// const io = socketIO(server);

// let messages = [];

// app.use(express.json());

// app.post('/send', (req, res) => {
//     const message = req.body;
//     console.log('Message received:', message);

//     messages.push(message);
//     io.emit('message', message);
//     res.status(200).send();

// });

// app.get('send', (req, res) => {
//     res.status(405).send('Method Not Allowed'); 
// });

// server.listen(3001, () => {
//     console.log('Serverss is running on port 3001');
// });



const express = require('express');
const fs = require('fs');

const app = express();
const port = 3001;

app.get('/posts', (req, res) => {
    fs.readFile('Db.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).json({ error: 'An error occurred while reading the file.' });
        }
        console.log('Raw data read from file:', data);
        const jsonData = JSON.parse(data);
        console.log('Data read from file:', jsonData);
        const posts = jsonData.posts;

        res.json(posts);
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});