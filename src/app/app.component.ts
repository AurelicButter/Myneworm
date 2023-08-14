import { Component, OnInit } from "@angular/core";
import { LocalCookiesService } from "./services/authentication/local-cookies.service";
import { AuthenticationService } from "./services/authentication/authentication.service";

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
		private cookieService: LocalCookiesService
	) {
		this.cookieService.userEvent.subscribe((value) => {
			this.isAuthenticated = Object.keys(value).length > 0;
		});
	}

	ngOnInit(): void {
		this.authService.isLoggedIn().subscribe((value) => {
			this.isAuthenticated = value ? true : false;
		});
	}
}
