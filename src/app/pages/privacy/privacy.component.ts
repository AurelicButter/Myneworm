import { Component } from "@angular/core";
import { MetadataService } from "../../services/metadata.service";
import { MarkdownModule } from "ngx-markdown";

@Component({
	standalone: true,
	selector: "privacy-page",
	templateUrl: "./privacy.component.html",
	styleUrls: ["./privacy.component.css"],
	imports: [MarkdownModule]
})
export class PrivacyPageComponent {
	constructor(private metaService: MetadataService) {
		this.metaService.updateMetaTags("Privacy Policy", "/privacy");
	}
}
