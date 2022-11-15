export class dataCorrectionForm {
	isbn: string | undefined;
	title: string | undefined;
	release: string | undefined;
	coverURL: string | undefined;
	storeURLs: StoreURL[];
	bookType: string | undefined;

	constructor() {
		this.storeURLs = [];
	}
}

class StoreURL {
	name: string | undefined;
	url: string;
}
