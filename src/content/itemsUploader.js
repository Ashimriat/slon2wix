import {
	WIX_SELECTORS, ADDITIONAL_INFO_TYPES,
	COFFEE_COOK_INFO_TYPES, EVENTS
} from '../constants';
import {
	awaitElementAppear, awaitElementDisappear,
	clickElement, setValue, makeBreak
} from '../utils';
import ImagesUploader from './imagesUploader';


const {
	PRODUCT_NAME_INPUT, PRODUCT_DESCRIPTION_INPUT, PRODUCT_DESCRIPTION_BOLD_BUTTON,
	ADDITIONAL_INFO_BUTTON, ADDITIONAL_INFO_TITLE, ADDITIONAL_INFO_DESCRIPTION,
	ADDITIONAL_INFO_DESCRIPTION_BOLD_BUTTON,
	ADDITIONAL_INFO_SAVE_BUTTON, SAVE_ITEM_INFO_BUTTON,
	PRODUCT_PRICE_INPUT, ADDITIONAL_PRICE_INFO_INPUT,
	TOTAL_AMOUNT_INPUT, TOTAL_AMOUNT_TYPE_INPUT, KILO_OPTION,
	BASE_AMOUNT_INPUT, BASE_AMOUNT_TYPE_INPUT, GRAM_OPTION,
	VENDOR_CODE_INPUT, ADD_PARAMS_BUTTON, ADD_PARAMS_PARAM_NAME_INPUT,
	ADD_PARAMS_WEIGHTS_OPTION, ADD_PARAMS_WEIGHTS_RANGE_INPUT, ADD_PARAMS_SAVE_BUTTON,
	EDIT_PARAMS_BUTTON, EDIT_PARAMS_MODAL, EDIT_PARAMS_MODAL_TABLE_ROW,
	EDIT_PARAMS_OVERPRICE_INPUT, EDIT_PARAMS_VENDOR_CODE_INPUT, EDIT_PARAMS_WEIGHT_INPUT,
	EDIT_PARAMS_SAVE_BUTTON
} = WIX_SELECTORS;

class ItemsUploader {
	#imagesUploader = new ImagesUploader();
	
	static #getSortedWeights(priceObj) {
		const priceKeys = Object.keys(priceObj);
		const kiloPriceIndex = priceKeys.findIndex(weight => weight === '1кг');
		if (kiloPriceIndex !== -1) priceKeys.splice(kiloPriceIndex, 1);
		const sortedWeights = priceKeys.sort((a, b) => (
			+a.match(/\d+/)[0] - +b.match(/\d+/)[0]
		));
		if (kiloPriceIndex !== -1) sortedWeights.push('1кг');
		return sortedWeights;
	};
	
	
	#getPrice(priceObj) {
		const itemAmounts = Object.keys(priceObj);
		const exampleAmount = itemAmounts.find(amount => ['1кг', 'шт', 'уп'].includes(amount));
		if (exampleAmount) {
			return {
				amount: exampleAmount,
				price: +priceObj[exampleAmount]
			};
		}
		const tmpPriceItemAmount = itemAmounts[0];
		const tmpItemAmount = +tmpPriceItemAmount.match(/\d+/)[0];
		return {
			amount: '1кг',
			price: 1000 / tmpItemAmount * +priceObj[tmpPriceItemAmount]
		};
	}

	#getHowToCookInfo(infoSrc) {
		if (typeof infoSrc === 'string') return infoSrc;
		let res = '';
		Object.keys(COFFEE_COOK_INFO_TYPES).forEach(type => {
			if (infoSrc[type]) res += `${COFFEE_COOK_INFO_TYPES[type]}: ${infoSrc[type]}\n`;
		});
		return res;
	}
	
	#setPriceAndWeight(price, weight) {
		const { amount, price: itemPrice } = this.#getPrice(price);
		setValue(PRODUCT_PRICE_INPUT, itemPrice);
		clickElement(ADDITIONAL_PRICE_INFO_INPUT);
		setValue(TOTAL_AMOUNT_INPUT, 1);
		clickElement(TOTAL_AMOUNT_TYPE_INPUT);
		clickElement(KILO_OPTION);
		const baseAmount = amount === '1кг' ? weight.match(/\d+/)[0] : 1;
		const baseAmountType = amount === '1кг' ? GRAM_OPTION : KILO_OPTION;
		setValue(BASE_AMOUNT_INPUT, baseAmount);
		clickElement(BASE_AMOUNT_TYPE_INPUT);
		clickElement(baseAmountType);
	};
	
	async #editParams(price, vendorCode) {
		await awaitElementAppear(EDIT_PARAMS_BUTTON);
		clickElement(EDIT_PARAMS_BUTTON);
		await awaitElementAppear(EDIT_PARAMS_MODAL);
		const rows = document.querySelectorAll(EDIT_PARAMS_MODAL_TABLE_ROW);
		let tmpRow, tmpWeightNumMatch, tmpMinPrice, tmpOverprice, tmpVendorCode, tmpWeight;
		ItemsUploader.#getSortedWeights(price).forEach((weight, index, arr) => {
			tmpRow = rows[index];
			tmpWeightNumMatch = +weight.match(/\d+/)[0];
			if (index === 0) tmpMinPrice = price[weight];
			tmpOverprice = index === 0 ? 0 : price[weight] - tmpMinPrice;
			tmpVendorCode = index === arr.length - 1 ? vendorCode : `${vendorCode}/${tmpWeightNumMatch}`;
			tmpWeight = index === arr.length - 1 ? 1 : tmpWeightNumMatch / 1000;
			setValue(EDIT_PARAMS_OVERPRICE_INPUT, tmpOverprice, {}, tmpRow);
			setValue(EDIT_PARAMS_VENDOR_CODE_INPUT, tmpVendorCode, {}, tmpRow);
			setValue(EDIT_PARAMS_WEIGHT_INPUT, tmpWeight, {}, tmpRow);
		});
		clickElement(EDIT_PARAMS_SAVE_BUTTON);
	}
	
	async #setParams(price) {
		// Добавляем данные об упаковках
		clickElement(ADD_PARAMS_BUTTON);
		await awaitElementAppear(ADD_PARAMS_PARAM_NAME_INPUT);
		clickElement(ADD_PARAMS_PARAM_NAME_INPUT);
		clickElement(ADD_PARAMS_WEIGHTS_OPTION);
		ItemsUploader.#getSortedWeights(price).forEach(weight => {
			setValue(ADD_PARAMS_WEIGHTS_RANGE_INPUT, weight);
			document.querySelector(ADD_PARAMS_WEIGHTS_RANGE_INPUT).dispatchEvent(EVENTS.KEYBOARD.COMMA);
		});
		clickElement(ADD_PARAMS_SAVE_BUTTON);
	}
	
	async #setAdditionalInfo(infoType, infoContent) {
		clickElement(ADDITIONAL_INFO_BUTTON);
		await awaitElementAppear(ADDITIONAL_INFO_TITLE);
		setValue(ADDITIONAL_INFO_TITLE, infoType);
		const descriptionValue = infoType === ADDITIONAL_INFO_TYPES.howToCook ?
			this.#getHowToCookInfo(infoContent) :
			infoContent;
		setValue(ADDITIONAL_INFO_DESCRIPTION, descriptionValue, { emulatedButtonSelector: ADDITIONAL_INFO_DESCRIPTION_BOLD_BUTTON });
		await makeBreak(1);
		clickElement(ADDITIONAL_INFO_SAVE_BUTTON);
		await awaitElementDisappear(ADDITIONAL_INFO_SAVE_BUTTON);
		await makeBreak(2);
	}
	
	async #processAdditionalInfo(itemInfo) {
		const { howToCook, toxicity, roast, processing, compound } = itemInfo;
		const processedInfoTypes = [];
		if (howToCook && Object.keys(howToCook).length) {
			processedInfoTypes.push('howToCook');
		}
		if (toxicity) processedInfoTypes.push('toxicity');
		if (roast) processedInfoTypes.push('roast');
		if (processing) processedInfoTypes.push('processing');
		if (compound) processedInfoTypes.push('compound');
		for (let type of processedInfoTypes) {
			await this.#setAdditionalInfo(ADDITIONAL_INFO_TYPES[type], itemInfo[type]);
		}
	}
	
	async uploadItemInfo(itemInfo, categoryName, itemType) {
		const { description, imageLink, name, vendorCode, price, weight } = itemInfo;
		// TODO: в этом инпуте ограничение по длине ввода
		setValue(PRODUCT_NAME_INPUT, name);
		setValue(PRODUCT_DESCRIPTION_INPUT, description, { emulatedButtonSelector: PRODUCT_DESCRIPTION_BOLD_BUTTON });
		if (Object.keys(price).length > 1) {
			const minPriceWeight = ItemsUploader.#getSortedWeights(price)[0];
			setValue(PRODUCT_PRICE_INPUT, price[minPriceWeight]);
			await this.#setParams(price);
			await this.#editParams(price, vendorCode);
		} else {
			this.#setPriceAndWeight(price, weight);
			setValue(VENDOR_CODE_INPUT, vendorCode)
		}
		await this.#processAdditionalInfo(itemInfo);
		if (imageLink) {
			this.#imagesUploader.setParams({ imageLink, categoryName, imageName: name });
			await this.#imagesUploader.addItemPhoto(imageLink, categoryName);
		}
		await makeBreak(5);
		clickElement(SAVE_ITEM_INFO_BUTTON);
	};
}

export default new ItemsUploader();
