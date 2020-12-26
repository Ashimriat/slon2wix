import { MESSAGES } from '../constants';
import { log } from "../utils";


let USED_TAB_ID,
		itemsData,
		tmpCategoryIndex = 0,
		tmpItemIndex;

export const uploadInfo = async (tabId, fileData) => {
	USED_TAB_ID = tabId;
	itemsData = fileData;
	chrome.tabs.executeScript(USED_TAB_ID, { file: 'content.js' }, async () => {
		for (let categoryInfo of itemsData) {
			const { itemType, name, items } = categoryInfo;
			for (let item of items) {
				await new Promise(resolve => {
					chrome.tabs.sendMessage(
						USED_TAB_ID,
						{ type: MESSAGES.UPLOAD_ITEM_INFO, itemInfo: { item, name, itemType } },
						resolve
					);
				});
			}
		}
	});
};
