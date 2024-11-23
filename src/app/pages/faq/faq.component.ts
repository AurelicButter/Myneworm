import { Component } from "@angular/core";
import { MetadataService } from "../../services/metadata.service";
import { MarkdownModule } from "ngx-markdown";

@Component({
	selector: "faq",
	templateUrl: "./faq.component.html",
	styleUrls: ["./faq.component.css"],
	standalone: true,
	imports: [MarkdownModule]
})
export class FaqComponent {
	constructor(private metaService: MetadataService) {
		this.metaService.updateMetaTags("FAQ", "/faq");
	}
}
