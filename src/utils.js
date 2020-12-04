import { STORAGE_KEYS } from "../constants";

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

export const awaitElementAppear = async (selector) => await new Promise(resolve => {
	let timerId;
	const tracker = () => {
		if (!document.querySelector(selector)) {
			timerId = setTimeout(tracker, 500);
		} else {
			clearTimeout(timerId);
			resolve();
		}
	};
	tracker();
});

export const clickElement = (selector) => {
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

export const setHTML = (selector, value) => {
	document.querySelector(selector).innerHTML = value;
};
