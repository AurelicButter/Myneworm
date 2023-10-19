import { Component, Input } from "@angular/core";
import { catchError } from "rxjs";
import { ListEntry } from "src/app/models/ListEntry";
import { BookData } from "src/app/models/bookData";
import { MynewormAPIService } from "src/app/services/myneworm-api.service";
import { UtilitiesService } from "src/app/services/utilities.service";

@Component({
	selector: "wishlist-display",
	templateUrl: "./wishlist-display.component.html",
	styleUrls: ["./wishlist-display.component.css"]
})
export class WishlistDisplayComponent {
	@Input() book: ListEntry;
	extendedDetails: BookData;

	constructor(
		private service: MynewormAPIService,
		public utilities: UtilitiesService
	) {}

	ngOnInit() {
		this.service
			.getByISBN(this.book.isbn.toString())
			.pipe(catchError((err) => this.utilities.catchAPIError(err)))
			.subscribe((data: BookData | null) => {
				if (data === null) {
					return;
				}

				this.extendedDetails = data;
			});
	}

	getCover() {
		return this.service.getCover(this.book.isbn.toString(), "medium");
	}
}
