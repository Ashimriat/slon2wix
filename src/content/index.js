import { MESSAGES, ITEMS_TYPES_SELECTORS, WIX_SELECTORS } from '../constants';
import { getInfoFromRoute } from './routeProcessor';
import itemsUploader from './itemsUploader';
import { awaitElementAppear, clickElement } from '../utils';


chrome.runtime.onMessage.addListener(({ type, itemInfo }, sender, sendResponse) => {
	switch (type) {
		case MESSAGES.OBTAIN_ITEM_INFO:
			if (document.querySelector(ITEMS_TYPES_SELECTORS.error404)) {
				sendResponse({ info: 'error' });
			} else {
				sendResponse({ info: getInfoFromRoute() });
			}
			break;
		case MESSAGES.UPLOAD_ITEM_INFO:
			const { itemType, name, item } = itemInfo;
			clickElement(WIX_SELECTORS.ADD_ITEM);
			(async () => {
				await awaitElementAppear(WIX_SELECTORS.ADD_PHYSICAL_ITEM);
				clickElement(WIX_SELECTORS.ADD_PHYSICAL_ITEM);
				await awaitElementAppear(WIX_SELECTORS.PRODUCT_NAME_INPUT);
				await itemsUploader.uploadItemInfo(item, name, itemType);
				await awaitElementAppear(WIX_SELECTORS.ADD_ITEM);
				sendResponse();
			})();
			return true;
	}
});



