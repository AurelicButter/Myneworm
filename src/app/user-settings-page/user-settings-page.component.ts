import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MynewormAPIService } from "../services/myneworm-api.service";
import { LocalCookiesService } from "../services/authentication/local-cookies.service";
import { catchError } from "rxjs";
import { UtilitiesService } from "../services/utilities.service";
import { AccountData, UserData } from "../models/userData";
import { AccountUpdateData } from "../models/accountUpdateData";

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
	private oldEmail: string;
	profileData: UserData;
	accountData: AccountData;
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
					this.profileData.displaybirthday = data.birthday !== null;
				});
			this.service
				.getAccount()
				.pipe(catchError((err) => this.utilities.catchAPIError(err)))
				.subscribe((data: AccountData | null) => {
					if (data === null) {
						return;
					}

					this.accountData = data;
					this.oldEmail = data.email;
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

	submitProfile() {
		if (this.url !== undefined && this.url !== null) {
			this.service.updateAvatar(this.avatarForm).subscribe();
		}

		this.service
			.updateProfile({
				about_me: this.profileData.about_me,
				display_name: this.profileData.display_name,
				location: this.profileData.location,
				displaybirthday: this.profileData.displaybirthday
			})
			.subscribe();
		return;
	}

	submitAccount() {
		const accountInfo: AccountUpdateData = {};

		if (this.accountData.username !== this.user.username) {
			accountInfo.username = this.accountData.username;
		}

		if (this.accountData.password !== undefined && this.accountData.password === this.accountData.confirm) {
			accountInfo.password = this.accountData.password;
		}

		if (this.accountData.email !== this.oldEmail) {
			accountInfo.email = this.accountData.email;
		}

		if (Object.keys(accountInfo).length > 0) {
			this.service.updateAccount(accountInfo).subscribe();
		}
	}
}
