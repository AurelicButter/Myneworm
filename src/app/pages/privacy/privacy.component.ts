import { Component } from "@angular/core";
import { MetadataService } from "../../services/metadata.service";

@Component({
	standalone: true,
	selector: "privacy-page",
	templateUrl: "./privacy.component.html",
	styleUrls: ["./privacy.component.css"]
})
export class PrivacyPageComponent {
	constructor(private metaService: MetadataService) {
		this.metaService.updateMetaTags("Privacy Policy", "/privacy");
	}
}
