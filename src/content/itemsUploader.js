import { WIX_SELECTORS, COFFEE_ADDITIONAL_INFO_TYPES, COFFEE_COOK_INFO_TYPES } from '../constants';
import { awaitElementAppear, awaitElementDisappear, clickElement, setValue, makeBreak } from '../utils';
import ImagesUploader from './imagesUploader';


const {
	PRODUCT_NAME_INPUT, PRODUCT_DESCRIPTION_INPUT, PRODUCT_DESCRIPTION_BOLD_BUTTON,
	ADDITIONAL_INFO_BUTTON, ADDITIONAL_INFO_TITLE, ADDITIONAL_INFO_DESCRIPTION,
	ADDITIONAL_INFO_DESCRIPTION_BOLD_BUTTON,
	ADDITIONAL_INFO_SAVE_BUTTON, SAVE_ITEM_INFO_BUTTON,
	PRODUCT_PRICE_INPUT, ADDITIONAL_PRICE_INFO_INPUT,
	TOTAL_AMOUNT_INPUT, TOTAL_AMOUNT_TYPE_INPUT, KILO_OPTION,
	BASE_AMOUNT_INPUT, BASE_AMOUNT_TYPE_INPUT, GRAM_OPTION,
	ADD_ITEM
} = WIX_SELECTORS;

class ItemsUploader {
	#imagesUploader = new ImagesUploader();
	
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
	
	
	async #setAdditionalInfo(infoType, infoContent) {
		clickElement(ADDITIONAL_INFO_BUTTON);
		await awaitElementAppear(ADDITIONAL_INFO_TITLE);
		setValue(ADDITIONAL_INFO_TITLE, infoType);
		const descriptionValue = infoType === COFFEE_ADDITIONAL_INFO_TYPES.howToCook ?
			this.#getHowToCookInfo(infoContent) :
			infoContent;
		setValue(ADDITIONAL_INFO_DESCRIPTION, descriptionValue, { emulatedButtonSelector: ADDITIONAL_INFO_DESCRIPTION_BOLD_BUTTON });
		await makeBreak(1);
		clickElement(ADDITIONAL_INFO_SAVE_BUTTON);
		await awaitElementDisappear(ADDITIONAL_INFO_SAVE_BUTTON);
		await makeBreak(2);
	}
	
	async #processAdditionalInfo(itemInfo) {
		const { howToCook, toxicity, roast, processing } = itemInfo;
		const processedInfoTypes = [];
		if (howToCook && Object.keys(howToCook).length) {
			processedInfoTypes.push('howToCook');
		}
		if (toxicity) processedInfoTypes.push('toxicity');
		if (roast) processedInfoTypes.push('roast');
		if (processing) processedInfoTypes.push('processing');
		for (let type of processedInfoTypes) {
			await this.#setAdditionalInfo(COFFEE_ADDITIONAL_INFO_TYPES[type], itemInfo[type]);
		}
	}
	
	#setCategories(itemInfo, categoryName, itemType) {
	
	}
	
	async #uploadItemInfo(itemInfo, categoryName, itemType) {
		const { description, imageLink, name, price, weight } = itemInfo;
		setValue(PRODUCT_NAME_INPUT, name);
		setValue(PRODUCT_DESCRIPTION_INPUT, description, { emulatedButtonSelector: PRODUCT_DESCRIPTION_BOLD_BUTTON });
		this.#setPriceAndWeight(price, weight);
		await this.#processAdditionalInfo(itemInfo);
		this.#imagesUploader.setParams({ imageLink, categoryName, imageName: name });
		await this.#imagesUploader.addItemPhoto(imageLink, categoryName);
		this.#setCategories(itemInfo, categoryName, itemType);
		await makeBreak(5);
		clickElement(SAVE_ITEM_INFO_BUTTON);
		await awaitElementAppear(ADD_ITEM);
	};
	
	async uploadItemsCategory({ itemType, name, items }) {
		await awaitElementAppear(PRODUCT_NAME_INPUT);
		// for (let item in items) {
			await this.#uploadItemInfo(items[5], name, itemType);
		//}
	};
}


export default new ItemsUploader();
