export const HOST = {
	SLON: 'slon-tea.ru',
	WIX: 'wix.com'
};

export const STORAGE_KEYS = {
	DATA: 'slon_data',
	LAST_MODIFIED: 'slon_last_modified'
};

export const PORT_NAME = 'SLON_2_WIX';

export const MESSAGES = {
	OBTAIN_ITEM_INFO: 'SLON.OBTAIN_ITEM_INFO',
	GOT_ITEM_INFO: 'SLON.GOT_ITEM_INFO'
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
