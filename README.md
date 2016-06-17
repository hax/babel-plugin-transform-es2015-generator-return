# babel-plugin-transform-es2015-generator-return

Patch ES2015 Generator.prototype.return method for V8


[![npm version](https://badge.fury.io/js/babel-plugin-transform-es2015-generator-return.svg)](https://badge.fury.io/js/babel-plugin-transform-es2015-generator-return)
[![build status](https://api.travis-ci.org/hax/babel-plugin-transform-es2015-generator-return.svg?branch=master)](https://travis-ci.org/hax/babel-plugin-transform-es2015-generator-return)
[![dependencies](https://david-dm.org/hax/babel-plugin-transform-es2015-generator-return.svg)](https://david-dm.org/hax/babel-plugin-transform-es2015-generator-return)
[![devDependencies](https://img.shields.io/david/dev/hax/babel-plugin-transform-es2015-generator-return.svg)](https://david-dm.org/hax/babel-plugin-transform-es2015-generator-return#info=devDependencies)


## Why this plugin

See https://github.com/alekseykulikov/babel-preset-es2015-node5/issues/3


## Installation
```sh
npm install babel-plugin-transform-es2015-generator-return
```

## Usage

### Via `.babelrc` (Recommended)
#### .babelrc
```json
{
	"plugins": ["transform-es2015-generator-return"]
}
```

### Via CLI
```sh
babel --plugins transform-es2015-generator-return
```

### Via Node API
```js
require("babel-core").transform("code", {
  plugins: ["transform-es2015-generator-return"]
})
```
