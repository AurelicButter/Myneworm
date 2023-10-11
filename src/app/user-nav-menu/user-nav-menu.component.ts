import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "../services/authentication/authentication.service";
import { LocalCookiesService } from "../services/authentication/local-cookies.service";

@Component({
	selector: "user-nav-menu",
	templateUrl: "./user-nav-menu.component.html",
	styleUrls: ["./user-nav-menu.component.css", "../shared/navigation-bar.css"]
})
export class UserNavMenuComponent {
	user: any;
	isModerator = false;

	constructor(
		private router: Router,
		private authService: AuthenticationService,
		private cookieService: LocalCookiesService
	) {
		this.cookieService.userEvent.subscribe((value) => {
			this.user = value;
			this.isModerator = !this.user.role_id.includes("user");
		});
	}

	logout() {
		this.authService.logout().subscribe(() => {
			this.router.navigate(["/home"]);
		});
	}
}
