import { Component } from "@angular/core";
import { Title } from "@angular/platform-browser";

@Component({
	selector: "app-support-page",
	templateUrl: "./support-page.component.html",
	styleUrls: ["./support-page.component.css"]
})
export class SupportPageComponent {
	isSelecting = true;
	dataCorrection = false;
	userContact = false;

	constructor(private titleService: Title) {
		this.titleService.setTitle("Myneworm - Support");
	}

	selectCorrection() {
		this.isSelecting = false;
		this.dataCorrection = true;
	}

	selectUserContact() {
		this.isSelecting = false;
		this.userContact = true;
	}

	selectReturn() {
		this.isSelecting = true;
		this.userContact = false;
		this.dataCorrection = false;
	}
}
