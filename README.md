# jesuis
[![git][git-badge]][git-url]
[![npm][npm-badge]][npm-url]

Library for JSON parsing based on value or object matching. Outputs lineage trace as state progressed during search.

* [Example](#example)
* [Reading Output](#output)
* [License](#license)

<a name="example"></a>
## Example
Check out the [example.js][example] and [test.js][test] files for more examples. 
```js
var jesuis = require('jesuis');

var y = {
	a: 1,
	b: [1,2],
	c: [3,4,{b: true}]
}

jesuis.start(y, {b: true});
```

<a name="output"></a>
## Reading Output

The outupt is written to ./tmp/jesuis.json file for accomodating drill-down analysis to identify the origin of the matched items. Lineage trace is stored per object in the `json[idx].ancestors` array, and that you may inspect for deciphering the origin of the JSON object the term was matched.

The example above would generate the following output:
```js
[
    {
        "objectSearch": true,
        "node": {
            "b": true
        },
        "ancestors": [
            "root",
            {
                "a": 1,
                "b": [
                    1,
                    2
                ],
                "c": [
                    3,
                    4,
                    {
                        "b": true
                    }
                ]
            },
            [
                1,
                2
            ],
            [
                3,
                4,
                {
                    "b": true
                }
            ],
            {
                "b": true
            }
        ],
        "matches": {
            "b": true
        },
        "match": {
            "b": true
        }
    }
]
```

## License
aug2uag © 2015, Licensed under [MIT][].

[MIT]: ./LICENSE
[example]: ./example.js
[test]: ./test.js

[git-badge]: https://img.shields.io/github/release/aug2uag/jesuis.svg?style=flat-square
[git-url]: https://github.com/aug2uag/jesuis/releases
[npm-badge]: https://img.shields.io/npm/v/jesuis.svg?style=flat-square
[npm-url]: https://npmjs.org/package/jesuis
