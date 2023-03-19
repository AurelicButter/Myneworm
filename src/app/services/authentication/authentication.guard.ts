import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthenticationService } from "./authentication.service";

@Injectable({
	providedIn: "root"
})
export class AuthenticationGuard implements CanActivate {
	constructor(private authService: AuthenticationService, private router: Router) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
		return this.authenticate();
	}

	private authenticate(): boolean {
		if (!this.authService.isLoggedIn()) {
			this.router.navigateByUrl("/login");
			return false;
		}
		return true;
	}
}
