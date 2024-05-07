import { Component } from "@angular/core";
import { MynewormAPIService } from "../../services/myneworm-api.service";
import { MetadataService } from "../../services/metadata.service";
import { RegistrationData } from "../../models/RegistrationData";
import * as moment from "moment";
import { catchError, of } from "rxjs";
import { Router } from "@angular/router";
import { ToastService } from "../../services/toast.service";
import { password, username, passwordHelp, email } from "../../models/validationPatterns";

@Component({
	selector: "registration-page",
	templateUrl: "./registration.component.html",
	styleUrls: ["../../shared/authentication-pages.css"]
})
export class RegistrationPageComponent {
	registrationForm = new RegistrationData();
	usernameMatch = false;
	validBirthday = false;

	passwordPattern = password;
	usernamePattern = username;
	emailPattern = email;
	passwordHelp = passwordHelp;

	constructor(
		private service: MynewormAPIService,
		private router: Router,
		private metaService: MetadataService,
		private toastService: ToastService
	) {
		this.metaService.updateMetaTags("Registration", "/register");
	}

	submit() {
		this.service
			.registerUser(this.registrationForm)
			.pipe(
				catchError((err) => {
					this.toastService.sendError(err.error.errors);
					return of(null);
				})
			)
			.subscribe((data: any | null) => {
				if (data === null) {
					return;
				}

				this.toastService.sendSuccess("Created account! Please login to continue.");
				this.router.navigate(["/login"]);
			});
	}

	async checkPasswordUsernameMatch() {
		const oldInput = this.registrationForm.password;
		await new Promise((resolve) => setTimeout(resolve, 1000));
		if (oldInput === this.registrationForm.password) {
			this.usernameMatch = this.registrationForm.password === this.registrationForm.username;
		}
	}

	birthdayCheck() {
		this.validBirthday = moment(this.registrationForm.birthday).isBefore(moment().subtract(13, "years"));
	}
}
