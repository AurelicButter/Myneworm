import { Component } from "@angular/core";
import { LocalCookiesService } from "./services/authentication/local-cookies.service";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.css", "./shared/navigation-bar.css"]
})
export class AppComponent {
	title = "Myneworm";
	currYear = new Date().getFullYear();
	isAuthenticated: boolean;
	user: any;

	constructor(private cookieService: LocalCookiesService) {
		this.cookieService.userEvent.subscribe((value) => {
			this.user = value;
			this.isAuthenticated = Object.keys(this.user).length !== 0;
		});
	}
}
