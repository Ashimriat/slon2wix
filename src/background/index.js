import { HOST, STORAGE_KEYS, PORT_NAME, MESSAGES } from '../constants';

const PAGE_ACTION_ALLOWANCE = {
	slon: true,
	wix: true
};

const PAGE_CONTENT_SCRIPT_ALLOWANCE = {
	slon: false,
	wix: false
};

let fileData,
	tmpItem,
	tmpCategoryIndex = 0,
	tmpItemIndex = 0,
	USED_TAB_ID,
	itemInfoObtainingPromise;

const getLastModifyDate = async () => await new Promise(resolve => {
	chrome.storage.sync.get([STORAGE_KEYS.LAST_MODIFIED], result => {
		console.log("DATE RESULT", result);
		resolve(result[STORAGE_KEYS.LAST_MODIFIED] || '');
	});
});
const trackInfoObtainingPromise = async () => await new Promise(resolve => {
	let timerId;
	const tracker = () => {
		if (!itemInfoObtainingPromise) {
			timerId = setTimeout(tracker, 500);
		} else {
			clearTimeout(timerId);
			resolve();
		}
	};
	tracker();
});

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
	chrome.tabs.update(USED_TAB_ID, { url: item.link }, async tab => {
		PAGE_CONTENT_SCRIPT_ALLOWANCE.slon = true;
		await trackInfoObtainingPromise();
		await itemInfoObtainingPromise;
		itemInfoObtainingPromise = null;
		tmpItemIndex++;
		// если дошли до последнего итема в категории
		if (tmpItemIndex === fileData[tmpCategoryIndex].items.length) {
			tmpItemIndex = 0;
			tmpCategoryIndex++;
			// если это была последняя категория - все закончилось
			if (tmpCategoryIndex === fileData.length) {
				console.log("LAST ITEM OF LAST CATEGORY");
				console.log(fileData);
				tmpCategoryIndex = 0;
			}
		}
		resolve();
	});
});


const obtainInfoTabUpdatedListener = (tabId, tabInfo) => {
	if (tabId === USED_TAB_ID && tabInfo.status === 'complete' && PAGE_CONTENT_SCRIPT_ALLOWANCE.slon) {
		itemInfoObtainingPromise = new Promise(resolve => {
			chrome.tabs.executeScript(tabId, { file: 'content.js' }, () => {
				chrome.tabs.sendMessage(USED_TAB_ID, { type: MESSAGES.OBTAIN_ITEM_INFO }, ({ info }) => {
					if (info === 'error') {
						fileData[tmpCategoryIndex].items.splice(tmpItemIndex, 1);
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

const loadInfoTabUpdatedListener = (tabId, tabInfo) => {
	if (tabInfo.status === 'complete') {
		// your code ...
	}
};


const startInfoParsing = () => {
	// создаем новую табу, в которой будут происходить все переходы
	chrome.tabs.create({ active: false, pinned: false }, async tab => {
		// запоминаем ее id
		USED_TAB_ID = tab.id;
		// добавляем обработчик, который будет делать магию после загрузки страницы в табе
		chrome.tabs.onUpdated.addListener(obtainInfoTabUpdatedListener);
		// перебираем категории
		for (let category of fileData) {
			// перебираем итемы
			for (let item of category.items) {
				await getItemInfo(item);
			}
		}
	});
};

const obtainProductsInfo = async () => {
	const productsData = await obtainFileInfo();
	if (productsData.status === 'new') {
		fileData = productsData.info;
		console.log(fileData);
		chrome.storage.local.set({ [STORAGE_KEYS.LAST_MODIFIED]: String(productsData.timeStamp) });
		startInfoParsing();
	} else {
	
	}
};

chrome.runtime.onInstalled.addListener(() => {
	// Заменяем все правила
	chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
		// Новыми правилами
		chrome.declarativeContent.onPageChanged.addRules([
			{
				conditions: [
					new chrome.declarativeContent.PageStateMatcher({
						pageUrl: { hostEquals: HOST.SLON },
					})
				],
				// And shows the extension's page action.
				actions: [
					new chrome.declarativeContent.ShowPageAction(),
					// new chrome.declarativeContent.SetIcon({ path: 'assets/icon.png' })
				]
			},
			{
				conditions: [
					new chrome.declarativeContent.PageStateMatcher({
						pageUrl: { hostEquals: HOST.WIX },
					})
				],
				// And shows the extension's page action.
				actions: [
					new chrome.declarativeContent.ShowPageAction(),
					// new chrome.declarativeContent.SetIcon({ path: 'assets/icon.png' })
				]
			}
		]);
	});
});

chrome.tabs.onSelectionChanged.addListener(tabId => {
	chrome.tabs.get(tabId, tab => {
	});
});



chrome.pageAction.onClicked.addListener(tab => {
	const { url } = tab;
	if (url.match(HOST.SLON)) {
		chrome.pageAction.hide(tab.id);
		obtainProductsInfo();
	} else if (url.match(HOST.WIX)) {
	
	}
});






/*
chrome.pageAction.onClicked.addListener(tab => {
	var clicks = tab_clicks[tab.id] || 0;
	chrome.pageAction.setIcon({path: "icon" + (clicks + 1) + ".png",
		tabId: tab.id});
	if (clicks % 2) {
		chrome.pageAction.show(tab.id);
	} else {
		chrome.pageAction.hide(tab.id);
		setTimeout(function() { chrome.pageAction.show(tab.id); }, 200);
	}
	chrome.pageAction.setTitle({title: "click:" + clicks, tabId: tab.id});
	// We only have 2 icons, but cycle through 3 icons to test the
	// out-of-bounds index bug.
	clicks++;
	if (clicks > 3)
		clicks = 0;
	tab_clicks[tab.id] = clicks;
});


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	chrome.pageAction.setIcon({ path: '../assets/slon.png' });
	chrome.pageAction.setTitle({ title: 'Собрать данные о товарах' });
});

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
	lastTabId = tabs[0].id;
	chrome.pageAction.show(lastTabId);
	chrome.tabs.sendMessage(tabs[0].id, { greeting: "hello" }, (response) => {
	
	});
});
*/
