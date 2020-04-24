'use strict';

const MAX_SIGN_WIDTH = 13;
const LINE_DELIMITER = '\n';

function buildBunny() {
  return '(\\__/) ||\n(•ㅅ•) ||\n/ 　 づ';
}

function buildSignBoundary() {
  return `|${'-'.repeat(MAX_SIGN_WIDTH - 2)}|`;
}

function buildMiddleOfSign(inputArr) {
  const lines = inputArr.map((word) => {
    if (word.length > (MAX_SIGN_WIDTH - 3)) throw 'One of your words is too long.'
    return `| ${word}${' '.repeat(MAX_SIGN_WIDTH - 3 - word.length)}|`;
  });
  return lines.join(LINE_DELIMITER);
}

function buildSign(inputArr) {
    return [
            buildSignBoundary(),
            buildMiddleOfSign(inputArr),
            buildSignBoundary(),
            buildBunny()
           ].join(LINE_DELIMITER);
}

module.exports = buildSign;
