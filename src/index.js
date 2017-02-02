import express from 'express';
import cors from 'cors';
import getName from './methods/getName';
import parseUsername from './methods/parseUsername';

const app = express();
app.use(cors());

app.get('/task2a', (req, res) => {
  const sum = (+req.query.a || 0) + (+req.query.b || 0);
  res.send(sum.toString());
});

app.get('/task2b', (req, res) => {
  const fullname = req.query.fullname;

  console.log(fullname);

  let response = fullname;
  if (fullname !== 'Invalid fullname') {
    response = getName(fullname);
  }

  res.send(response);
});

app.get('/task2c', (req, res) => {
  const username = req.query.username;

  let response = username;
  if (username !== 'Invalid username') {
    response = parseUsername(username);
  }
  console.log(`${username}  { ${response} }`);
  res.send(response);
});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
