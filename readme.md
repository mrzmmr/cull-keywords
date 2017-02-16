# cull-keywords

> returns an array of keywords / keyphrases from a string.

[![CircleCI](https://img.shields.io/circleci/project/github/mrzmmr/cull-keywords.svg)](https://circleci.com/gh/mrzmmr/cull-keywords/)
[![Codecov](https://img.shields.io/codecov/c/github/mrzmmr/cull-keywords.svg)](https://codecov.io/gh/mrzmmr/cull-keywords)

## Table of Contents

-   [Install](#install)
-   [Usage](#usage)
-   [API](#api)
-   [Contribute](#contribute)
-   [License](#license)

## Install

[npm:](https://www.npmjs.com/package/cull-keywords)

```js

npm i [ -S ] cull-keywords

```

## Usage

```js

const cullKeywords = require('cull-keywords')
const string = /* ... */

/* Using callbacks */
cullKeywords(string, (err, results) => {
  if (err) {
    ...
  }

  ...
}

/* Using promises */
cullKeywords(string, 'format')
  .then(results => {
    ...
  })
  .catch(err => {
    ...
  })

```

The format option removes apostrophes and replaces spaces with hyphens.

## API

### `cullKeywords(string[, options[, callback]])`

###### Parameters

-   `string` ([String] (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)) - String to work on
-   `options` ([Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) \| [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), optional) - Options object or options name as a string.
-   `callback` ([Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function), optional) - Callback function

###### Returns

[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) containing two keys, keywords and keyphrases.

`{
  keywords: [ ... ],
  keyphrases: [ ... ]
}`

[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
[![David](https://img.shields.io/david/mrzmmr/cull-keywords.svg)](https://david-dm.org/mrzmmr/cull-keywords)

## Contribute

PRs accepted and appreciated

## Dependencies

- [nlcst-to-string](https://github.com/wooorm/nlcst-to-string): Stringify NLCST
- [retext](https://github.com/wooorm/retext/tree/master/packages): Natural language processor powered by plugins
- [retext-keywords](https://github.com/wooorm/retext-keywords): Keyword extraction with Retext

## License

MIT © Paul Zimmer
