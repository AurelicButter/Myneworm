import { Component } from "@angular/core";
import { AuthUser } from "src/app/models/AuthUser";
import { AuthUserService } from "src/app/services/authentication/auth-user.service";

@Component({
	selector: "home-panel",
	templateUrl: "./home-panel.component.html",
	styleUrls: ["./home-panel.component.css"]
})
export class HomePanelComponent {
	user: AuthUser;

	constructor(private AuthUser: AuthUserService) {
		this.AuthUser.userEvent.subscribe((value) => {
			if (value !== null) {
				this.user = value;
			}
		});
	}
}
