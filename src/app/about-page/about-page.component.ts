import { Component } from "@angular/core";
import { MetadataService } from "../services/metadata.service";

@Component({
	selector: "app-about-page",
	templateUrl: "./about-page.component.html",
	styleUrls: ["./about-page.component.css"],
	standalone: true
})
export class AboutPageComponent {
	constructor(private metaService: MetadataService) {
		this.metaService.updateMetaTags("About", "/about");
	}
}
