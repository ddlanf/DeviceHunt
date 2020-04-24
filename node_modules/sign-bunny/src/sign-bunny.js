'use strict';

const buildSign = require('./build-sign');

function signBunny(input) {
  const inputArr = input.toUpperCase().split(' ');

  return buildSign(inputArr);
}

module.exports = signBunny;
