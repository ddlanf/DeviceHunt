'use strict';

const assert = require('chai').assert;
const signBunny = require('../src/sign-bunny');

describe('#signBunny', () => {
  let input;

  beforeEach(() => {
    input = 'No Moar Tests';
  });

  it('should return the complete sign bunny string with upper case letters', () => {
    assert.strictEqual(
      signBunny(input),
      '|-----------|\n| NO        |\n| MOAR      |\n| TESTS     |\n|-----------|\n(\\__/) ||\n(•ㅅ•) ||\n/ 　 づ'
    );
  });
});
