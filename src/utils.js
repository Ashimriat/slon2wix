import { STORAGE_KEYS } from "./constants";

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

const elementTrack = async (selector, appearCheck) => await new Promise(resolve => {
	let timerId;
	const tracker = async () => {
		let condition = document.querySelector(selector);
		if (!appearCheck) condition = !condition;
		if (!condition) {
			timerId = setTimeout(tracker, 500);
		} else {
			clearTimeout(timerId);
			await makeBreak(1);
			resolve();
		}
	};
	tracker();
});


export const awaitElementAppear = async (selector) => await elementTrack(selector, true);

export const awaitElementDisappear = async (selector) => await elementTrack(selector, false);

export const clickElement = (selector) => {
	console.log(document.querySelector(selector));
	document.querySelector(selector).click();
};

export const makeTimestamp = () => {
	const date = new Date();
	const hours = date.getHours();
	const minutes = date.getMinutes();
	const seconds = date.getSeconds();
	const milliseconds = date.getMilliseconds();
	return `${hours}:${minutes}:${seconds}.${milliseconds}`;
};

export const setValue = (selector, value, options) => {
	const element = document.querySelector(selector);
	console.log(selector, element, value, options);
	const isFormElement = ['INPUT', 'TEXTAREA'].includes(element.tagName);
	const propertyToSet = isFormElement ? 'value' : 'innerHTML';
	element[propertyToSet] = value;
	if (isFormElement) {
		element.dispatchEvent(new Event('change'));
	}
	if (options?.emulatedButtonSelector) {
		clickElement(options.emulatedButtonSelector);
	}
};

export const log = message => console.log(`[${makeTimestamp()}]: ${message}`);

export const makeBreak = async secondsAmount => await new Promise(resolve => {
	let counter = 1;
	let timerId = setInterval(() => {
		log(`Break moment: ${counter}`);
		counter++;
		if (counter > secondsAmount) {
			clearInterval(timerId);
			resolve();
		}
	}, 1000);
});

export const trickKeyboardTracking = (selector, key) => {
	// некоторые инпуты считаются невалидными, если в них не была нажата клавиша
	document.querySelector(ADDITIONAL_INFO_TITLE)
}
