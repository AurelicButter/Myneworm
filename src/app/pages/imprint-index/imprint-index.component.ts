import { Component, OnInit } from "@angular/core";
import { MynewormAPIService } from "../../services/myneworm-api.service";
import { ImprintData } from "../../models/imprintData";
import { MetadataService } from "../../services/metadata.service";
import { CommonModule } from "@angular/common";

@Component({
	selector: "app-imprint-index",
	templateUrl: "./imprint-index.component.html",
	styleUrls: ["./imprint-index.component.css"],
	standalone: true,
	imports: [CommonModule]
})
export class ImprintIndexComponent implements OnInit {
	imprints: ImprintData[];

	constructor(
		private service: MynewormAPIService,
		private metaService: MetadataService
	) {
		this.metaService.updateMetaTags("Imprint List", "/publisher");
	}

	ngOnInit() {
		this.service.getImprints().subscribe((data: ImprintData[]) => {
			this.imprints = data;
		});
	}

	getImprintAsset(id: number) {
		return this.service.getAsset(`imprint/${id}`);
	}
}
