/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/background/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/background/index.js":
/*!*********************************!*\
  !*** ./src/background/index.js ***!
  \*********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./src/constants.js");


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
	chrome.storage.sync.get([_constants__WEBPACK_IMPORTED_MODULE_0__["STORAGE_KEYS"].LAST_MODIFIED], result => {
		console.log("DATE RESULT", result);
		resolve(result[_constants__WEBPACK_IMPORTED_MODULE_0__["STORAGE_KEYS"].LAST_MODIFIED] || '');
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
				chrome.tabs.sendMessage(USED_TAB_ID, { type: _constants__WEBPACK_IMPORTED_MODULE_0__["MESSAGES"].OBTAIN_ITEM_INFO }, ({ info }) => {
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
		chrome.storage.local.set({ [_constants__WEBPACK_IMPORTED_MODULE_0__["STORAGE_KEYS"].LAST_MODIFIED]: String(productsData.timeStamp) });
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
						pageUrl: { hostEquals: _constants__WEBPACK_IMPORTED_MODULE_0__["HOST"].SLON },
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
						pageUrl: { hostEquals: _constants__WEBPACK_IMPORTED_MODULE_0__["HOST"].WIX },
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
	if (url.match(_constants__WEBPACK_IMPORTED_MODULE_0__["HOST"].SLON)) {
		chrome.pageAction.hide(tab.id);
		obtainProductsInfo();
	} else if (url.match(_constants__WEBPACK_IMPORTED_MODULE_0__["HOST"].WIX)) {
	
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


/***/ }),

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/*! exports provided: HOST, STORAGE_KEYS, PORT_NAME, MESSAGES, SLON_ROUTES, SERVER_ROUTES, CONTENT_TABLE_SELECTOR, ITEM_SELECTOR, COFFEE_COOK_CATEGORIES, COFFEE_COOK_CATEGORIES_REGEXP, ITEMS_TYPES_SELECTORS, SECTIONS_NAMES, COFFEE_INFO_CATEGORIES, COFFEE_INFO_CATEGORIES_REGEXP, SWEETS_INFO_CATEGORIES_REGEXP, TABLEWARE_INFO_CATEGORIES_REGEXP */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HOST", function() { return HOST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STORAGE_KEYS", function() { return STORAGE_KEYS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PORT_NAME", function() { return PORT_NAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MESSAGES", function() { return MESSAGES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SLON_ROUTES", function() { return SLON_ROUTES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SERVER_ROUTES", function() { return SERVER_ROUTES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CONTENT_TABLE_SELECTOR", function() { return CONTENT_TABLE_SELECTOR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ITEM_SELECTOR", function() { return ITEM_SELECTOR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COFFEE_COOK_CATEGORIES", function() { return COFFEE_COOK_CATEGORIES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COFFEE_COOK_CATEGORIES_REGEXP", function() { return COFFEE_COOK_CATEGORIES_REGEXP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ITEMS_TYPES_SELECTORS", function() { return ITEMS_TYPES_SELECTORS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SECTIONS_NAMES", function() { return SECTIONS_NAMES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COFFEE_INFO_CATEGORIES", function() { return COFFEE_INFO_CATEGORIES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COFFEE_INFO_CATEGORIES_REGEXP", function() { return COFFEE_INFO_CATEGORIES_REGEXP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SWEETS_INFO_CATEGORIES_REGEXP", function() { return SWEETS_INFO_CATEGORIES_REGEXP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TABLEWARE_INFO_CATEGORIES_REGEXP", function() { return TABLEWARE_INFO_CATEGORIES_REGEXP; });
const HOST = {
	SLON: 'slon-tea.ru',
	WIX: 'wix.com'
};

const STORAGE_KEYS = {
	DATA: 'slon_data',
	LAST_MODIFIED: 'slon_last_modified'
};

const PORT_NAME = 'SLON_2_WIX';

const MESSAGES = {
	OBTAIN_ITEM_INFO: 'SLON.OBTAIN_ITEM_INFO',
	GOT_ITEM_INFO: 'SLON.GOT_ITEM_INFO'
};

const SLON_ROUTES = {
	REGEXP: /\/(tea|kofe|posuda_i_aksessuari|sladosti)/,
	TEA: '/tea',
	COFFEE: '/kofe',
	TABLEWARE: '/posuda_i_aksessuari',
	SWEETS: '/sladosti'
};

const SERVER_ROUTES = {
	PARSE_INFO_FILE: '/getInfo'
};

const CONTENT_TABLE_SELECTOR = '#product-list > .row > .col.s12.m8.l9 > ul.row';

const ITEM_SELECTOR = 'li > div > a';

const COFFEE_COOK_CATEGORIES = {
	'Эспрессо': 'espresso',
	'Турка': 'turk',
	'Фильтр': 'filter',
	'Френч-пресс': 'frenchPress',
	'Чашка': 'cup'
};

const COFFEE_COOK_CATEGORIES_REGEXP = /(Эспрессо|Турка|Фильтр|Френч-пресс|Чашка)/;

const ITEMS_TYPES_SELECTORS = {
	image: '#product-image',
	description: '#desc_pr',
	vendorCode: '.bas_f_i.skusi_a',
	error404: '.img_slon',
	name: '#prod_title'
};

const SECTIONS_NAMES = {
	COMMON: [ 'Описание', 'Вкус'],
	TEA: [ 'Как заваривать' ],
};

const COFFEE_INFO_CATEGORIES = {
	'Способ обработки кофейных зерен': 'processing',
	'Степень обжарки': 'roast',
	'Кислотность напитка по шкале от 0 до 5': 'toxicity'
};

const COFFEE_INFO_CATEGORIES_REGEXP = /(Способ обработки кофейных зерен|Степень обжарки|Кислотность напитка по шкале от 0 до 5)/;

const SWEETS_INFO_CATEGORIES_REGEXP = /(Состав|Условия хранения)/;

const TABLEWARE_INFO_CATEGORIES_REGEXP = /^Объ(е|ё)м:/;


/***/ })

/******/ });
//# sourceMappingURL=background.js.map