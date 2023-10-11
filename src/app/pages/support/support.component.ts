import { Component } from "@angular/core";
import { MetadataService } from "../../services/metadata.service";

@Component({
	standalone: true,
	selector: "support-page",
	templateUrl: "./support.component.html",
	styleUrls: ["./support.component.css"]
})
export class SupportPageComponent {
	constructor(private metaService: MetadataService) {
		this.metaService.updateMetaTags("Support", "/support");
	}
}
