import { Component } from "@angular/core";
import { MetadataService } from "../../services/metadata.service";
import { RouterModule } from "@angular/router";

@Component({
	standalone: true,
	selector: "app-missing-page",
	templateUrl: "./missing-page.component.html",
	styleUrls: ["./missing-page.component.css"],
	imports: [RouterModule]
})
export class MissingPageComponent {
	constructor(private metaService: MetadataService) {
		this.metaService.resetMetaTags("404 Not Found");
	}
}
