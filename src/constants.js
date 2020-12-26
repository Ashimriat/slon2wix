export const HOST = {
	SLON: 'slon-tea.ru',
	WIX: 'www.wix.com'
};

export const STORAGE_KEYS = {
	DATA: 'slon_data',
	LAST_MODIFIED: 'slon_last_modified'
};

export const MESSAGES = {
	OBTAIN_ITEM_INFO: 'OBTAIN_ITEM_INFO',
	UPLOAD_ITEM_INFO: 'UPLOAD_ITEM_INFO',
};

export const SLON_ROUTES = {
	REGEXP: /\/(tea|kofe|posuda_i_aksessuari|sladosti)/,
	TEA: '/tea',
	COFFEE: '/kofe',
	TABLEWARE: '/posuda_i_aksessuari',
	SWEETS: '/sladosti'
};

export const COFFEE_COOK_CATEGORIES = {
	'Эспрессо': 'espresso',
	'Турка': 'turk',
	'Фильтр': 'filter',
	'Френч-пресс': 'frenchPress',
	'Чашка': 'cup'
};

export const COFFEE_COOK_INFO_TYPES = {
	espresso: 'Эспрессо',
	turk: 'Турка',
	filter: 'Фильтр',
	frenchPress: 'Френч-пресс',
	cup: 'Чашка'
};

export const COFFEE_COOK_CATEGORIES_REGEXP = /(Эспрессо|Турка|Фильтр|Френч-пресс|Чашка)/;

export const ITEMS_TYPES_SELECTORS = {
	image: '#product-image',
	description: '#desc_pr',
	vendorCode: '.bas_f_i.skusi_a',
	error404: '.img_slon',
	name: '#prod_title'
};

export const SECTIONS_NAMES = {
	COMMON: [ 'Описание', 'Вкус'],
	TEA: [ 'Как заваривать' ],
};

export const COFFEE_INFO_CATEGORIES = {
	'Способ обработки кофейных зерен': 'processing',
	'Степень обжарки': 'roast',
	'Кислотность напитка по шкале от 0 до 5': 'toxicity',
	'Способ приготовления': 'howToCook'
};

export const ADDITIONAL_INFO_TYPES = {
	processing: 'Способ обработки кофейных зерен',
	roast: 'Степень обжарки',
	toxicity: 'Кислотность напитка по шкале от 0 до 5',
	howToCook: 'Способ приготовления',
	compound: 'Состав'
};

export const COFFEE_INFO_CATEGORIES_REGEXP = /(Способ обработки кофейных зерен|Степень обжарки|Степень обжарки кофейных зерен|Кислотность напитка по шкале от 0 до 5)/;

export const SWEETS_INFO_CATEGORIES_REGEXP = /(Состав|Условия хранения)/;

export const TABLEWARE_INFO_CATEGORIES_REGEXP = /^Объ(е|ё)м:/;

export const EVENTS = {
	KEYBOARD: {
		ENTER: new KeyboardEvent('keydown', {
			key: 'Enter',
			code: 'Enter',
			charCode: 0,
			keyCode: 13,
			which: 13,
			composed: true,
			bubbles: true,
			cancelable: true
		}),
		COMMA: new KeyboardEvent('keydown', {
			key: ',',
			code: 'Comma',
			charCode: 0,
			keyCode: 188,
			which: 188,
			composed: true,
			bubbles: true,
			cancelable: true
		})
	},
	MOUSE: {
		CLICK: new MouseEvent('click', {
			view: window,
			bubbles: true,
			cancelable: true
		}),
		DOUBLE_CLICK: new MouseEvent('dblclick', {
			view: window,
			bubbles: true,
			cancelable: true
		}),
	}
};

export const WIX_SELECTORS = {
	// страница "Товары"
	SHOP_ITEMS_CATEGORY: '[data-hook="store-products"]',
	ADD_ITEM: '.add-product-button-container > dropdown-button > button',
	ADD_PHYSICAL_ITEM: '[data-hook="option-physical"] > div > div',
	// Имя
	PRODUCT_NAME_INPUT: '[data-hook="product-title"]',
	// Цена
	PRODUCT_PRICE_INPUT: '[name="price"]',
	ADDITIONAL_PRICE_INFO_INPUT: '[data-hook="unit-price-container"] input',
	TOTAL_AMOUNT_INPUT: '[data-hook="total-unit-form-field"] [data-hook="total-quantity-input"] > div > input',
	TOTAL_AMOUNT_TYPE_INPUT: '[data-hook="total-unit-form-field"] [data-hook="total-unit-dropdown"] > div > div > div > div > input',
	BASE_AMOUNT_INPUT: '[data-hook="base-unit-form-field"] [data-hook="base-quantity-input"] > div > input',
	BASE_AMOUNT_TYPE_INPUT: '[data-hook="base-unit-form-field"] [data-hook="base-unit-dropdown"] > div > div > div > div > input',
	KILO_OPTION: '[data-hook="popover-content"] [data-hook="dropdown-item-kg"]',
	GRAM_OPTION: '[data-hook="popover-content"] [data-hook="dropdown-item-g"]',
	// Описание
	PRODUCT_DESCRIPTION_INPUT: '[name="description"] > div:last-child',
	PRODUCT_DESCRIPTION_BOLD_BUTTON: '[name="description"] .button.bold',
	// Артикул
	VENDOR_CODE_INPUT: '[data-hook="inventory-and-shipping"] span > div > div:last-child > div:last-child > div > div:nth-child(2) input',
	ADD_PARAMS_PARAM_NAME_INPUT: '[data-hook="message-box-body"] [data-hook="wsr-input"]',
	ADD_PARAMS_WEIGHTS_OPTION: '[data-hook="dropdown-layout-options"] > div:first-child',
	ADD_PARAMS_WEIGHTS_RANGE_INPUT: '[data-hook="message-box-body"] [data-hook="wsr-custom-input"]',
	ADD_PARAMS_BUTTON: '[data-hook="product-add-options"]',
	ADD_PARAMS_SAVE_BUTTON: '[data-hook="confirmation-button"]',
	EDIT_PARAMS_BUTTON: '[data-hook="product-options-manage-variants-toggle"]',
	EDIT_PARAMS_MODAL: '[data-hook="header-layout"]',
	EDIT_PARAMS_MODAL_TABLE_ROW: '[data-hook="manage-variant-table"] tbody > tr',
	EDIT_PARAMS_OVERPRICE_INPUT: 'td:nth-child(3) input',
	EDIT_PARAMS_VENDOR_CODE_INPUT: 'td:nth-child(5) input',
	EDIT_PARAMS_WEIGHT_INPUT: 'td:nth-child(7) input',
	EDIT_PARAMS_SAVE_BUTTON: '[data-hook="confirmation-button"]',
	// Дополнительная инфа (как готовить, кислотность и т.д.)
	ADDITIONAL_INFO_BUTTON: '.add-additional-info > a',
	ADDITIONAL_INFO_TITLE: '[data-hook="additional-info-title-input"]',
	ADDITIONAL_INFO_DESCRIPTION: '[name="infoDescription"] > div:last-child',
	ADDITIONAL_INFO_DESCRIPTION_BOLD_BUTTON: '[name="infoDescription"] .button.bold',
	ADDITIONAL_INFO_SAVE_BUTTON: '[data-hook="additional-info-save"]',
	ADD_IMAGE_BUTTON: '[data-hook="option-PHOTO"] > div > div',
	// Загрузка изображений
	PHOTO_GALLERY_FRAME: '#mediaGalleryFrame',
	IMAGES_FOLDERS_LIST: '[data-hook="gallery-layout"]',
	IMAGES_FOLDERS: '[data-hook="generic-layout-items-list-wrapper"] > li > div',
	IMAGES_FOLDER_NAME: '[data-hook="gallery-folder-name"]',
	// Создание новой папки для изображений
	CREATE_NEW_IMAGE_FOLDER_BUTTON: '[data-hook="action-item"]',
	NEW_IMAGE_FOLDER_NAME_INPUT: '[data-hook="gallery-layout"] ul input',
	// Добавление изображения
	ADD_IMAGE_MODAL_BUTTON: '[data-hook="add-media-button"]',
	ADD_IMAGE_BY_LINK_BUTTON: '[data-hook="source-link-item-wrapper"]',
	IMAGE_BY_LINK_URL_INPUT: '[data-hook="url-importer-input-field"] > div > input',
	IMPORT_IMAGE_BUTTON: '[data-hook="url-importer-import-button"]',
	IMAGE_UPLOAD_TRACKER: '[data-hook="add-media-panel-header-title"]',
	LAST_UPLOADED_IMAGE: '[data-hook="gallery-file"]:last-child',
	IMAGE_TILE: '[data-hook="gallery-file-name"]',
	IMAGE_NAME: '[data-hook="gallery-file-name"] > div',
	IMAGE_NAME_INPUT: '[data-hook="gallery-file-name-edit-input"] > div > input',
	ADD_IMAGE_TO_INFO_BUTTON: '[data-hook="select-items"]',
	//
	SAVE_ITEM_INFO_BUTTON: '[data-hook="product-save"]'
};
