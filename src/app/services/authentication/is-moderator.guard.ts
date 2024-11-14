import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthUserService } from "./auth-user.service";

export const IsModeratorGuard = () => {
	const router = inject(Router);
	const AuthUser = inject(AuthUserService);

	if (!AuthUser.user) {
		router.navigate(["/"]);
		return;
	}

	if (!AuthUser.isModerator()) {
		router.navigate(["/login"]);
		return;
	}

	return true;
};
