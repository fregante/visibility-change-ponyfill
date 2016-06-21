'use strict';

import onChange from './lib/manual-on-change';

let handlers = [];
let isBeingTracked;

const verifyVisibilityChange = onChange(
	() => document.hidden,
	() => {
		handlers.forEach(setTimeout); // with setTimeout errors won't stop the loop
	}
);

function maybeStartTracking() {
	if (!isBeingTracked) {
		isBeingTracked = setInterval(verifyVisibilityChange, 333);
		document.addEventListener('visibilitychange', verifyVisibilityChange);
	}
}

function maybeStopTracking() {
	if (!handlers.length) {
		isBeingTracked = clearInterval(isBeingTracked);
		document.removeEventListener('visibilitychange', verifyVisibilityChange);
	}
}

function onVisibilityChange(handler) {
	handlers.push(handler);
	maybeStartTracking();
}

onVisibilityChange.remove = handler => {
	handlers = handlers.filter(fn => fn !== handler);
	maybeStopTracking();
};

onVisibilityChange.removeAll = () => {
	handlers.length = 0;
	maybeStopTracking();
};

export default onVisibilityChange;
