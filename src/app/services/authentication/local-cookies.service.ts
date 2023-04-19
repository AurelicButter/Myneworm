import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
	providedIn: "root"
})
export class LocalCookiesService {
	userEvent: BehaviorSubject<any> = new BehaviorSubject({});
	user: any;

	constructor() {
		this.userEvent.subscribe((value) => {
			this.user = value;
		});

		this.user = JSON.parse(localStorage.getItem("user") || "{}");
		this.userEvent.next(this.user);
	}

	updateUser(userObj: any) {
		localStorage.setItem("user", JSON.stringify(userObj));
		this.user = userObj;
		this.userEvent.next(this.user);
	}

	deleteUser() {
		localStorage.removeItem("user");
		this.user = {};
		this.userEvent.next(this.user);
	}
}
