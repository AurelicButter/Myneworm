import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MynewormAPIService } from "../services/myneworm-api.service";
import { LocalCookiesService } from "../services/authentication/local-cookies.service";
import { catchError } from "rxjs";
import { UtilitiesService } from "../services/utilities.service";
import { UserData } from "../models/userData";

@Component({
	selector: "user-settings-page",
	templateUrl: "./user-settings-page.component.html",
	styleUrls: ["./user-settings-page.component.css"]
})
export class UserSettingsPageComponent implements OnInit {
	currPage: string;
	message: string;
	url: string | ArrayBuffer | null | undefined;
	private user: any;
	profileData: UserData;
	avatarForm = new FormData();

	constructor(
		private route: ActivatedRoute,
		private service: MynewormAPIService,
		private cookieService: LocalCookiesService,
		private utilities: UtilitiesService
	) {
		this.cookieService.userEvent.subscribe((value) => {
			this.user = value;

			this.service
				.getAuthUser(this.user.user_id)
				.pipe(catchError((err) => this.utilities.catchAPIError(err)))
				.subscribe((data: UserData | null) => {
					if (data === null) {
						return;
					}

					this.profileData = data;
				});
		});
	}

	ngOnInit() {
		this.route.params.subscribe((data) => {
			if (data.page) {
				this.currPage = data.page.toUpperCase();
			} else {
				this.currPage = "PROFILE";
			}
		});
	}

	updatePage(clickEvent: string) {
		this.currPage = clickEvent;
	}

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	onFileChanged(event) {
		const files = event.target.files;
		if (files.length === 0) {
			return;
		}

		if (files[0].type.match(/image\/*/) === null) {
			this.message = "Only images are supported.";
			return;
		}

		this.avatarForm.append("KS-Myneworm", files[0]);

		const reader = new FileReader();
		reader.readAsDataURL(files[0]);
		reader.onload = () => {
			this.url = reader.result;
		};
	}

	resetAvatar() {
		this.url = undefined;
	}

	async submitProfile() {
		if (this.url !== undefined && this.url !== null) {
			this.service.updateAvatar(this.avatarForm).subscribe();
		}
		return;
	}

	submitAccount() {
		return;
	}
}
