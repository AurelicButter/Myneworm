import { Component, OnInit } from "@angular/core";

@Component({
	selector: "app-series-page",
	templateUrl: "./series-page.component.html",
	styleUrls: ["./series-page.component.css"]
})
export class SeriesPageComponent implements OnInit {
	seriesCollection: {
		paperback?: any[];
		ebook?: any[];
		hardcover?: any[];
		audiobook?: any[];
	} = {};

	constructor() {}

	ngOnInit(): void {
		this.seriesCollection.paperback = [];
		this.seriesCollection.ebook = [];

		for (let i = 1; i < 10; i++) {
			this.seriesCollection.paperback.push({
				bookId: i,
				name: "Lorum Ipsum",
				coverURL: "./assets\\9781638580645.jpg"
			});
		}

		for (let i = 10; i < 20; i++) {
			this.seriesCollection.ebook.push({
				bookId: i,
				name: "Lorum Ipsum",
				coverURL: "./assets\\9781638580645.jpg"
			});
		}
	}

	capitalizeKeys(key: string): string {
		return key.charAt(0).toUpperCase() + key.slice(1);
	}
}
