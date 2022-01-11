import { DOCUMENT } from "@angular/common";
import { Inject, Injectable } from "@angular/core";

@Injectable({
	providedIn: "root"
})
export class LazyLoadStyleService {
	constructor(@Inject(DOCUMENT) private document: Document) {}

	loadStyle(stylePath: string) {
		const head = this.document.getElementsByTagName("head")[0];

		const style = this.document.createElement("link");
		style.rel = "stylesheet";
		style.href = `${stylePath}.css`;

		head.appendChild(style);
	}
}
