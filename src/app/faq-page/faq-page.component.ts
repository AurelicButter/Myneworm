import { Component } from "@angular/core";
import { FAQData } from "./faqData";
import { MetadataService } from "../services/metadata.service";

@Component({
	selector: "app-faq-page",
	templateUrl: "./faq-page.component.html",
	styleUrls: ["./faq-page.component.css"]
})
export class FaqPageComponent {
	faqData = FAQData;

	constructor(private metaService: MetadataService) {
		this.metaService.updateMetaTags("FAQ", "/faq");
	}
}
