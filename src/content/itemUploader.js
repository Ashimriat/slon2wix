import { WIX_SELECTORS } from '../constants';
import { awaitElementAppear, awaitElementDisappear, clickElement, setValue, log, makeBreak } from '../utils';
import imagesUploader from './imagesUploader';


const {
	PRODUCT_NAME_INPUT, PRODUCT_DESCRIPTION_INPUT, PRODUCT_DESCRIPTION_BOLD_BUTTON,
	ADDITIONAL_INFO_BUTTON, ADDITIONAL_INFO_TITLE, ADDITIONAL_INFO_DESCRIPTION,
	ADDITIONAL_INFO_DESCRIPTION_BOLD_BUTTON,
	ADDITIONAL_INFO_SAVE_BUTTON, SAVE_ITEM_INFO_BUTTON
} = WIX_SELECTORS;

const getHowToCookInfo = infoSrc => {
	if (typeof infoSrc === 'string') return infoSrc;
	return 'Объекты еще не запилены :('
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
	// цена
	imagesUploader.setParams({ imageLink, categoryName });
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
