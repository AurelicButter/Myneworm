import { Component } from "@angular/core";
import { LocalCookiesService } from "src/app/services/authentication/local-cookies.service";

@Component({
	selector: "home-panel",
	templateUrl: "./home-panel.component.html",
	styleUrls: ["./home-panel.component.css"]
})
export class HomePanelComponent {
	user: any;

	constructor(private cookieService: LocalCookiesService) {
		this.cookieService.userEvent.subscribe((value) => {
			this.user = value;
		});
	}
}
