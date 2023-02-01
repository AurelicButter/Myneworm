import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { catchError } from "rxjs";
import { BookData } from "../models/bookData";
import { PublisherData } from "../models/publisherData";
import { MetadataService } from "../services/metadata.service";
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
		public utilities: UtilitiesService,
		private metaService: MetadataService
	) {}

	ngOnInit(): void {
		this.route.params.subscribe((data) => {
			this.service
				.getByISBN(data.isbn)
				.pipe(catchError((err) => this.utilities.catchAPIError(err)))
				.subscribe((data: BookData | null) => {
					if (data === null) {
						return;
					}

					this.book = data;
					this.metaService.updateMetaTags(
						this.book.title,
						`/book/${this.book.isbn}`,
						this.book.description,
						this.service.getAsset(`${this.book.isbn}`)
					);

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
