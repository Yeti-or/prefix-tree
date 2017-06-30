prefix-tree
===========

Simple prefix-tree

[![NPM Status][npm-img]][npm]
[![Travis Status][test-img]][travis]
[![Coverage Status][coverage-img]][coveralls]
[![Dependency Status][dependency-img]][david]

[npm]:            https://www.npmjs.org/package/prefix-tree
[npm-img]:        https://img.shields.io/npm/v/prefix-tree.svg

[travis]:         https://travis-ci.org/Yeti-or/prefix-tree
[test-img]:       https://img.shields.io/travis/Yeti-or/prefix-tree.svg?label=tests

[coveralls]:      https://coveralls.io/r/Yeti-or/prefix-tree
[coverage-img]:   https://img.shields.io/coveralls/Yeti-or/prefix-tree.svg

[david]:          https://david-dm.org/Yeti-or/prefix-tree
[dependency-img]: http://img.shields.io/david/Yeti-or/prefix-tree.svg


Class to work with [prefix tree](https://en.wikipedia.org/wiki/Trie).
API is similiar to native Map.

Installation
------------

```sh
npm install --save prefix-tree
```

Usage
-----

```js
var Tree = require('prefix-tree');

var tree = new Tree([['hi', 42,] ['hello', 'world'], ['xo', 'xo']]);

tree.get('h');
// → [ 42, 'world']

tree.set('xxx', { '42': 42 });
tree.get('x');
// → [ 'xo', { '42': 42 }]
```

API
---

* [prefixTree(items)](#prefixTreeitems)
* [set(key, value)](#setkey-value)
* [get(prefix)](#getprefix)
* [toString()](#toString)

### prefixTree(items)

Parameter         | Type     | Description                         
------------------|----------|------------------------------------
`items`           | `array`  | optional Array of key-value pairs   

Example:

```js
var tree = new PrefixTree([ ['key', 'value'], ['key2', 'value2'] ]);
var tree2 = new PrefixTree();
```

### set(key, value)

Parameter | Type     | Description
----------|----------|--------------------------------------------------------
`key`     | `string` | key to search prefix in
`value`   | `any`    | Anything you want to store

Add value to prefix tree.

Example:

```js
var tree = new PrefixTree();
tree.set('hello', 'world');
```

### get(prefix)

Parameter | Type     | Description
----------|----------|--------------------------------------------------------
`prefix`  | `string` | prefix to search values

Get values for a prefix.

Example:

```js
var tree = new PrefixTree();

tree
    .set('hell', 666);
    .set('hello', 'world');

tree.get('he');
// → [666, 'world']
```

### toString()

For debug purpose you could use toString() method.

*NB* For perfomance module load inspection only with `NODE_ENV === 'development'`

```sh
NODE_ENV='development' node -e "console.log('' + new (require('prefix-tree'))([['hello', 'hello'], ['hi', 'hi'], ['hell', 'hell']]))"

[root]
└── h
    ├── e
    │   └── l
    │       └── l : hell
    │           └── o : hello
    └── i : hi
```


License
-------

Code released under the [MIT](LICENSE.txt).
