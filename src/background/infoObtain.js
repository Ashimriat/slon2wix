import { MESSAGES, STORAGE_KEYS } from '../constants';
import { trackPromise, getLastModifyDate } from '../utils';


let fileData,
	tmpItem,
	tmpCategoryIndex = 0,
	tmpItemIndex = 0,
	tmpDeletedItemsIndexes,
	USED_TAB_ID,
	itemInfoObtainingPromiseObj = { prom: null },
	PAGE_CONTENT_SCRIPT_ALLOWANCE = false;

const obtainFileInfo = async () => {
	const response = await fetch ('http://localhost:3000/getInfo', {
		method: 'POST',
		body: await getLastModifyDate(),
		headers: {
			'Accept':'application/json',
		}
	});
	return await response.json();
};

const getItemInfo = async (item) => await new Promise(resolve => {
	tmpItem = item;
	chrome.tabs.update(USED_TAB_ID, { url: item.link }, async () => {
		PAGE_CONTENT_SCRIPT_ALLOWANCE = true;
		await trackPromise(itemInfoObtainingPromiseObj);
		await itemInfoObtainingPromiseObj.prom;
		itemInfoObtainingPromiseObj.prom = null;
		tmpItemIndex++;
		// если дошли до последнего итема в категории
		if (tmpItemIndex === fileData[tmpCategoryIndex].items.length) {
			tmpItemIndex = 0;
			tmpDeletedItemsIndexes.forEach(index => {
				fileData[tmpCategoryIndex].items.splice(index, 1);
			});
			tmpCategoryIndex++;
			// если это была последняя категория - все закончилось
			if (tmpCategoryIndex === fileData.length) {
				tmpCategoryIndex = 0;
			}
		}
		resolve();
	});
});

const obtainInfoTabUpdatedListener = (tabId, tabInfo) => {
	if (tabId === USED_TAB_ID && tabInfo.status === 'complete' && PAGE_CONTENT_SCRIPT_ALLOWANCE) {
		itemInfoObtainingPromiseObj.prom = new Promise(resolve => {
			chrome.tabs.executeScript(tabId, { file: 'content.js' }, () => {
				chrome.tabs.sendMessage(USED_TAB_ID, { type: MESSAGES.OBTAIN_ITEM_INFO }, ({ info }) => {
					if (info === 'error') {
						tmpDeletedItemsIndexes.push(tmpItemIndex);
					} else {
						tmpItem = Object.assign({}, tmpItem, info);
						delete tmpItem.link;
						fileData[tmpCategoryIndex].items[tmpItemIndex] = tmpItem;
					}
					resolve();
				});
			});
		})
	}
};

const startInfoParsing = async () => await new Promise(resolve => {
	// создаем новую табу, в которой будут происходить все переходы
	chrome.tabs.create({ active: false, pinned: false }, async tab => {
		// запоминаем ее id
		USED_TAB_ID = tab.id;
		// добавляем обработчик, который будет делать магию после загрузки страницы в табе
		chrome.tabs.onUpdated.addListener(obtainInfoTabUpdatedListener);
		// перебираем категории
		for (let category of fileData) {
			tmpDeletedItemsIndexes = [];
			// перебираем итемы
			for (let item of category.items) {
				await getItemInfo(item);
			}
		}
		chrome.tabs.onUpdated.removeListener(obtainInfoTabUpdatedListener);
		resolve();
	});
});

export const obtainProductsInfo = async () => {
	const productsData = await obtainFileInfo();
	if (productsData.status === 'new') {
		fileData = productsData.info;
		chrome.storage.local.set({ [STORAGE_KEYS.LAST_MODIFIED]: String(productsData.timeStamp) });
		await startInfoParsing();
		return fileData;
	} else {
	
	}
};
