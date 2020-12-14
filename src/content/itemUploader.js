import { WIX_SELECTORS } from '../constants';
import { awaitElementAppear, awaitElementDisappear, clickElement, setValue, log, makeBreak } from '../utils';
import imagesUploader from './imagesUploader';


const {
	PRODUCT_NAME_INPUT, PRODUCT_DESCRIPTION_INPUT, PRODUCT_DESCRIPTION_BOLD_BUTTON,
	ADDITIONAL_INFO_BUTTON, ADDITIONAL_INFO_TITLE, ADDITIONAL_INFO_DESCRIPTION,
	ADDITIONAL_INFO_DESCRIPTION_BOLD_BUTTON,
	ADDITIONAL_INFO_SAVE_BUTTON, SAVE_ITEM_INFO_BUTTON,
	PRODUCT_PRICE_INPUT, ADDITIONAL_PRICE_INFO_INPUT,
	TOTAL_AMOUNT_INPUT, TOTAL_AMOUNT_TYPE_INPUT, KILO_OPTION,
	BASE_AMOUNT_INPUT, BASE_AMOUNT_TYPE_INPUT, GRAM_OPTION
} = WIX_SELECTORS;

const getHowToCookInfo = infoSrc => {
	if (typeof infoSrc === 'string') return infoSrc;
	return 'Объекты еще не запилены :('
};

const getPriceForKilo = priceObj => {
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
};

const setPrice = (price, weight) => {
	const { amount, price: itemPrice } = getPriceForKilo(price);
	setValue(PRODUCT_PRICE_INPUT, itemPrice);
	if (amount === '1кг') {
		clickElement(ADDITIONAL_PRICE_INFO_INPUT);
		setValue(TOTAL_AMOUNT_INPUT, 1);
		clickElement(TOTAL_AMOUNT_TYPE_INPUT);
		clickElement(KILO_OPTION);
		setValue(BASE_AMOUNT_INPUT, weight.match(/\d+/)[0]);
		clickElement(BASE_AMOUNT_TYPE_INPUT);
	}
};

const uploadItemInfo = async ({ description, howToCook, imageLink, name, price, vendorCode, weight }, categoryName) => {
	setValue(PRODUCT_NAME_INPUT, name);
	setValue(PRODUCT_DESCRIPTION_INPUT, description, { emulatedButtonSelector: PRODUCT_DESCRIPTION_BOLD_BUTTON });
	if (howToCook) {
		// TODO: tmp!
		if (Object.keys(howToCook).length) {
			clickElement(ADDITIONAL_INFO_BUTTON);
			await awaitElementAppear(ADDITIONAL_INFO_TITLE);
			setValue(ADDITIONAL_INFO_TITLE, 'Способ приготовления');
			setValue(ADDITIONAL_INFO_DESCRIPTION, getHowToCookInfo(howToCook), { emulatedButtonSelector: ADDITIONAL_INFO_DESCRIPTION_BOLD_BUTTON });
			await makeBreak(1);
			clickElement(ADDITIONAL_INFO_SAVE_BUTTON);
			await awaitElementDisappear(ADDITIONAL_INFO_SAVE_BUTTON);
		}
	}
	// TODO: установка цены
	// setPrice(price, weight);
	imagesUploader.setParams({ imageLink, categoryName, imageName: name });
	await imagesUploader.addItemPhoto(imageLink, categoryName);
	clickElement(SAVE_ITEM_INFO_BUTTON);
};

export const uploadItemsCategory = async ({ itemType, name, items }) => {
	await awaitElementAppear(PRODUCT_NAME_INPUT);
	// for (let item in items) {
	console.log("UPLOADING ITEM", items[0], "FROM CATEGORY ", name);
		await uploadItemInfo(items[0], name);
	//}
};
