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
	user: any;

	constructor(private authService: AuthenticationService, private cookieService: LocalCookiesService) {
		this.cookieService.userEvent.subscribe((value) => {
			this.user = value;
			this.isAuthenticated = Object.keys(this.user).length > 0;
		});
	}

	ngOnInit(): void {
		if (Object.keys(this.user).length > 0) {
			this.authService.isLoggedIn().subscribe((value) => {
				this.isAuthenticated = value ? true : false;
			});
		}
	}
}
