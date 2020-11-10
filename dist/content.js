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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/content/index.js");
/******/ })
/************************************************************************/
/******/ ({

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


/***/ }),

/***/ "./src/content/index.js":
/*!******************************!*\
  !*** ./src/content/index.js ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./src/constants.js");
/* harmony import */ var _routeProcessor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./routeProcessor */ "./src/content/routeProcessor.js");




chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
	if (msg.type === _constants__WEBPACK_IMPORTED_MODULE_0__["MESSAGES"].OBTAIN_ITEM_INFO) {
		if (document.querySelector(_constants__WEBPACK_IMPORTED_MODULE_0__["ITEMS_TYPES_SELECTORS"].error404)) {
			sendResponse({ info: 'error' });
		} else {
			sendResponse({ info: Object(_routeProcessor__WEBPACK_IMPORTED_MODULE_1__["getInfoFromRoute"])() });
		}
	}
});





/***/ }),

/***/ "./src/content/routeProcessor.js":
/*!***************************************!*\
  !*** ./src/content/routeProcessor.js ***!
  \***************************************/
/*! exports provided: getInfoFromRoute */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getInfoFromRoute", function() { return getInfoFromRoute; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./src/constants.js");


const getBaseInfo = (withNameTrim = true) => {
	const name = document.querySelector(_constants__WEBPACK_IMPORTED_MODULE_0__["ITEMS_TYPES_SELECTORS"].name).textContent;
	const imageNode = document.querySelector(_constants__WEBPACK_IMPORTED_MODULE_0__["ITEMS_TYPES_SELECTORS"].image);
	
	return {
		name: withNameTrim ? name.trim() : name,
		vendorCode: document.querySelector(_constants__WEBPACK_IMPORTED_MODULE_0__["ITEMS_TYPES_SELECTORS"].vendorCode).textContent.trim(),
		imageLink: imageNode ? imageNode.src : ''
	};
};

const obtainTeaInfo = () => {
	const res = getBaseInfo();
	
	const { COMMON: COMMON_SECTION, TEA: TEA_SECTIONS } = _constants__WEBPACK_IMPORTED_MODULE_0__["SECTIONS_NAMES"];
	
	const descriptionNode = document.querySelector(_constants__WEBPACK_IMPORTED_MODULE_0__["ITEMS_TYPES_SELECTORS"].description);
	const weightNode = descriptionNode.firstElementChild;
	
	if (weightNode) {
		res.weight = weightNode.textContent;
	}
	
	let descriptionTexts = [],
		howToCookTexts = [],
		isHowToCookPassed = false,
		isLastNode = false,
		tmpNode,
		tmpNodeText,
		clonedNode;
	
	while (!isLastNode) {
		tmpNode = tmpNode ? tmpNode.previousElementSibling : descriptionNode.lastElementChild;
		if (!tmpNode) {
			res.description = descriptionNode.textContent.trim();
			isLastNode = true;
			continue;
		}
		tmpNodeText = tmpNode.textContent.trim();
		if (!tmpNode.querySelector('span > strong')) {
			// !isTasteNode
			if (![...COMMON_SECTION, ...TEA_SECTIONS].includes(tmpNodeText)) {
				if (!isHowToCookPassed) {
					howToCookTexts.unshift(tmpNodeText)
				} else {
					descriptionTexts.unshift(tmpNodeText);
				}
			} else if (TEA_SECTIONS.includes(tmpNodeText)) {
				isHowToCookPassed = true;
				res.howToCook = howToCookTexts.join(' ');
			}
		} else {
			clonedNode = tmpNode.cloneNode(true);
			clonedNode.removeChild(clonedNode.firstChild);
			descriptionTexts.unshift(clonedNode.textContent.trim());
		}
		if (tmpNode === weightNode.nextElementSibling) {
			isLastNode = true;
		}
	}
	
	res.description = descriptionTexts.join(' ');
	
	return res;
};

const obtainCoffeeInfo = () => {
	const res = getBaseInfo(false);
	
	const { COMMON: COMMON_SECTION } = _constants__WEBPACK_IMPORTED_MODULE_0__["SECTIONS_NAMES"];
	
	const descriptionNode = document.querySelector(_constants__WEBPACK_IMPORTED_MODULE_0__["ITEMS_TYPES_SELECTORS"].description);
	const weightNode = descriptionNode.firstElementChild;
	if (weightNode) {
		res.weight = weightNode.textContent;
	}
	res.name = res.name.replace(res.weight + 'р', '').trim();
	
	
	let howToCookNode = descriptionNode.lastElementChild;
	let tmpNode, tmpNodeText, tmpMatch;
	if (howToCookNode) {
		res.howToCook = {};
		for (let i = 0; i < howToCookNode.childElementCount; i++) {
			tmpNode = !tmpNode ? howToCookNode.lastElementChild : tmpNode.previousElementSibling;
			tmpNodeText = tmpNode.textContent;
			tmpMatch = tmpNodeText.match(_constants__WEBPACK_IMPORTED_MODULE_0__["COFFEE_COOK_CATEGORIES_REGEXP"]);
			if (tmpMatch) {
				tmpNodeText = tmpNodeText.replace(tmpMatch[0], '').trim();
				tmpNodeText = tmpNodeText.substring(1).trim();
				tmpNodeText = tmpNodeText.charAt(0).toUpperCase() + tmpNodeText.slice(1);
				res.howToCook[_constants__WEBPACK_IMPORTED_MODULE_0__["COFFEE_COOK_CATEGORIES"][tmpMatch[0]]] = tmpNodeText;
			}
		}
		tmpNode = howToCookNode.previousElementSibling;
	}
	
	let descriptionTexts = [],
		isLastNode = false,
		clonedNode;
	tmpNodeText = null;
	tmpMatch = null;
	
	while (!isLastNode) {
		tmpNode = tmpNode ? tmpNode.previousElementSibling : descriptionNode.lastElementChild;
		if (!tmpNode) {
			res.description = descriptionNode.textContent.trim();
			isLastNode = true;
			continue;
		}
		tmpNodeText = tmpNode.textContent.trim();
		tmpMatch = tmpNodeText.match(_constants__WEBPACK_IMPORTED_MODULE_0__["COFFEE_INFO_CATEGORIES_REGEXP"]);
		if (tmpMatch) {
			tmpNodeText = tmpNodeText.replace(tmpMatch[0], '').trim();
			tmpNodeText = tmpNodeText.charAt(0).toUpperCase() + tmpNodeText.slice(1);
			res[_constants__WEBPACK_IMPORTED_MODULE_0__["COFFEE_INFO_CATEGORIES"][tmpMatch[0]]] = tmpNodeText;
		} else {
			if (!tmpNode.querySelector('span > strong')) {
				if (!COMMON_SECTION.includes(tmpNodeText)) {
					descriptionTexts.unshift(tmpNodeText);
				}
			} else {
				clonedNode = tmpNode.cloneNode(true);
				clonedNode.removeChild(clonedNode.firstChild);
				descriptionTexts.unshift(clonedNode.textContent.trim());
			}
			if (tmpNode === weightNode.nextElementSibling.nextElementSibling) {
				isLastNode = true;
			}
		}
	}
	
	res.description = descriptionTexts.join(' ');
	
	return res;
};

const obtainTablewareInfo = () => {
	const res = getBaseInfo();
	
	const descriptionNode = document.querySelector(_constants__WEBPACK_IMPORTED_MODULE_0__["ITEMS_TYPES_SELECTORS"].description);
	
	if (!descriptionNode.childElementCount) {
		if (descriptionNode.textContent.trim()) {
			res.description = descriptionNode.textContent.trim();
		}
		return res;
	}
	
	let tmpNode,
		tmpNode1,
		tmpNodeText,
		tmpText,
		tmpMatch,
		isTopNode = false;
	const descriptionTexts = [];
	const { COMMON: COMMON_SECTION } = _constants__WEBPACK_IMPORTED_MODULE_0__["SECTIONS_NAMES"];
	
	while (!isTopNode) {
		tmpNode = tmpNode ? tmpNode.previousElementSibling : descriptionNode.lastElementChild;
		tmpNodeText = tmpNode.textContent;
		tmpMatch = tmpNodeText.match(_constants__WEBPACK_IMPORTED_MODULE_0__["TABLEWARE_INFO_CATEGORIES_REGEXP"]);
		if (tmpMatch) {
			res.capacity = tmpNodeText.replace(tmpMatch[0], '').trim();
		} else if (tmpNode === descriptionNode.firstElementChild) {
			if (!COMMON_SECTION.includes(tmpNodeText)) {
				descriptionTexts.push(tmpNodeText);
			}
			isTopNode = true;
		} else {
			if (tmpNode.tagName === 'UL') {
				tmpNodeText = '';
				for (let i = 0; i < tmpNode.childElementCount; i++) {
					tmpNode1 = tmpNode1 ? tmpNode1.nextElementSibling : tmpNode.firstElementChild;
					tmpText = tmpNode1.textContent;
					tmpText = tmpText.charAt(0).toLowerCase() + tmpText.slice(1);
					if (i !== 0) {
						tmpNodeText += i !== tmpNode.childElementCount - 1 ? ', ' : ' и ';
					}
					tmpNodeText += tmpText;
				}
				tmpNode1 = null;
			}
			if (!['.', ':'].includes(tmpNodeText.charAt(tmpNodeText.length - 1))) {
				tmpNodeText += '.';
			}
			descriptionTexts.unshift(tmpNodeText);
		}
	}
	
	res.description = descriptionTexts.join(' ');
	
	return res;
};

const obtainSweetsInfo = () => {
	// TODO: отладить, не везде подхватывает описание
	const res = getBaseInfo();
	
	const descriptionNode = document.querySelector(_constants__WEBPACK_IMPORTED_MODULE_0__["ITEMS_TYPES_SELECTORS"].description);
	
	if (descriptionNode.childElementCount) {
		let tmpNode = descriptionNode.firstElementChild;
		let isDescriptionEnded = false;
		let tmpNodeText, tmpMatch;
		
		const descriptionTexts = [];
		
		while (!isDescriptionEnded) {
			tmpNode = tmpNode.nextElementSibling;
			tmpNodeText = tmpNode.textContent;
			tmpMatch = tmpNodeText.match(_constants__WEBPACK_IMPORTED_MODULE_0__["SWEETS_INFO_CATEGORIES_REGEXP"]);
			if (tmpMatch || tmpNode === descriptionNode.lastElementChild) {
				isDescriptionEnded = true;
			} else {
				descriptionTexts.push(tmpNodeText);
			}
		}
		res.description = descriptionTexts.join(' ');
	}
	
	return res;
};

const getInfoFromRoute = () => {
	switch (window.location.pathname.match(_constants__WEBPACK_IMPORTED_MODULE_0__["SLON_ROUTES"].REGEXP)[0]) {
		case _constants__WEBPACK_IMPORTED_MODULE_0__["SLON_ROUTES"].TEA: return obtainTeaInfo();
		case _constants__WEBPACK_IMPORTED_MODULE_0__["SLON_ROUTES"].COFFEE: return obtainCoffeeInfo();
		case _constants__WEBPACK_IMPORTED_MODULE_0__["SLON_ROUTES"].TABLEWARE: return obtainTablewareInfo();
		case _constants__WEBPACK_IMPORTED_MODULE_0__["SLON_ROUTES"].SWEETS: return obtainSweetsInfo();
	}
};


/***/ })

/******/ });
//# sourceMappingURL=content.js.map