import { Component, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { loginForm } from "src/app/models/loginForm";
import { AuthenticationService } from "src/app/services/authentication/authentication.service";
import { MetadataService } from "src/app/services/metadata.service";
import { ToastService } from "../services/toast.service";

@Component({
	selector: "login-page",
	templateUrl: "./login-page.component.html",
	styleUrls: ["./login-page.component.css"]
})
export class LoginPageComponent {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	@ViewChild("loginForm") dataForm: any;
	login = new loginForm();

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private authService: AuthenticationService,
		private metaService: MetadataService,
		private toastService: ToastService
	) {
		this.metaService.updateMetaTags("Login", "/login");
	}

	ngOnInit() {
		this.route.queryParams.subscribe((params) => {
			if (Object.keys(params).length === 0) {
				return;
			}

			if (params.state === "expired") {
				this.toastService.sendError("Session expired. Please reauthenticate.");
			}

			this.router.navigate([], { relativeTo: this.route });
		});
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
			this.toastService.sendError("Failed to login. Missing username or password");
			return;
		}

		this.authService.login(this.login.username, this.login.password).subscribe((data) => {
			if (typeof data === "string") {
				this.toastService.sendError(data);
				return;
			}

			this.router.navigate(["/home"]);
		});
	}
}
