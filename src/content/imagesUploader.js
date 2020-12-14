import { awaitElementAppear, makeBreak, clickElement, setValue } from '../utils';
import { WIX_SELECTORS, EVENTS } from '../constants';


const {
	ADD_IMAGE_BUTTON, PHOTO_GALLERY_FRAME, IMAGES_FOLDERS_LIST, IMAGES_FOLDERS,
	IMAGES_FOLDER_NAME, CREATE_NEW_IMAGE_FOLDER_BUTTON,
	ADD_IMAGE_MODAL_BUTTON, ADD_IMAGE_BY_LINK_BUTTON,
	IMAGE_BY_LINK_URL_INPUT, IMPORT_IMAGE_BUTTON,
	IMAGE_UPLOAD_TRACKER, IMAGE_NAME, IMAGE_NAME_INPUT,
	ADD_IMAGE_TO_INFO_BUTTON, NEW_IMAGE_FOLDER_NAME_INPUT,
} = WIX_SELECTORS;

const { KEYBOARD, MOUSE } = EVENTS;


export default class ImagesUploader {
	#uploadedCategoryName;
	#imageLink;
	#imageName;
	#galleryFrame;
	
	#clickGalleryElement(selector) {
		clickElement(selector, this.#galleryFrame);
	}
	
	async #awaitGalleryElementAppear(selector) {
		await awaitElementAppear(selector, this.#galleryFrame);
	}
	
	#setGalleryElementValue(selector, value, options = {}) {
		setValue(selector, value, options, this.#galleryFrame)
	}
	
	setParams({ imageLink, categoryName, imageName }) {
		this.#imageLink = imageLink;
		this.#uploadedCategoryName = categoryName;
		this.#imageName = imageName;
	}
	
	async #awaitUploadComplete() {
		return await new Promise(resolve => {
			let timerId;
			const tracker = () => {
				const uploadText = this.#galleryFrame.querySelector(IMAGE_UPLOAD_TRACKER)?.textContent;
				if (['Не удалось загрузить', 'Загружено 1'].includes(uploadText)) {
					clearTimeout(timerId);
					resolve();
				} else {
					timerId = setTimeout(tracker, 500);
				}
			};
			tracker();
		});
	}
	
	async #getCategoryImagesFolder() {
		let categoryFolder;
		this.#galleryFrame.querySelectorAll(IMAGES_FOLDERS).forEach(node => {
			if (node.querySelector(IMAGES_FOLDER_NAME).textContent === this.#uploadedCategoryName) {
				categoryFolder = node;
			}
		});
		if (categoryFolder) {
			return categoryFolder;
		}
		await this.#createCategoryImagesFolder();
		return this.#getCategoryImagesFolder();
	};
	
	async #createCategoryImagesFolder() {
		await this.#awaitGalleryElementAppear(CREATE_NEW_IMAGE_FOLDER_BUTTON);
		this.#clickGalleryElement(CREATE_NEW_IMAGE_FOLDER_BUTTON);
		await this.#awaitGalleryElementAppear(NEW_IMAGE_FOLDER_NAME_INPUT);
		this.#setGalleryElementValue(NEW_IMAGE_FOLDER_NAME_INPUT, this.#uploadedCategoryName);
		await makeBreak(2);
		this.#galleryFrame.querySelector(NEW_IMAGE_FOLDER_NAME_INPUT).dispatchEvent(KEYBOARD.ENTER);
	};
	
	async addItemPhoto() {
		clickElement(ADD_IMAGE_BUTTON);
		await makeBreak(5);
		await awaitElementAppear(PHOTO_GALLERY_FRAME);
		this.#galleryFrame = document.querySelector(PHOTO_GALLERY_FRAME).contentDocument;
		await this.#awaitGalleryElementAppear(IMAGES_FOLDERS_LIST);
		const categoryImagesFolder = await this.#getCategoryImagesFolder();
		categoryImagesFolder.dispatchEvent(MOUSE.DOUBLE_CLICK);
		await this.#uploadPhoto();
		this.#galleryFrame.querySelector(IMAGE_NAME).dispatchEvent(MOUSE.CLICK);
		await makeBreak(2);
		this.#clickGalleryElement(ADD_IMAGE_TO_INFO_BUTTON);
	};
	
	async #uploadPhoto() {
		await this.#awaitGalleryElementAppear(ADD_IMAGE_MODAL_BUTTON);
		this.#clickGalleryElement(ADD_IMAGE_MODAL_BUTTON);
		this.#clickGalleryElement(ADD_IMAGE_BY_LINK_BUTTON);
		this.#setGalleryElementValue(IMAGE_BY_LINK_URL_INPUT, this.#imageLink, { emulatedEvent: ['focus', 'change'] });
		this.#clickGalleryElement(IMPORT_IMAGE_BUTTON);
		await this.#awaitUploadComplete();
		this.#galleryFrame.querySelector(IMAGE_NAME).dispatchEvent(MOUSE.CLICK);
		await this.#awaitGalleryElementAppear(IMAGE_NAME_INPUT);
		this.#setGalleryElementValue(IMAGE_NAME_INPUT, this.#imageName);
		this.#galleryFrame.querySelector(IMAGE_NAME_INPUT).dispatchEvent(KEYBOARD.ENTER);
	};
}
