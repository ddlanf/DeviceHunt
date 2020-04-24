[![Build Status](https://travis-ci.org/ryanbahniuk/sign-bunny.svg?branch=master)](https://travis-ci.org/ryanbahniuk/sign-bunny)

# Sign Bunny

> A package to create a sign bunny character.

    |￣￣￣￣￣￣|
    | BEST     |
    | NPM      |
    | PACKAGE  |
    | EVER     |
    |＿＿＿＿＿＿|
    (\__/) ||
    (•ㅅ•)  ||
    / 　 づ

## Installation

Install via npm:

 ```sh
npm install sign-bunny
 ```

## Using this Package

The `sign-bunny` module returns a function that takes a string and returns the sign bunny ASCII art as a new line separated string:

```js
var signBunny = require('sign-bunny');

var asciiArt = signBunny('Best NPM Package Ever');
```

## CLI

You can also use the CLI `sign-bunny <string>`.


## Contributing

Pull requests are welcome. If you add functionality, then please add unit tests
to cover it. Continuous Integration is handled by [Travis](https://travis-ci.org/ryanbahniuk/sign-bunny "Travis").

## License

MIT © Ryan Bahniuk

[ci]:      https://travis-ci.org/ryanbahniuk/sign-bunny
[npm]:     https://www.npmjs.com/package/sign-bunny

