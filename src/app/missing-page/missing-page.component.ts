import { Component } from "@angular/core";
import { Title } from "@angular/platform-browser";

@Component({
	selector: "app-missing-page",
	templateUrl: "./missing-page.component.html",
	styleUrls: ["./missing-page.component.css"]
})
export class MissingPageComponent {
	constructor(private titleService: Title) {
		this.titleService.setTitle("Myneworm - 404 Not Found");
	}
}
