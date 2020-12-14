import { MESSAGES } from '../constants';
import { trackPromise, log } from '../utils';


let USED_TAB_ID,
	itemsData,
	tmpCategoryIndex = 0,
	initPromise = false,
	tmpPromiseObj = { prom: null };

const uploadCategory = async (categoryInfo) => await new Promise(resolve => {
	initPromise = true;
	log("SENDING CATEGORY UPLOAD MESSAGE");
	chrome.tabs.sendMessage(USED_TAB_ID, { type: MESSAGES.UPLOAD_ITEMS_INFO, info: categoryInfo }, async () => {
		log("CATEGORY UPLOAD MESSAGE PROCESSED");
		resolve();
	});
});

const uploadItemsInfo = async () => {
	chrome.tabs.executeScript(USED_TAB_ID, { file: 'content.js' }, () => {
		chrome.tabs.sendMessage(USED_TAB_ID, { type: MESSAGES.PREPARE_FOR_CATEGORY_UPLOAD }, async () => {
			initPromise = true;
			log("WAITING FOR PAGE LOAD");
			// await trackPromise(tmpPromiseObj);
			log("WAITING FOR LOAD SCRIPT EXECUTE");
			// await tmpPromiseObj.prom;
			//for (let category of itemsData) {
			log("LOADING CATEGORY");
				await uploadCategory(itemsData[11])
			//}
		});
	});
};

const uploadInfoTabUpdatedListener = (tabId, tabInfo) => {
	// на wix происходит несколько подгрузок одной и той же страницы с разными query-параметрами,
	// поэтому смотрим по моменту загрузки favIcon
	if (tabId === USED_TAB_ID && tabInfo.favIconUrl && initPromise) {
		tmpPromiseObj.prom = new Promise(resolve => {
			initPromise = false;
			chrome.tabs.executeScript(USED_TAB_ID, {file: 'content.js'}, () => {
				log("EXECUTED LOAD SCRIPT");
				resolve();
			});
		});
	}
};

export const uploadInfo = async (tabId, fileData) => {
	log("PROVOKED INFO UPLOAD");
	USED_TAB_ID = tabId;
	itemsData = fileData;
	// добавляем обработчик, который будет делать магию после загрузки страницы в табе
	// chrome.tabs.onUpdated.addListener(uploadInfoTabUpdatedListener);
	log("ADDED LISTENER");
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
