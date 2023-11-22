import { Component, Input } from "@angular/core";
import { WishlistEntry } from "src/app/models/WishlistEntry";
import { MynewormAPIService } from "src/app/services/myneworm-api.service";
import { UtilitiesService } from "src/app/services/utilities.service";

@Component({
	selector: "wishlist-display",
	templateUrl: "./wishlist-display.component.html",
	styleUrls: ["../wishlist.component.css"]
})
export class WishlistDisplayComponent {
	@Input() book: WishlistEntry;

	constructor(
		private service: MynewormAPIService,
		public utilities: UtilitiesService
	) {}

	getCover() {
		return this.service.getCover(this.book.isbn.toString(), "small");
	}
}
