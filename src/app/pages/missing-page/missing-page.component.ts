import { Component } from "@angular/core";
import { MetadataService } from "../../services/metadata.service";

@Component({
	selector: "app-missing-page",
	templateUrl: "./missing-page.component.html",
	styleUrls: ["./missing-page.component.css"]
})
export class MissingPageComponent {
	constructor(private metaService: MetadataService) {
		this.metaService.resetMetaTags("404 Not Found");
	}
}
