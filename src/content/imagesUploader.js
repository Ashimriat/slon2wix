import { awaitElementAppear, makeBreak, clickElement, setValue, log } from '../utils';
import { WIX_SELECTORS } from '../constants';


const {
	ADD_IMAGE_BUTTON, PHOTO_GALLERY_FRAME, IMAGES_FOLDERS_LIST, IMAGES_FOLDERS,
	IMAGES_FOLDER_NAME, CREATE_NEW_IMAGE_FOLDER_BUTTON,
	ADD_IMAGE_MODAL_BUTTON, ADD_IMAGE_BY_LINK_BUTTON,
	IMAGE_BY_LINK_URL_INPUT, IMPORT_IMAGE_BUTTON,
	IMAGE_UPLOAD_TRACKER, LAST_UPLOADED_IMAGE,
	IMAGE_NAME, ADD_IMAGE_TO_INFO_BUTTON, NEW_IMAGE_FOLDER_NAME_INPUT,
} = WIX_SELECTORS;

class ImagesUploader {
	#uploadedCategoryName;
	#imageLink;
	#frame = document.querySelector(PHOTO_GALLERY_FRAME);
	
	constructor() {
		console.log("CREATED 'ImagesUploader' CLASS INSTANCE");
	}
	
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
		log('obtaining category images folder');
		let categoryFolder = document.querySelectorAll(IMAGES_FOLDERS).find(node => (
			node.querySelector(IMAGES_FOLDER_NAME).textContent === this.#uploadedCategoryName
		));
		log('search for category folder result');
		console.log(categoryFolder);
		if (!categoryFolder) {
			categoryFolder = await this.#createCategoryImagesFolder();
		}
		return categoryFolder;
	};
	
	async #createCategoryImagesFolder() {
		log('creating category images folder');
		clickElement(CREATE_NEW_IMAGE_FOLDER_BUTTON);
		setValue(NEW_IMAGE_FOLDER_NAME_INPUT, this.#uploadedCategoryName);
		window.dispatchEvent(new KeyboardEvent('keydown', {
		
		}));
	};
	
	async addItemPhoto() {
		log('clicking ADD_IMAGE_BUTTON');
		clickElement(ADD_IMAGE_BUTTON);
		log('waiting for appear of IMAGES_FOLDERS_LIST');
		await makeBreak(5);
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
		setValue(IMAGE_BY_LINK_URL_INPUT, this.#imageLink);
		clickElement(IMPORT_IMAGE_BUTTON);
		await this.#awaitUploadComplete();
		this.#setImageName();
		clickElement(ADD_IMAGE_TO_INFO_BUTTON);
	};
}

export default new ImagesUploader();
