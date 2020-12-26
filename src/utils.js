import { STORAGE_KEYS } from "./constants";

// open -na Google\ Chrome --args --user-data-dir=/tmp/temporary-chrome-profile-dir --disable-web-security --disable-site-isolation-trials

export const trackPromise = async (trackedPromiseObj) => await new Promise(resolve => {
	let timerId;
	const tracker = () => {
		if (!trackedPromiseObj.prom) {
			timerId = setTimeout(tracker, 500);
		} else {
			clearTimeout(timerId);
			resolve();
		}
	};
	tracker();
});

export const getLastModifyDate = async () => await new Promise(resolve => {
	chrome.storage.sync.get([STORAGE_KEYS.LAST_MODIFIED], result => {
		resolve(result[STORAGE_KEYS.LAST_MODIFIED] || '');
	});
});

const elementTrack = async (selector, appearCheck, contextDocument = document) => await new Promise(resolve => {
	let timerId;
	const tracker = async () => {
		let condition = contextDocument.querySelector(selector);
		if (!appearCheck) condition = !condition;
		if (!condition) {
			timerId = setTimeout(tracker,500);
		} else {
			clearTimeout(timerId);
			await makeBreak(1);
			resolve();
		}
	};
	tracker();
});

export const awaitElementAppear = async (selector, contextDocument) => await elementTrack(selector, true, contextDocument);

export const awaitElementDisappear = async (selector, contextDocument) => await elementTrack(selector, false, contextDocument);

export const clickElement = (selector, contextDocument = document) => {
	contextDocument.querySelector(selector).click();
};

export const makeTimestamp = () => {
	const date = new Date();
	const hours = date.getHours();
	const minutes = date.getMinutes();
	const seconds = date.getSeconds();
	const milliseconds = date.getMilliseconds();
	return `${hours}:${minutes}:${seconds}.${milliseconds}`;
};

export const setValue = (selector, value, options, contextDocument = document) => {
	const element = contextDocument.querySelector(selector);
	const isFormElement = ['INPUT', 'TEXTAREA'].includes(element.tagName);
	const propertyToSet = isFormElement ? 'value' : 'innerHTML';
	element[propertyToSet] = value;
	if (options?.emulatedButtonSelector) {
		clickElement(options.emulatedButtonSelector);
	} else if (isFormElement) {
		let events = ['change'];
		if (options?.emulatedEvent) {
			events = Array.isArray(options.emulatedEvent) ? options.emulatedEvent : [options.emulatedEvent];
		}
		for (let event of events) {
			element.dispatchEvent(new Event(event, {
				composed: true,
				bubbles: true,
				cancelable: true
			}));
		}
	}
	
};

export const log = message => console.log(`[${makeTimestamp()}]: ${message}`);

export const makeBreak = async secondsAmount => await new Promise(resolve => {
	let counter = 1;
	let timerId = setInterval(() => {
		counter++;
		if (counter > secondsAmount) {
			clearInterval(timerId);
			resolve();
		}
	}, 1000);
});

export const formatItemName = (src, withTrim = true) => {
	let res = src;
	if (res.charAt(res.length - 1) === '.') {
		res = res.substring(0, res.length - 1);
	}
	res = res.replace(/"/g, "'");
	return withTrim ? res.trim(): res;
};
