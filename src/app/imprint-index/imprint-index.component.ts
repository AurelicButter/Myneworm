import { Component, OnInit } from "@angular/core";

class imprintData {
	publisherId: number;
	name: string;
	logoURL: string;
}

@Component({
	selector: "app-imprint-index",
	templateUrl: "./imprint-index.component.html",
	styleUrls: ["./imprint-index.component.css"]
})
export class ImprintIndexComponent implements OnInit {
	imprints: imprintData[] = [];

	ngOnInit() {
		for (let i = 0; i < 9; i++) {
			this.imprints.push({
				publisherId: 1,
				name: "Lorum Ipsum",
				logoURL: "./assets\\9781638580645.jpg"
			});
		}
	}
}
