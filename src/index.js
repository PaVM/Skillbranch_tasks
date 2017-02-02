import express from 'express';
import cors from 'cors';
import getName from './methods/getName';
import parseUsername from './methods/parseUsername';
import ColorConverter from './methods/ColorConverter';

const INVALID_COLOR = 'Invalid color';
const convertColor = new ColorConverter();

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

app.get('/task2d', (req, res) => {
  const color = req.query.color;
  let converted = INVALID_COLOR;
  // console.log(encodeURIComponent(color));
  if (color !== undefined) {
    converted = convertColor.convert(color);

    if (converted !== INVALID_COLOR) {
      converted = `#${converted}`;
    }
  }
  console.log(`${color} { ${converted} }`);
  res.send(converted);
});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
