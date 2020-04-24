'use strict';

const fs = require('fs');
const path = require('path');
const assert = require('chai').assert;
const exec = require('child_process').exec;

describe('Integration Tests', () => {
  let output;

  beforeEach(() => {
    const outputFixturePath = path.resolve(__dirname, 'fixtures', 'output.txt');
    output = fs.readFileSync(outputFixturePath, {
      encoding: 'utf8'
    });
  });

  it('outputs the correct sign bunny', (done) => {
    let worker = exec('./bin/sign-bunny no moar tests', (_error, stdout) => {
      assert.strictEqual(stdout, output);
    });

    worker.on('close', () => {
      done();
    });
  });
});
