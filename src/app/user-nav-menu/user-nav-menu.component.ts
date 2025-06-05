import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "../services/authentication/authentication.service";
import { LocalCookiesService } from "../services/authentication/local-cookies.service";
import { MynewormAPIService } from "../services/myneworm-api.service";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { CommonModule } from "@angular/common";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

@Component({
	selector: "user-nav-menu",
	templateUrl: "./user-nav-menu.component.html",
	styleUrls: ["./user-nav-menu.component.css", "../shared/navigation-bar.css"],
	standalone: true,
	imports: [CommonModule, FontAwesomeModule]
})
export class UserNavMenuComponent {
	user: any;
	isModerator = false;
	faChevronDown = faChevronDown;

	constructor(
		private router: Router,
		private authService: AuthenticationService,
		private cookieService: LocalCookiesService,
		private service: MynewormAPIService
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

	getAvatar() {
		return this.service.getAsset(`user/${this.user.user_id}`);
	}
}
