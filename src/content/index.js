import {MESSAGES, ITEMS_TYPES_SELECTORS, WIX_SELECTORS} from '../constants';
import { getInfoFromRoute } from './routeProcessor';
import itemsUploader from './itemsUploader';
import { clickElement, makeTimestamp } from '../utils';

chrome.runtime.onMessage.addListener(async ({ type, info }, sender, sendResponse) => {
	switch (type) {
		case MESSAGES.OBTAIN_ITEM_INFO:
			if (document.querySelector(ITEMS_TYPES_SELECTORS.error404)) {
				console.log("PROCESSING ERROR");
				sendResponse({ info: 'error' });
			} else {
				console.log("PROCESSING INFO");
				sendResponse({ info: getInfoFromRoute() });
			}
			break;
		case MESSAGES.PREPARE_FOR_CATEGORY_UPLOAD:
			clickElement(WIX_SELECTORS.ADD_ITEM);
			clickElement(WIX_SELECTORS.ADD_PHYSICAL_ITEM);
			sendResponse();
			break;
		case MESSAGES.UPLOAD_ITEMS_INFO:
			await itemsUploader.uploadItemsCategory(info);
			sendResponse();
			break;
	}
});



