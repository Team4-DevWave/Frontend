const axios = require('axios');
const app = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser');
const { log } = require('console');
app.use(bodyParser.json());
app.use(cors());

app.post('/login', async (req, res) => {
  console.log('Request received:', req.body);
  const result = await axios.get('http://localhost:8000/users');
  console.log('Result:', result.data);
  const fakeToken = 'mock-jwt-token';
  const isFound = result.data.find((user) => {
    return user.username === req.body.username && user.password === req.body.password;
  });
  if (isFound) {
    console.log('User is found');
    res.status(200);
    res.send(fakeToken);
  } else {
    console.log('User is not found');
    res.status(201);
    res.send('Invalid username or password');
  }

});

app.post('/signup', async (req, res) => {
  console.log('Request received:', req.body);
  const result = await axios.get('http://localhost:8000/users');
  console.log('Result:', result.data);
  const isFound = result.data.find((user) => {
    return user.username === req.body.username;
  });
  if (isFound) {
    console.log('User is found');
    res.status(201);
    res.send('Username already exists');
  } else {
    console.log('User is not found');
    await axios.post('http://localhost:8000/users', {id:result.data.length+1,...req.body});
    res.status(200);
    res.send('User created');
  }
});

app.get('/notifications', async (req, res) => {
  console.log('Request received:', req.body);
  const result = await axios.get('http://localhost:8000/notifications');
  console.log('Result:', result.data);
  res.status(200);
  res.send(result.data);
});
app.post('/community', async (req, res) => {
  console.log('Request received:', req.body);
  const result = await axios.get('http://localhost:8000/communities');
  console.log('Result:', result.data);
  await axios.post('http://localhost:8000/communities', {id:result.data.length+1,...req.body});
  res.status(200);
  res.send('Community created');
});


app.listen(8080, () => {
  console.log('Mock Server is running');
});