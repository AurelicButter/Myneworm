import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { WishlistEntry } from "src/app/models/WishlistEntry";
import { UserData } from "src/app/models/userData";
import { LocalCookiesService } from "src/app/services/authentication/local-cookies.service";
import { MetadataService } from "src/app/services/metadata.service";
import { MynewormAPIService } from "src/app/services/myneworm-api.service";
import { ToastService } from "src/app/services/toast.service";
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
	editMsg = false;
	isAuthUser = false;
	updateMsg: string | null = "";
	loading = true;

	constructor(
		private route: ActivatedRoute,
		private service: MynewormAPIService,
		public utilities: UtilitiesService,
		private metaService: MetadataService,
		private cookieService: LocalCookiesService,
		private toastService: ToastService
	) {}

	ngOnInit() {
		this.route.params.subscribe((data) => {
			this.service.getUser(data.username).subscribe((data: UserData | null) => {
				if (data === null) {
					return;
				}

				this.user = data;
				this.isAuthUser = this.cookieService.user.username === this.user.username;

				if (!this.user.wishlist_msg) {
					this.user.wishlist_msg = null;
				}
				this.metaService.updateMetaTags(
					`${this.user.display_name || this.user.username}'s Wishlist`,
					`/user/${this.user.username}/wishlist`,
					this.user.about_me || undefined,
					this.service.getAsset(`/assets/user/${this.user.user_id}`)
				);

				this.service.getUserWishlist(data.user_id.toString()).subscribe((data: WishlistEntry[] | null) => {
					if (data === null) {
						return;
					}

					this.wishlist = data;
					this.loading = false;
				});
			});
		});
	}

	getAvatar() {
		return this.service.getAsset(`user/${this.user.user_id}`);
	}

	editMessage() {
		this.updateMsg = this.user.wishlist_msg || null;
		this.editMsg = !this.editMsg;
	}

	saveMsg() {
		if (this.updateMsg === this.user.wishlist_msg) {
			this.editMsg = !this.editMsg;
			return;
		}

		this.service.updateProfile({ wishlist_msg: this.updateMsg }).subscribe((data: UserData | null) => {
			if (data === null) {
				return this.toastService.sendError("Failed to save wishlist message...");
			}
			this.editMsg = !this.editMsg;
			this.user.wishlist_msg = data.wishlist_msg;
			this.toastService.sendSuccess("Updated wishlist message!");
		});
	}

	cancelMsg() {
		this.updateMsg = null;
		this.editMsg = !this.editMsg;
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

	updateWishlist(eventData: boolean, index: number) {
		if (!eventData) {
			return; // No updates to ownership status. Ignore other edits.
		}

		this.wishlist.splice(index, 1);
	}
}
