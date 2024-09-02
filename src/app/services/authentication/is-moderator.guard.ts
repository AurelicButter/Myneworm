import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { tap } from "rxjs";
import { AuthenticationService } from "./authentication.service";
import { AuthUserService } from "./auth-user.service";

export const IsModeratorGuard = () => {
	const router = inject(Router);
	const authService = inject(AuthenticationService);
	const AuthUser = inject(AuthUserService);

	if (!AuthUser.user) {
		router.navigate(["/"]);
		return;
	}

	return authService.validateCookies().pipe(
		tap((value) => {
			if (!value || !AuthUser.isModerator()) {
				router.navigate(["/login"]);
				return;
			}

			return true;
		})
	);
};
