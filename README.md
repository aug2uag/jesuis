# jesuis
[![travis][travis-badge]][travis-url]
[![git][git-badge]][git-url]
[![npm][npm-badge]][npm-url]

Library for JSON parsing currently based on value or object matching. Input object and search term, outputs array with matches that contain lineage traces as state progressed during the search.

* [Install](#install)
* [Example](#example)
* [Reading Output](#output)
* [TODO](#todo)
* [License](#license)

<a name="install"></a>
## Install

```
npm install jesuis --save
```

<a name="example"></a>
## Example
Check out the [example.js][example] and [test.js][example] files for examples how to run. 
```js
'use strict'

var jesuis = require('jesuis');

var y = {
	a: 1,
	b: [1,2]
}

jesuis.start(y, {b: true});
```

<a name="output"></a>
## Reading Output

The outupt is written to ./tmp/jesuis.json file for accomodating drill-down analysis to identify the origin of the matched items. Lineage trace is stored per object in the `json[idx].ancestors` array, and that you may inspect for deciphering the origin of the JSON object the term was matched.

## TODO

- Add options for output
- Expand functions/API
- Optimize search

## License
aug2uag © 2015, Licensed under [MIT][].

[MIT]: ./LICENSE
[example]: ./example.js
[test]: ./test.js

[travis-badge]: https://img.shields.io/travis/aug2uag/jesuis.svg?style=flat-square
[travis-url]: https://travis-ci.org/aug2uag/jesuis
[git-badge]: https://img.shields.io/github/release/aug2uag/jesuis.svg?style=flat-square
[git-url]: https://github.com/aug2uag/jesuis/releases
[npm-badge]: https://img.shields.io/npm/v/jesuis.svg?style=flat-square
[npm-url]: https://npmjs.org/package/jesuis
