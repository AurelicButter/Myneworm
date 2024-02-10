import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

@Component({
	selector: "user-action-dropdown",
	standalone: true,
	templateUrl: "./user-action-dropdown.component.html",
	styleUrls: ["./user-action-dropdown.component.css"],
	imports: [CommonModule]
})
export class UserActionDropdownComponent {
	showMenu = false;

	constructor() {}

	changeMenuDisplay() {
		this.showMenu = !this.showMenu;
	}
}
