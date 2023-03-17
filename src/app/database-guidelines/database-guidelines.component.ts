import { Component } from "@angular/core";
import { MetadataService } from "../services/metadata.service";

@Component({
	standalone: true,
	selector: "database-guidelines",
	templateUrl: "./database-guidelines.component.html",
	styleUrls: ["./database-guidelines.component.css"]
})
export class DatabaseGuidelinesComponent {
	constructor(private metaService: MetadataService) {
		this.metaService.updateMetaTags("Database Guidelines", "/guidelines");
	}
}
