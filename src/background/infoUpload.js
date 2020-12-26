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
			tmpItemIndex = 0;
			if (tmpCategoryIndex < 14) {
				log(`Категория по индексу ${tmpCategoryIndex} пропущена`);
			} else {
				const { itemType, name, items } = categoryInfo;
				log(`Загрузка категории по индексу ${tmpCategoryIndex}`);
				for (let item of items) {
					log(`Загрузка вещи по индексу ${tmpItemIndex}`);
					await new Promise(resolve => {
						chrome.tabs.sendMessage(
							USED_TAB_ID,
							{ type: MESSAGES.UPLOAD_ITEM_INFO, itemInfo: { item, name, itemType } },
							resolve
						);
					});
					tmpItemIndex++;
				}
			}
			tmpCategoryIndex++
		}
	});
};
