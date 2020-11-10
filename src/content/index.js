import { MESSAGES, ITEMS_TYPES_SELECTORS } from '../constants';
import { getInfoFromRoute } from './routeProcessor';


chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
	if (msg.type === MESSAGES.OBTAIN_ITEM_INFO) {
		if (document.querySelector(ITEMS_TYPES_SELECTORS.error404)) {
			sendResponse({ info: 'error' });
		} else {
			sendResponse({ info: getInfoFromRoute() });
		}
	}
});



