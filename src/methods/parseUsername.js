const INVALID = 'Invalid username';

function getName(username = INVALID) {
  let result;

  if (username === INVALID) {
    result = INVALID;
    return result;
  }

  const expression = /(?:^|[@/])((?:\w+\.(?!com))?(?:\b\w+\b))(?:$|[?\s/])/gi;
  const matches = expression.exec(username);

  if (matches !== null) {
    result = `@${matches[1]}`;
  } else {
    result = INVALID;
  }

  return result;
}

module.exports = getName;
