import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { catchError } from "rxjs";
import { WishlistEntry } from "src/app/models/WishlistEntry";
import { UserData } from "src/app/models/userData";
import { MetadataService } from "src/app/services/metadata.service";
import { MynewormAPIService } from "src/app/services/myneworm-api.service";
import { UtilitiesService } from "src/app/services/utilities.service";

@Component({
	selector: "wishlist",
	templateUrl: "./wishlist.component.html",
	styleUrls: ["./wishlist.component.css"]
})
export class WishlistComponent {
	user: UserData;
	wishlist: WishlistEntry[] = [];
	selectedSort: string = "title_asc";

	constructor(
		private route: ActivatedRoute,
		private service: MynewormAPIService,
		public utilities: UtilitiesService,
		private metaService: MetadataService
	) {}

	ngOnInit() {
		this.route.params.subscribe((data) => {
			this.service
				.getUser(data.username)
				.pipe(catchError((err) => this.utilities.catchAPIError(err)))
				.subscribe((data: UserData | null) => {
					if (data === null) {
						return;
					}

					this.user = data;
					this.metaService.updateMetaTags(
						`${this.user.display_name || this.user.username}'s Wishlist`,
						`/user/${this.user.username}/wishlist`,
						this.user.about_me || undefined,
						this.service.getAsset(`/assets/user/${this.user.user_id}`)
					);

					this.service
						.getUserWishlist(data.user_id.toString())
						.pipe(catchError((err) => this.utilities.catchAPIError(err)))
						.subscribe((data: WishlistEntry[] | null) => {
							if (data === null) {
								return;
							}

							this.wishlist = data;
						});
				});
		});
	}

	selectSort(input: string) {
		this.selectedSort = input;
		this.sort();
	}

	sort() {
		if (this.selectedSort === "title_asc") {
			this.wishlist.sort((a, b) => a.title.localeCompare(b.title));
		} else if (this.selectedSort === "title_desc") {
			this.wishlist.sort((a, b) => a.title.localeCompare(b.title) * -1);
		} else if (this.selectedSort === "release_asc") {
			this.wishlist.sort((a, b) => new Date(a.release_date).getTime() - new Date(b.release_date).getTime());
		} else if (this.selectedSort === "release_desc") {
			this.wishlist.sort(
				(a, b) => (new Date(a.release_date).getTime() - new Date(b.release_date).getTime()) * -1
			);
		}
	}
}
