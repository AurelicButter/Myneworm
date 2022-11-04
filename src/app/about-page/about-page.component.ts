import { Component } from "@angular/core";
import { Title } from "@angular/platform-browser";

@Component({
	selector: "app-about-page",
	templateUrl: "./about-page.component.html",
	styleUrls: ["./about-page.component.css"]
})
export class AboutPageComponent {
	constructor(private titleService: Title) {
		this.titleService.setTitle("Myneworm - About");
	}
}
