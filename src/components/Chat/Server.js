// server.js

const express = require('express');
const WebSocket = require('ws');
const fs = require('fs'); // Import the fs module

const app = express();
const server = require('http').createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    console.log('Received: ' + message);

    // Store the message
    fs.appendFile('aab.json', message + '\n', (err) => {
      if (err) throw err;
      console.log('The message was appended to file!');
    });

    // Broadcast the message to all clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

server.listen(3003, () => {
  console.log('Server started on port 3003');
});