import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { AuthUser } from "../../models/AuthUser";
import { UserPermissions } from "../../constants/UserPermissions";

@Injectable({
	providedIn: "root"
})
export class AuthUserService {
	userEvent = new BehaviorSubject<AuthUser | null>(null);
	user: AuthUser | null = null;
	private userPermissions: string[];

	constructor() {
		this.userEvent.subscribe((value) => {
			this.user = value;
		});

		const cachedAuth = localStorage.getItem("user");

		if (cachedAuth) {
			this.user = JSON.parse(cachedAuth);
		}
		this.userEvent.next(this.user);
	}

	isLoggedIn() {
		return this.user !== null;
	}

	isModerator() {
		return this.user !== null && this.userPermissions && this.userPermissions.includes(UserPermissions.STAFF);
	}

	isSameUser(username: string) {
		return this.user !== null && this.user.username === username;
	}

	setPermissions(permissions: UserPermissions[]) {
		this.userPermissions = permissions;
	}

	hasPermission(...permissions: UserPermissions[]) {
		for (let i = 0; i < permissions.length; i++) {
			if (!this.userPermissions.includes(permissions[i])) {
				return false;
			}
		}
		return true;
	}

	updateUser(userObj: any) {
		this.userPermissions = userObj["permissions"];
		delete userObj["permissions"];
		this.user = userObj;
		localStorage.setItem("user", JSON.stringify(userObj));
		this.userEvent.next(this.user);
	}

	deleteUser() {
		localStorage.removeItem("user");
		this.user = null;
		this.userPermissions = [];
		this.userEvent.next(this.user);
	}
}
