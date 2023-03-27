import { Component, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { loginForm } from "src/app/models/loginForm";
import { AuthenticationService } from "src/app/services/authentication/authentication.service";
import { MetadataService } from "src/app/services/metadata.service";

@Component({
	selector: "login-page",
	templateUrl: "./login-page.component.html",
	styleUrls: ["./login-page.component.css"]
})
export class LoginPageComponent {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	@ViewChild("loginForm") dataForm: any;
	login = new loginForm();
	public err = "";

	constructor(
		private route: ActivatedRoute,
		private authService: AuthenticationService,
		private metaService: MetadataService
	) {
		this.metaService.updateMetaTags("Login", "/login");
	}

	resetForm() {
		this.dataForm.reset();
	}

	submit() {
		if (
			this.login.username === undefined ||
			this.login.username === "" ||
			this.login.password === undefined ||
			this.login.password === ""
		) {
			this.err = "Missing username or password";
			return;
		}

		this.authService.login(this.login.username, this.login.password).subscribe((data) => {
			if (typeof data === "string") {
				this.err = data;
				return;
			}

			this.err = "";
			// Redirect to user homepage
		});
	}

	logout() {
		this.authService.logout().subscribe((data) => {
			// Reroute to home page
		});
	}
}
