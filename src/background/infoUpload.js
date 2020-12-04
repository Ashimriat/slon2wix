import { MESSAGES, UPLOAD_STAGES } from '../constants';
import { trackPromise, makeTimestamp } from "./utils";


let USED_TAB_ID,
	itemsData,
	tmpCategoryIndex = 0,
	initPromise = false,
	tmpPromiseObj = { prom: null };

const uploadCategory = async (categoryInfo) => await new Promise(resolve => {
	initPromise = true;
	chrome.tabs.sendMessage(USED_TAB_ID, { type: MESSAGES.UPLOAD_ITEMS_INFO, info: categoryInfo }, async () => {
		resolve();
	});
});

const uploadItemsInfo = async () => {
	chrome.tabs.executeScript(USED_TAB_ID, { file: 'content.js' }, () => {
		chrome.tabs.sendMessage(USED_TAB_ID, { type: MESSAGES.PREPARE_FOR_CATEGORY_UPLOAD }, async () => {
			initPromise = true;
			await trackPromise(tmpPromiseObj);
			await tmpPromiseObj.prom;
			//for (let category of itemsData) {
				await uploadCategory(itemsData[0])
			//}
		});
	});
};

const uploadInfoTabUpdatedListener = (tabId, tabInfo) => {
	// на wix происходит несколько подгрузок одной и той же страницы с разными query-параметрами,
	// поэтому смотрим по моменту загрузки favIcon
	if (tabId === USED_TAB_ID) {
		if (tabInfo.favIconUrl && initPromise) {
			tmpPromiseObj.prom = new Promise(resolve => {
				initPromise = false;
				chrome.tabs.executeScript(USED_TAB_ID, {file: 'content.js'}, resolve);
			});
		}
	}
};

export const uploadInfo = async (tabId, fileData) => {
	USED_TAB_ID = tabId;
	itemsData = fileData;
	// добавляем обработчик, который будет делать магию после загрузки страницы в табе
	chrome.tabs.onUpdated.addListener(uploadInfoTabUpdatedListener);
	await uploadItemsInfo()
};



// 4. Заполнение инфы о товаре



// 4.4. Заполнить цену

// 4.5. Добавить фотографию
// 4.5.1. ASYNC Найти папку (если нету - создать) (проверить существование WIX_SELECTORS.IMAGES_FOLDERS c data-generic-item-name="%имя категории%"
// 4.5.1.1. Создание папки: кликнуть на кнопку, ввести название папки по категории (КАК УЗНАТЬ ЭЛЕМЕНТ?), кликнуть ENTER (ASYNC)
// 4.5.2. Загрузить изображение: дабл клик по папке, ASYNC клик по загрузке по ссылке, ASYNC ввод адреса, кликнуть по кнопке.
// ASYNC дождаться загрузки, переименовать изображение по имени товара, добавить на сайт
// 4.6. Добавить к коллекции?


/*
new MouseEvent('dblclick', {
	'view': window,
	'bubbles': true,
	'cancelable': true
});
*/
