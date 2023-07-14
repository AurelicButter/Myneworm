import { Component } from "@angular/core";
import { MynewormAPIService } from "../services/myneworm-api.service";
import { MetadataService } from "../services/metadata.service";
import { RegistrationData } from "../models/RegistrationData";
import * as moment from "moment";
import { catchError, of } from "rxjs";
import { Router } from "@angular/router";

@Component({
	selector: "registration-page",
	templateUrl: "./registration-page.component.html",
	styleUrls: ["./registration-page.component.css"]
})
export class RegistrationPageComponent {
	registrationForm = new RegistrationData();
	usernameMatch = false;
	confirmedPassword = false;
	validBirthday = false;
	APIErrResponse = "";

	constructor(private service: MynewormAPIService, private router: Router, private metaService: MetadataService) {
		this.metaService.updateMetaTags("Registration", "/register");
	}

	submit() {
		this.service
			.registerUser(this.registrationForm)
			.pipe(
				catchError((err) => {
					this.APIErrResponse = err.error.errors;
					return of(null);
				})
			)
			.subscribe((data: any | null) => {
				if (data === null) {
					return;
				}
				// Add message to showcase success at login page.
				this.router.navigate(["/login"]);
			});
	}

	async checkPasswordUsernameMatch() {
		const oldInput = this.registrationForm.password;
		await new Promise((resolve) => setTimeout(resolve, 1000));
		if (oldInput === this.registrationForm.password) {
			this.usernameMatch = this.registrationForm.password === this.registrationForm.username;
			return;
		}
	}

	async checkPasswordConfirmation() {
		const oldInput = this.registrationForm.password;
		await new Promise((resolve) => setTimeout(resolve, 1000));
		if (oldInput === this.registrationForm.password) {
			this.confirmedPassword = this.registrationForm.password === this.registrationForm.confirmed;
			return;
		}
	}

	birthdayCheck() {
		this.validBirthday = moment(this.registrationForm.birthday).isBefore(moment().subtract(13, "years"));
	}
}
