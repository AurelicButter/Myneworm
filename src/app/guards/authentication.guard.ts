import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { tap } from "rxjs";
import { AuthenticationService } from "../services/authentication/authentication.service";

export const AuthenticationGuard = () => {
	const router = inject(Router);
	const authService = inject(AuthenticationService);

	return authService.validateCookies().pipe(
		tap((value) => {
			return value ? true : router.navigate(["/login"], { queryParams: { state: "expired" } });
		})
	);
};
