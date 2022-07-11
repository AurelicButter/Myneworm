import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MynewormAPIService } from "../services/myneworm-api.service";
import { ImprintData } from "../models/imprintData";

@Component({
	selector: "app-imprint-index",
	templateUrl: "./imprint-index.component.html",
	styleUrls: ["./imprint-index.component.css"]
})
export class ImprintIndexComponent implements OnInit {
	imprints: ImprintData[];

	constructor(private route: ActivatedRoute, private service: MynewormAPIService) {}

	ngOnInit() {
		this.service.getImprints().subscribe((data: ImprintData[]) => {
			this.imprints = data;
		});
	}

	getImprintAsset(id: number) {
		return this.service.getAsset(`imprint/${id}`);
	}
}
