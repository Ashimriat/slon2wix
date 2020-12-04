export const HOST = {
	SLON: 'slon-tea.ru',
	WIX: 'www.wix.com'
};

export const STORAGE_KEYS = {
	DATA: 'slon_data',
	LAST_MODIFIED: 'slon_last_modified'
};

export const PORT_NAME = 'SLON_2_WIX';

export const MESSAGES = {
	OBTAIN_ITEM_INFO: 'OBTAIN_ITEM_INFO',
	PREPARE_FOR_CATEGORY_UPLOAD: 'PREPARE_FOR_CATEGORY_UPLOAD',
	UPLOAD_ITEMS_INFO: 'UPLOAD_ITEMS_INFO',
};

export const SLON_ROUTES = {
	REGEXP: /\/(tea|kofe|posuda_i_aksessuari|sladosti)/,
	TEA: '/tea',
	COFFEE: '/kofe',
	TABLEWARE: '/posuda_i_aksessuari',
	SWEETS: '/sladosti'
};

export const SERVER_ROUTES = {
	PARSE_INFO_FILE: '/getInfo'
};

export const CONTENT_TABLE_SELECTOR = '#product-list > .row > .col.s12.m8.l9 > ul.row';

export const ITEM_SELECTOR = 'li > div > a';

export const COFFEE_COOK_CATEGORIES = {
	'Эспрессо': 'espresso',
	'Турка': 'turk',
	'Фильтр': 'filter',
	'Френч-пресс': 'frenchPress',
	'Чашка': 'cup'
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
	'Кислотность напитка по шкале от 0 до 5': 'toxicity'
};

export const COFFEE_INFO_CATEGORIES_REGEXP = /(Способ обработки кофейных зерен|Степень обжарки|Кислотность напитка по шкале от 0 до 5)/;

export const SWEETS_INFO_CATEGORIES_REGEXP = /(Состав|Условия хранения)/;

export const TABLEWARE_INFO_CATEGORIES_REGEXP = /^Объ(е|ё)м:/;

export const UPLOAD_STAGES = {
	PROCESSING_TO_UPLOAD: 'PROCESSING_TO_UPLOAD',
	UPLOADING: 'UPLOADING'
};

export const WIX_SELECTORS = {
	SHOP_ITEMS_CATEGORY: '[data-hook="store-products"]',
	ADD_ITEM: '.add-product-button-container > dropdown-button > button',
	ADD_PHYSICAL_ITEM: '[data-hook="option-physical"] > div > div',
	PRODUCT_NAME_INPUT: '[data-hook="product-title"]',
	PRODUCT_DESCRIPTION_INPUT: '.modal-content > .row > .ck-editor-wrapper > w-text-editor > div:last-child',
	ADDITIONAL_INFO_BUTTON: '.add-additional-info > a',
	ADDITIONAL_INFO_TITLE: '[data-hook="additional-info-title-input"]',
	ADDITIONAL_INFO_DESCRIPTION: '[name="infoDescription"] > div:last-child',
	ADDITIONAL_INFO_SAVE_BUTTON: '[data-hook="additional-info-save"]',
	ADD_IMAGE_BUTTON: '[data-hook="option-PHOTO"] > div > div',
	IMAGES_FOLDERS_LIST: '[data-hook="generic-layout-items-list-wrapper"]',
	IMAGES_FOLDERS: '[data-hook="generic-layout-items-list-wrapper"] > li > div',
	IMAGES_FOLDER_NAME: '[data-hook="gallery-folder-name"]',
	
	CREATE_NEW_IMAGE_FOLDER_BUTTON: '[data-hook="action-item"]',
	
	ADD_IMAGE_MODAL_BUTTON: '[data-hook="add-media-button"]',
	ADD_IMAGE_BY_LINK_BUTTON: '[data-hook="source-link-item-wrapper"]',
	IMAGE_BY_LINK_URL_INPUT: '[data-hook="url-importer-input-field"] > div > input',
	IMPORT_IMAGE_BUTTON: '[data-hook="url-importer-import-button"]',
	IMAGE_UPLOAD_TRACKER: '[data-hook="add-media-panel-header-title"]',
	LAST_UPLOADED_IMAGE: '[data-hook="gallery-file"]:last-child',
	IMAGE_NAME: '[data-hook="gallery-file-name"] > div',
	ADD_IMAGE_TO_INFO_BUTTON: '[data-hook="select-items"]',
	
	SAVE_ITEM_INFO_BUTTON: '[data-hook="product-save"]'
};
