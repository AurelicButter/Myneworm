import { Component } from "@angular/core";
import { MetadataService } from "../../services/metadata.service";
import { MarkdownModule } from "ngx-markdown";

@Component({
	standalone: true,
	selector: "database-guidelines",
	templateUrl: "./database-guidelines.component.html",
	styleUrl: "./database-guidelines.component.css",
	imports: [MarkdownModule]
})
export class DatabaseGuidelinesComponent {
	constructor(private metaService: MetadataService) {
		this.metaService.updateMetaTags("Database Guidelines", "/guidelines");
	}
}
