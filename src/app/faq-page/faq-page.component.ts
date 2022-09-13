import { Component } from "@angular/core";
import { FAQData } from "./faqData";
import { Title } from "@angular/platform-browser";

@Component({
	selector: "app-faq-page",
	templateUrl: "./faq-page.component.html",
	styleUrls: ["./faq-page.component.css"]
})
export class FaqPageComponent {
	faqData = FAQData;

	constructor(private titleService: Title) {
		this.titleService.setTitle("Myneworm - FAQ");
	}
}
