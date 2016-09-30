# visibility-change-[ponyfill](https://ponyfill.com)

> A more reliable visibilitychange event that works in more mobile WebViews

[![gzipped size](https://badges.herokuapp.com/size/github/bfred-it/visibility-change-ponyfill/master/dist/visibility-change-ponyfill.browser.js?gzip=true&label=gzipped%20size)](#readme)
[![Travis build status](https://api.travis-ci.org/bfred-it/visibility-change-ponyfill.svg?branch=master)](https://travis-ci.org/bfred-it/visibility-change-ponyfill)
[![npm version](https://img.shields.io/npm/v/visibility-change-ponyfill.svg)](https://www.npmjs.com/package/visibility-change-ponyfill) 

## Install

```sh
npm install --save visibility-change-ponyfill
```
```js
import onVisibilityChange from 'visibility-change-ponyfill';
```

If you don't use node/babel, include this:

```html
<script src="dist/visibility-change-ponyfill.browser.js"></script>
```

## Usage

To add a listener:

```js
onVisibilityChange(function () {
	if(document.hidden) {
		// this page is now hidden
	} else {
		// this page is now visible
	}
});
```

To remove a listener:

```js
function yourOnChangeListener() { /* */ };
onVisibilityChange(yourOnChangeListener);

onVisibilityChange.remove(yourOnChangeListener);
```

To remove all listeners:

```js
onVisibilityChange.removeAll();
```

## License

MIT © [Federico Brigante](http://twitter.com/bfred_it)
