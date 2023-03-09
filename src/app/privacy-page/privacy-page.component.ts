import { Component } from "@angular/core";
import { MetadataService } from "../services/metadata.service";

@Component({
	standalone: true,
	selector: "privacy-page",
	templateUrl: "./privacy-page.component.html",
	styleUrls: ["./privacy-page.component.css"]
})
export class PrivacyPageComponent {
	constructor(private metaService: MetadataService) {
		this.metaService.updateMetaTags("Privacy Policy", "/privacy");
	}
}
