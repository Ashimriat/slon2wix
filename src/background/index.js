import { HOST } from '../constants';
import { obtainProductsInfo } from './infoObtain';
import { uploadInfo } from './infoUpload';


let fileData;

chrome.runtime.onInstalled.addListener(() => {
	// Заменяем все правила
	chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
		// Новыми правилами
		chrome.declarativeContent.onPageChanged.addRules([{
			conditions: [
				new chrome.declarativeContent.PageStateMatcher({
					pageUrl: { hostEquals: HOST.SLON },
				}),
				new chrome.declarativeContent.PageStateMatcher({
					pageUrl: { hostEquals: HOST.WIX },
				})
			],
			// And shows the extension's page action.
			actions: [
				new chrome.declarativeContent.ShowPageAction(),
				// new chrome.declarativeContent.SetIcon({ path: 'assets/icon.png' })
			]
		}]);
	});
});

chrome.pageAction.onClicked.addListener(async tab => {
	const { url } = tab;
	chrome.pageAction.hide(tab.id);
	fileData = JSON.parse(localStorage.getItem('itemsData'));
	if (!fileData) {
		fileData = await obtainProductsInfo();
		localStorage.setItem('itemsData', JSON.stringify(fileData));
	} else if (url.match(HOST.WIX)) {
		// TODO: обновление информации об измененных товарах
		// TODO: посмотреть на wix чтобы изменялась цена в зависимости от товаров
		await uploadInfo(tab.id, fileData);
	}
});
