import { Component } from "@angular/core";
import { FAQData } from "./faqData";
import { MetadataService } from "../../services/metadata.service";
import { CommonModule } from "@angular/common";

@Component({
	selector: "faq",
	templateUrl: "./faq.component.html",
	styleUrls: ["./faq.component.css"],
	standalone: true,
	imports: [CommonModule]
})
export class FaqComponent {
	faqData = FAQData;

	constructor(private metaService: MetadataService) {
		this.metaService.updateMetaTags("FAQ", "/faq");
	}
}
