const INVALID = 'Invalid fullname';

function parseName(fullname) {
  let result;
  let short;

  short = decodeURI(fullname).split(' ');

  if (short.length > 3) {
    result = INVALID;
    return result;
  }

  if (short.length === 1) {
    if (!short[0]) {
      result = INVALID;
    } else {
      result = short[0];
    }
  } else if (short.length === 2) {
    short.unshift(short.pop());
    short[1] = `${short[1].substring(0, 1)}.`;
  } else {
    short[0] = `${short[0].substring(0, 1)}.`;
    short[1] = `${short[1].substring(0, 1)}.`;
    short.unshift(short.pop());
  }

  if (result !== INVALID) {
    short = short.map((item) => {
      let newItem = item;
      newItem = newItem.toLowerCase();
      newItem = newItem.replace(newItem[0], newItem[0].toUpperCase());
      return newItem;
    });

    result = short.join(' ');
  }
  return result;
}

function getName(fullname = INVALID) {
  let result;

  if (fullname === INVALID) {
    result = INVALID;
    return result;
  }

  const expression = /(([0-9]+)|([^a-zA-ZА-Яа-я'\s]\B)|(\b[']\b)|(\b(?:\/)))/gi;
  const replaceExp = /\s{2,}/gi; // replace spaces
  const matches = fullname.match(expression);

  if (matches !== null) {
    result = INVALID;
  } else {
    result = parseName(fullname.trim().replace(replaceExp, ' '));
  }
  return result;
}

module.exports = getName;
