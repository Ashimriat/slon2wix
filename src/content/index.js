import {MESSAGES, ITEMS_TYPES_SELECTORS, WIX_SELECTORS} from '../constants';
import { getInfoFromRoute } from './routeProcessor';
import { uploadItemsCategory } from './itemUploader';
import { clickElement, makeTimestamp } from '../utils';


chrome.runtime.onMessage.addListener(async ({ type, info }, sender, sendResponse) => {
	switch (type) {
		case MESSAGES.OBTAIN_ITEM_INFO:
			if (document.querySelector(ITEMS_TYPES_SELECTORS.error404)) {
				sendResponse({ info: 'error' });
			} else {
				sendResponse({ info: getInfoFromRoute() });
			}
			break;
		case MESSAGES.PREPARE_FOR_CATEGORY_UPLOAD:
			clickElement(WIX_SELECTORS.ADD_ITEM);
			clickElement(WIX_SELECTORS.ADD_PHYSICAL_ITEM);
			sendResponse();
			break;
		case MESSAGES.UPLOAD_ITEMS_INFO:
			await uploadItemsCategory(info);
			sendResponse();
			break;
	}
});



