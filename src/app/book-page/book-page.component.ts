import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { BookData } from "../models/bookData";
import { PublisherData } from "../models/publisherData";
import { MynewormAPIService } from "../services/myneworm-api.service";
import { UtilitiesService } from "../services/utilities.service";

@Component({
	selector: "app-book-page",
	templateUrl: "./book-page.component.html",
	styleUrls: ["./book-page.component.css"]
})
export class BookPageComponent implements OnInit {
	book: BookData;
	publisher: PublisherData;

	constructor(
		private route: ActivatedRoute,
		private service: MynewormAPIService,
		private titleService: Title,
		public utilities: UtilitiesService
	) {}

	ngOnInit(): void {
		this.route.params.subscribe((data) => {
			this.service.getByISBN(data.isbn).subscribe((data: BookData) => {
				this.book = data;
				this.titleService.setTitle(`Myneworm - ${this.book.title}`);

				this.service.getPublisher(data.publisher_id.toString()).subscribe((pubData: PublisherData) => {
					this.publisher = pubData;
				});
			});
		});
	}

	getCover(isbn: string) {
		return this.service.getAsset(`${isbn}`);
	}
}
