import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { tap } from "rxjs";
import { AuthenticationService } from "./authentication.service";
import { LocalCookiesService } from "./local-cookies.service";

export const IsModeratorGuard = () => {
	const router = inject(Router);
	const authService = inject(AuthenticationService);
	const cookieService = inject(LocalCookiesService);

	if (!cookieService.user) {
		router.navigate(["/"]);
		return;
	}

	return authService.validateCookies().pipe(
		tap((value) => {
			if (!value || cookieService.user.role_id.includes("user")) {
				router.navigate(["/login"]);
				return;
			}

			return true;
		})
	);
};
