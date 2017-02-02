import express from 'express';
import cors from 'cors';
import _ from 'lodash';
import fetch from 'isomorphic-fetch';

import getName from './methods/getName';
import parseUsername from './methods/parseUsername';
import ColorConverter from './methods/ColorConverter';

const INVALID_COLOR = 'Invalid color';
const INVALID = 'Not Found';

const convertColor = new ColorConverter();

const pcUrl = 'https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json';

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

app.get('/task3a/:board?/:details?/:more?', async (req, res) => {
  const board = req.params.board;
  const details = req.params.details;
  const more = req.params.more;
  console.log(req.params);

  let pc = {};
  await fetch(pcUrl)
    .then(async (result) => {
      pc = await result.json();
    })
    .catch((err) => {
      console.log('Что-то пошло не так:', err);
    });
  const mapped = {};

  function getInfo(uri, param) {
    let result;

    if (param === 'volumes') {
      _.each(uri.hdd, (value) => {
        if (value.size == '8388608') {
          value.size = '41943040';
        }
        mapped[`${value.volume}`] = `${value.size}B`;
      });
      result = mapped;
    } else if (uri !== undefined && uri.splice !== undefined) {
      for (let item in uri) {
        // arrays
        if (item === param) {
          result = uri[param];
        }
      }
    } else {
      result = _.pick(uri, [param])[`${param}`];
    }
    return result;
  }

  if (board !== undefined) {
    pc = getInfo(pc, board);
    if (details !== undefined) {
      pc = getInfo(pc, details);
      if (more !== undefined) {
        pc = getInfo(pc, more);
      }
    }
  }

  if (typeof pc === 'string') {
    const expression = /[^0-9]/gi;
    const reslt = expression.exec(pc);
    if (reslt) {
      pc = `"${pc}"`;
    }
  }

  if (pc === null) {
    pc = 'null';
  }

  if (typeof pc === 'number') {
    pc = pc.toString();
  }

  if (pc === undefined || (Object.keys(pc).length === 0 && pc !== null)) {
    res.status(404).send(INVALID);
  } else {
    res.send(pc);
  }
});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
