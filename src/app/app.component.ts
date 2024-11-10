import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "./services/authentication/authentication.service";
import { AuthUserService } from "./services/authentication/auth-user.service";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.css", "./shared/navigation-bar.css"]
})
export class AppComponent implements OnInit {
	title = "Myneworm";
	currYear = new Date().getFullYear();
	isAuthenticated = false;

	constructor(
		private authService: AuthenticationService,
		private AuthUser: AuthUserService
	) {
		this.AuthUser.userEvent.subscribe(() => {
			this.isAuthenticated = this.AuthUser.isLoggedIn();
		});
	}

	ngOnInit(): void {
		if (this.isAuthenticated) {
			this.authService.validateCookies().subscribe((value) => {
				this.isAuthenticated = value ? true : false;
			});
		}
	}
}
