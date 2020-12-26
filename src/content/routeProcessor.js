import { formatItemName } from '../utils';
import {
	ITEMS_TYPES_SELECTORS, SECTIONS_NAMES,
	COFFEE_COOK_CATEGORIES, COFFEE_COOK_CATEGORIES_REGEXP,
	COFFEE_INFO_CATEGORIES, COFFEE_INFO_CATEGORIES_REGEXP,
	SWEETS_INFO_CATEGORIES_REGEXP,
	TABLEWARE_INFO_CATEGORIES_REGEXP,
	SLON_ROUTES
} from '../constants';

const getBaseInfo = (withNameTrim = true) => {
	const name = document.querySelector(ITEMS_TYPES_SELECTORS.name).textContent;
	const imageNode = document.querySelector(ITEMS_TYPES_SELECTORS.image);
	
	return {
		name: withNameTrim ? name.trim() : name,
		vendorCode: document.querySelector(ITEMS_TYPES_SELECTORS.vendorCode).textContent.trim(),
		imageLink: imageNode ? imageNode.src : ''
	};
};

const obtainTeaInfo = () => {
	const res = getBaseInfo();
	
	const { COMMON: COMMON_SECTION, TEA: TEA_SECTIONS } = SECTIONS_NAMES;
	
	const descriptionNode = document.querySelector(ITEMS_TYPES_SELECTORS.description);
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
	
	if (res.howToCook && !Object.keys(res.howToCook).length) delete res.howToCook;
	res.name = formatItemName(res.name);
	return res;
};

const obtainCoffeeInfo = () => {
	const res = getBaseInfo(false);
	
	const { COMMON: COMMON_SECTION } = SECTIONS_NAMES;
	
	const descriptionNode = document.querySelector(ITEMS_TYPES_SELECTORS.description);
	const weightNode = descriptionNode.firstElementChild;
	if (weightNode) {
		res.weight = weightNode.textContent;
	}
	res.name = res.name.replace(res.weight + 'р', '').trim();
	
	
	let howToCookNode = descriptionNode.lastElementChild;
	let tmpNode,
			tmpNodeText,
			tmpMatch;
	if (howToCookNode) {
		res.howToCook = {};
		for (let i = 0; i < howToCookNode.childElementCount; i++) {
			tmpNode = !tmpNode ? howToCookNode.lastElementChild : tmpNode.previousElementSibling;
			tmpNodeText = tmpNode.textContent;
			tmpMatch = tmpNodeText.match(COFFEE_COOK_CATEGORIES_REGEXP);
			if (tmpMatch) {
				tmpNodeText = tmpNodeText.replace(tmpMatch[0], '').trim();
				tmpNodeText = tmpNodeText.substring(1).trim();
				tmpNodeText = tmpNodeText.charAt(0).toUpperCase() + tmpNodeText.slice(1);
				res.howToCook[COFFEE_COOK_CATEGORIES[tmpMatch[0]]] = tmpNodeText;
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
		tmpMatch = tmpNodeText.match(COFFEE_INFO_CATEGORIES_REGEXP);
		if (tmpMatch) {
			tmpNodeText = tmpNodeText.replace(tmpMatch[0], '').trim();
			tmpNodeText = tmpNodeText.charAt(0).toUpperCase() + tmpNodeText.slice(1);
			res[COFFEE_INFO_CATEGORIES[tmpMatch[0]]] = tmpNodeText;
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
	
	if (res.howToCook && !Object.keys(res.howToCook).length) delete res.howToCook;
	res.name = formatItemName(res.name, false);
	return res;
};

const obtainTablewareInfo = () => {
	const res = getBaseInfo();
	
	const descriptionNode = document.querySelector(ITEMS_TYPES_SELECTORS.description);
	
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
	const { COMMON: COMMON_SECTION } = SECTIONS_NAMES;
	
	while (!isTopNode) {
		tmpNode = tmpNode ? tmpNode.previousElementSibling : descriptionNode.lastElementChild;
		tmpNodeText = tmpNode.textContent;
		tmpMatch = tmpNodeText.match(TABLEWARE_INFO_CATEGORIES_REGEXP);
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
	res.name = formatItemName(res.name);
	return res;
};

const obtainSweetsInfo = () => {
	const res = getBaseInfo();
	
	const descriptionNode = document.querySelector(ITEMS_TYPES_SELECTORS.description);
	
	if (descriptionNode.childElementCount) {
		let tmpNode = descriptionNode.firstElementChild;
		let isDescriptionEnded = false;
		let tmpNodeText, tmpMatch, tmpText;
		
		const descriptionTexts = [];
		
		while (!isDescriptionEnded) {
			tmpNode = tmpNode.nextElementSibling;
			tmpNodeText = tmpNode.textContent;
			tmpMatch = tmpNodeText.match(SWEETS_INFO_CATEGORIES_REGEXP);
			if (tmpMatch) {
				if (tmpMatch[0] === 'Состав') {
					tmpText = tmpNodeText.replace('Состав: ', '');
					res.compound = tmpText.charAt(0).toUpperCase() + tmpText.substring(1);
				} else {
					isDescriptionEnded = true;
				}
			} else if (tmpNode === descriptionNode.lastElementChild) {
				isDescriptionEnded = true;
			} else if (!tmpNodeText.match(/\d+.+/)) {
				descriptionTexts.push(tmpNodeText);
			}
		}
		res.description = descriptionTexts.join(' ');
	}
	res.name = formatItemName(res.name);
	return res;
};

export const getInfoFromRoute = () => {
	switch (window.location.pathname.match(SLON_ROUTES.REGEXP)[0]) {
		case SLON_ROUTES.TEA: return obtainTeaInfo();
		case SLON_ROUTES.COFFEE: return obtainCoffeeInfo();
		case SLON_ROUTES.TABLEWARE: return obtainTablewareInfo();
		case SLON_ROUTES.SWEETS: return obtainSweetsInfo();
	}
};
