import { DOCUMENT } from "@angular/common";
import { Component, Inject } from "@angular/core";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.css"]
})
export class AppComponent {
	title = "Myneworm";

	constructor(@Inject(DOCUMENT) private document: Document) {}

	loadStyle(styleName: string) {
		const head = this.document.getElementsByTagName("head")[0];

		const themeLink = this.document.getElementById("client-theme") as HTMLLinkElement;
		if (themeLink) {
			themeLink.href = styleName;
		} else {
			const style = this.document.createElement("link");
			style.id = "client-theme";
			style.rel = "stylesheet";
			style.href = `${styleName}`;

			head.appendChild(style);
		}
	}
}
