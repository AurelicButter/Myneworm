import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { catchError } from "rxjs";
import { MetadataService } from "../services/metadata.service";
import { MynewormAPIService } from "../services/myneworm-api.service";
import { UtilitiesService } from "../services/utilities.service";
import { UserData } from "../models/userData";
import * as moment from "moment";
import { UserStatisticsProfile } from "../models/userStatisticsData";

@Component({
	selector: "user-profile-page",
	templateUrl: "./user-profile-page.component.html",
	styleUrls: ["./user-profile-page.component.css"]
})
export class UserProfilePageComponent {
	profileInfo: UserData;
	activeStatusCount = {
		reading: 0,
		completed: 0,
		paused: 0,
		dropped: 0,
		planning: 0
	};
	ownershipCount = {
		owned: 0,
		previous_own: 0,
		loaned: 0,
		wanted: 0
	};
	bookTypeCount = {
		paperback: 0,
		ebook: 0,
		hardcover: 0,
		audiobook: 0
	};
	triggerUpdate = false;

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

					this.profileInfo = data;
					this.metaService.updateMetaTags(
						`${this.profileInfo.display_name || this.profileInfo.username}'s Profile`,
						`/user/${this.profileInfo.username}`,
						this.profileInfo.about_me || undefined,
						this.service.getAsset(`/assets/user/${this.profileInfo.user_id}`)
					);
				});
			this.service
				.getUserStats(data.username)
				.pipe(catchError((err) => this.utilities.catchAPIError(err)))
				.subscribe((data: UserStatisticsProfile | null) => {
					if (data === null) {
						return;
					}

					this.activeStatusCount.reading = data.active_reading;
					this.activeStatusCount.completed = data.active_completed;
					this.activeStatusCount.paused = data.active_paused;
					this.activeStatusCount.dropped = data.active_dropped;
					this.activeStatusCount.planning = data.active_planning;

					this.ownershipCount.owned = data.owner_owned;
					this.ownershipCount.loaned = data.owner_loaned;
					this.ownershipCount.previous_own = data.owner_previous;
					this.ownershipCount.wanted = data.owner_wanting;

					this.bookTypeCount.paperback = data.type_paperback;
					this.bookTypeCount.ebook = data.type_ebook;
					this.bookTypeCount.hardcover = data.type_hardcover;
					this.bookTypeCount.audiobook = data.type_audiobook;

					this.refreshComponent();
				});
		});
	}

	refreshComponent() {
		this.triggerUpdate = !this.triggerUpdate;
	}

	isOnlineText() {
		return moment(this.profileInfo.last_login).from(moment());
	}

	getAvatar() {
		return this.service.getAsset(`user/${this.profileInfo.user_id}`);
	}
}
