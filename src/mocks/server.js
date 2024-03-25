const axios = require('axios');
const app = require('express')();
const cors = require('cors');
app.use(cors());

app.post('/login', async (req, res) => {
  const result = axios.get('http://localhost:8000/login');
  const fakeToken = 'mock-jwt-token';
  const isFound = result.data.find((user) => {
    return user.username === req.body.username && user.password === req.body.password;
  });
  if (isFound) {
    res.status(200);
    res.send(fakeToken);
  } else {
    res.status(401);
    res.send('Invalid username or password');
  }

});


app.listen(8080, () => {
  console.log('Mock Server is running');
});