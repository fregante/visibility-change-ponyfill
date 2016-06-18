'use strict';

import onChange from './lib/manual-on-change';
let handlers = [];
let timer;

function getVisibility() {
	return document.hidden;
}

const observer = onChange(
	getVisibility,
	() => {
		handlers.forEach(setTimeout); // with setTimeout errors won't stop the loop
	}
);

function maybeStartLoop() {
	if (!timer) {
		timer = setInterval(observer.verify, 333);
	}
}
function maybeEndLoop() {
	if (!handlers.length) {
		timer = clearInterval(timer);
	}
}
function onVisibilityChange(handler) {
	// Use onChange to make sure that the handler is
	// only called once by either the browser or the ponyfill
	const debouncer = onChange(getVisibility, handler);

	document.addEventListener('visibilitychange', debouncer.verify);
	handlers.push(debouncer.verify);

	maybeStartLoop();
	const remove = function (onlyRemoveEventListener) {
		document.removeEventListener('visibilitychange', debouncer.verify);
		if (!onlyRemoveEventListener) {
			handlers = handlers.filter(fn => fn !== debouncer.verify);
			maybeEndLoop();
		}
	};

	// Store the remove function on the handler
	// so it can be called by removeAll()
	debouncer.verify.remove = remove;
	return {remove};
}
onVisibilityChange.removeAll = function () {
	handlers.forEach(fn => {
		fn.remove(true);
	});
	handlers.length = 0;
	maybeEndLoop();
};
export default onVisibilityChange;
