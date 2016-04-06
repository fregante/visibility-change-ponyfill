'use strict';
/**
 * ON CHANGE
 * Track the value of anything (through a function)
 * and call the callback when it does.
 * It doesn't do deep comparisons.
 * It doesn't verify automatically,
 * you decide when it may be necessary with observer.verify()
 *

EXAMPLE:

const observer = onChange(
	() => valueToTrack,
	(newValue, oldValue) => console.log(oldValue, 'changed to', newValue)
);

observer.verify();
setInterval(observer.verify.bind(observer), 100)

*/
export default function (getter, callback) {
	let lastValue = getter();
	let currentValue;
	return {
		verify() {
			currentValue = getter();
			if (currentValue !== lastValue) {
				callback(currentValue, lastValue);
				lastValue = currentValue;
			}
		}
	};
}
