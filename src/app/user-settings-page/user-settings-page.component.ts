import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MynewormAPIService } from "../services/myneworm-api.service";
import { LocalCookiesService } from "../services/authentication/local-cookies.service";
import { AccountData, UserData } from "../models/userData";
import { AccountUpdateData } from "../models/accountUpdateData";
import { ToastService } from "../services/toast.service";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { DeleteConfirmationComponent } from "./delete-confirmation/delete-confirmation.component";
import { AuthenticationService } from "../services/authentication/authentication.service";
import { email, password, username } from "../models/validationPatterns";
import { MarkdownHelpModalComponent } from "../modals/markdown-help/markdown-help.modal.component";

@Component({
	selector: "user-settings-page",
	templateUrl: "./user-settings-page.component.html",
	styleUrls: ["./user-settings-page.component.css"]
})
export class UserSettingsPageComponent implements OnInit {
	currPage: string;
	url: string | ArrayBuffer | null | undefined;
	private user: any;
	private oldEmail: string;
	profileData: UserData;
	accountData: AccountData;
	avatarForm = new FormData();
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	@ViewChild("profileForm") profileForm: any;

	usernamePattern = username;
	passwordPattern = password;
	emailPattern = email;

	constructor(
		private route: ActivatedRoute,
		private service: MynewormAPIService,
		private cookieService: LocalCookiesService,
		private authService: AuthenticationService,
		private toastService: ToastService,
		private matDialog: MatDialog,
		private router: Router
	) {
		this.cookieService.userEvent.subscribe((value) => {
			this.user = value;
		});
	}

	ngOnInit() {
		this.service.getAuthUser(this.user.user_id).subscribe((data: UserData | null) => {
			if (data === null) {
				return;
			}

			this.profileData = data;
			this.profileData.displaybirthday = data.birthday !== null;
		});
		this.service.getAccount().subscribe((data: AccountData | null) => {
			if (data === null) {
				return;
			}

			this.accountData = data;
			this.oldEmail = data.email;
		});

		this.route.params.subscribe((data) => {
			this.currPage = data.page ? data.page.toUpperCase() : "PROFILE";
		});
	}

	updatePage(clickEvent: string) {
		this.currPage = clickEvent;
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onFileChanged(event: any) {
		const files = event.target.files;
		if (files.length === 0) {
			return;
		}

		const file = files[0];

		if (file.type !== "image/jpeg" && file.type !== "image/png") {
			return this.toastService.sendError("Avatar must be in a PNG or JPEG file format");
		}

		// Check file size. Reject if more than 3MB
		if (file.size / 1048576 > 3) {
			return this.toastService.sendError("Image must be 3MB or less");
		}

		this.avatarForm.delete("KS-Myneworm");
		this.avatarForm.append("KS-Myneworm", file);

		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => {
			this.url = reader.result;
		};
	}

	resetAvatar() {
		this.url = undefined;
	}

	deleteAccount() {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.id = "delete-confirmation";

		const deleteConfirmed = this.matDialog.open(DeleteConfirmationComponent, dialogConfig);

		deleteConfirmed.afterClosed().subscribe((check) => {
			if (check) {
				this.authService.logout().subscribe(() => {
					this.router.navigate(["/"]);
				});
			}
		});
	}

	clearSessions() {
		this.authService.clearSessions().subscribe((data: any | null) => {
			if (data === null) {
				return;
			}

			this.toastService.sendSuccess("Sessions Cleared.");
			this.router.navigate(["/"]);
		});
	}

	submitProfile() {
		if (this.url !== undefined && this.url !== null) {
			this.service.updateAvatar(this.avatarForm).subscribe((data: any | null) => {
				if (data === null) {
					return;
				}

				this.toastService.sendSuccess("Avatar saved");
			});
		}

		if (!this.profileForm.pristine) {
			this.service
				.updateProfile({
					about_me: this.profileData.about_me === "" ? null : this.profileData.about_me,
					display_name: this.profileData.display_name === "" ? null : this.profileData.display_name,
					location: this.profileData.location === "" ? null : this.profileData.location,
					displaybirthday: this.profileData.displaybirthday
				})
				.subscribe((data: any | null) => {
					if (data === null) {
						return;
					}

					this.toastService.sendSuccess("Updated profile");
				});
		}
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

		if (Object.keys(accountInfo).length === 0) {
			return;
		}

		this.service.updateAccount(accountInfo).subscribe((data: any | null) => {
			if (data === null) {
				return;
			}

			this.toastService.sendSuccess("Saved account details");
		});
	}

	getCurrAvatar() {
		return this.service.getAsset(`user/${this.user.user_id}`);
	}

	openMarkdownGuide() {
		this.matDialog.open(MarkdownHelpModalComponent, {
			id: "markdown-help"
		});
	}
}
