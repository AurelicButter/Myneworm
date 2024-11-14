import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "../services/authentication/authentication.service";
import { AuthUser } from "../models/AuthUser";
import { AuthUserService } from "../services/authentication/auth-user.service";

@Component({
	selector: "user-nav-menu",
	templateUrl: "./user-nav-menu.component.html",
	styleUrls: ["./user-nav-menu.component.css", "../shared/navigation-bar.css"]
})
export class UserNavMenuComponent {
	user: AuthUser | null;
	isModerator = false;

	constructor(
		private router: Router,
		private authService: AuthenticationService,
		private AuthUser: AuthUserService
	) {
		this.AuthUser.userEvent.subscribe((value) => {
			this.user = value;
			this.isModerator = this.AuthUser.isModerator();
		});
	}

	logout() {
		this.authService.logout().subscribe(() => {
			this.router.navigate(["/home"]);
		});
	}
}
