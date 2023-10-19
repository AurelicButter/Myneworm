import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { catchError } from "rxjs";
import { ListEntry } from "src/app/models/ListEntry";
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
	wishlist: ListEntry[];

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
						.getUserListByOwnership(data.user_id.toString(), "wanting")
						.pipe(catchError((err) => this.utilities.catchAPIError(err)))
						.subscribe((data: ListEntry[] | null) => {
							if (data === null) {
								return;
							}

							this.wishlist = data;
						});
				});
		});
	}
}
