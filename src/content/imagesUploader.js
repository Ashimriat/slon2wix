import { awaitElementAppear, clickElement, setHTML } from '../utils';
import { WIX_SELECTORS } from '../constants';


const {
	ADD_IMAGE_BUTTON, IMAGES_FOLDERS_LIST, IMAGES_FOLDERS,
	IMAGES_FOLDER_NAME, CREATE_NEW_IMAGE_FOLDER_BUTTON,
	ADD_IMAGE_MODAL_BUTTON, ADD_IMAGE_BY_LINK_BUTTON,
	IMAGE_BY_LINK_URL_INPUT, IMPORT_IMAGE_BUTTON,
	IMAGE_UPLOAD_TRACKER, LAST_UPLOADED_IMAGE,
	IMAGE_NAME, ADD_IMAGE_TO_INFO_BUTTON
} = WIX_SELECTORS;

class ImagesUploader {
	#uploadedCategoryName;
	#imageLink;
	
	setParams({ imageLink, categoryName }) {
		this.#imageLink = imageLink;
		this.#uploadedCategoryName = categoryName;
	}
	
	#setImageName() {
		document.querySelector(LAST_UPLOADED_IMAGE).querySelector(IMAGE_NAME).innerHTML = this.#imageLink;
	}
	
	async #awaitUploadComplete() {
		return new Promise(resolve => {
			let timerId;
			const tracker = () => {
				const uploadText = document.querySelector(IMAGE_UPLOAD_TRACKER)?.textContent;
				if (uploadText === 'Не удалось загрузить' || uploadText.match('из 1')) {
					clearTimeout(timerId);
					resolve();
				} else {
					timerId = setTimeout(tracker, 500);
				}
			};
		});
	}
	
	async #getCategoryImagesFolder() {
		let categoryFolder = document.querySelectorAll(IMAGES_FOLDERS).find(node => (
			node.querySelector(IMAGES_FOLDER_NAME).textContent === this.#uploadedCategoryName
		));
		if (!categoryFolder) {
			categoryFolder = await this.#createCategoryImagesFolder();
		}
		return categoryFolder;
	};
	
	async #createCategoryImagesFolder() {
		clickElement(CREATE_NEW_IMAGE_FOLDER_BUTTON);
		// TODO
	};
	
	async addItemPhoto() {
		clickElement(ADD_IMAGE_BUTTON);
		await awaitElementAppear(IMAGES_FOLDERS_LIST);
		const categoryImagesFolder = await this.#getCategoryImagesFolder();
		categoryImagesFolder.dispatchEvent(
			new MouseEvent('dblclick', {
				'view': window,
				'bubbles': true,
				'cancelable': true
			})
		);
		await this.#uploadPhoto();
	};
	
	async #uploadPhoto() {
		clickElement(ADD_IMAGE_MODAL_BUTTON);
		clickElement(ADD_IMAGE_BY_LINK_BUTTON);
		setHTML(IMAGE_BY_LINK_URL_INPUT, this.#imageLink);
		clickElement(IMPORT_IMAGE_BUTTON);
		await this.#awaitUploadComplete();
		this.#setImageName();
		clickElement(ADD_IMAGE_TO_INFO_BUTTON);
	}
}

export default new ImagesUploader();
