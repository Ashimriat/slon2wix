import { WIX_SELECTORS } from '../constants';
import { awaitElementAppear, clickElement, setHTML } from '../utils';
import imagesUploader from './imagesUploader';

const {
	PRODUCT_NAME_INPUT, PRODUCT_DESCRIPTION_INPUT,
	ADDITIONAL_INFO_BUTTON, ADDITIONAL_INFO_TITLE, ADDITIONAL_INFO_DESCRIPTION,
	ADDITIONAL_INFO_SAVE_BUTTON, SAVE_ITEM_INFO_BUTTON
} = WIX_SELECTORS;



const getHowToCookInfo = infoSrc => {
	if (typeof infoSrc === 'string') return infoSrc;
	return 'Объекты еще не запилены :('
};

const uploadItemInfo = async ({ description, howToCook, imageLink, name, price, vendorCode, weight }, categoryName) => {
	setHTML(PRODUCT_NAME_INPUT, name);
	setHTML(PRODUCT_DESCRIPTION_INPUT, description);
	if (howToCook) {
		// TODO: tmp!
		if (Object.keys(howToCook).length) {
			clickElement(ADDITIONAL_INFO_BUTTON);
			await awaitElementAppear(ADDITIONAL_INFO_TITLE);
			setHTML(ADDITIONAL_INFO_TITLE, 'Способ приготовления');
			setHTML(ADDITIONAL_INFO_DESCRIPTION, getHowToCookInfo(howToCook));
			clickElement(ADDITIONAL_INFO_SAVE_BUTTON);
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
		await uploadItemInfo(items[0], name);
	//}
};
