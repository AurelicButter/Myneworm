import { Component } from "@angular/core";
import { FAQData } from "./faqData";

@Component({
	selector: "app-faq-page",
	templateUrl: "./faq-page.component.html",
	styleUrls: ["./faq-page.component.css"]
})
export class FaqPageComponent {
	faqData = FAQData;
}
