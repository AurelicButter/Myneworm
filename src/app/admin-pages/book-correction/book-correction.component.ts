import { Component } from "@angular/core";
import { Location } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { MynewormAPIService } from "src/app/services/myneworm-api.service";
import { BookData } from "src/app/models/bookData";
import { BookCorrectionEntry } from "src/app/models/BookCorrection";

@Component({
	selector: "book-correction",
	templateUrl: "./book-correction.component.html",
	styleUrls: ["./book-correction.component.css"]
})
export class BookCorrectionComponent {
	bookData: BookData;
	correctionData: BookCorrectionEntry;

	constructor(
		private service: MynewormAPIService,
		private location: Location,
		private route: ActivatedRoute,
		private router: Router
	) {}

	ngOnInit() {
		this.route.params.subscribe((data) => {
			// use correction ID to grab correction entry
			this.service.getByISBN(data.isbn).subscribe((bookInfo) => {
				if (!bookInfo) {
					return;
				}

				this.bookData = bookInfo;
			});
		});
	}

	returnPrevPage() {
		this.location.back();
	}
}
