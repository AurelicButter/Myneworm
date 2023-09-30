import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, of } from "rxjs";
import { environment } from "src/environments/environment";
import { Buffer } from "buffer";
import { LocalCookiesService } from "./local-cookies.service";

@Injectable({
	providedIn: "root"
})
export class AuthenticationService {
	constructor(
		private http: HttpClient,
		private cookieService: LocalCookiesService
	) {}

	login(username: string, password: string) {
		return this.http
			.post(
				`${environment.API_ADDRESS}/auth/login`,
				{},
				{
					headers: {
						"X-Requested-With": "XMLHttpRequest",
						"Content-Type": "application/x-www-form-urlencoded",
						Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`
					},
					withCredentials: true,
					observe: "response"
				}
			)
			.pipe(
				map((data) => {
					if (data.body !== null) {
						// eslint-disable-next-line @typescript-eslint/ban-ts-comment
						// @ts-ignore
						this.cookieService.updateUser(data.body.user);
						return true;
					}

					return of(`ERROR (500): Response was valid but data was not received.`);
				}),
				catchError((error) => {
					if (error.status === 401) {
						return of("Username or password is invalid");
					}
					return of(`ERROR (${error.status}): ${error.statusText}`);
				})
			);
	}

	validateCookies() {
		return this.http
			.post(
				`${environment.API_ADDRESS}/auth/validateCookies`,
				{},
				{
					withCredentials: true,
					observe: "response"
				}
			)
			.pipe(
				map((data) => {
					this.cookieService.updateUser(data.body);
					return true;
				}),
				catchError(() => {
					this.cookieService.deleteUser();
					return of(false);
				})
			);
	}

	isLoggedIn() {
		return this.http
			.post(
				`${environment.API_ADDRESS}/auth/isAuthenticated`,
				{},
				{
					withCredentials: true,
					observe: "response"
				}
			)
			.pipe(
				map((data) => {
					return data.status === 200;
				}),
				catchError((error) => {
					if (error.status === 401) {
						this.cookieService.deleteUser();
						return of(false);
					}
					return of(`ERROR (${error.status}): ${error.statusText}`);
				})
			);
	}

	reauthenticate() {
		return this.http
			.post(
				`${environment.API_ADDRESS}/auth/reauth`,
				{},
				{
					withCredentials: true,
					observe: "response"
				}
			)
			.pipe(
				map((data) => {
					return data.status === 200;
				}),
				catchError((error) => {
					return of(`ERROR (${error.status}): ${error.statusText}`);
				})
			);
	}

	resetPasswordRequest(email: string) {
		return this.http.post(`${environment.API_ADDRESS}/auth/reset`, { user: email }).pipe(
			map(() => true),
			catchError(() => of(false))
		);
	}

	resetPassword(resetID: string, password: string) {
		return this.http
			.post(`${environment.API_ADDRESS}/auth/reset/${resetID}`, {
				user: Buffer.from(password).toString("base64")
			})
			.pipe(
				map(() => true),
				catchError(() => of(false))
			);
	}

	clearSessions() {
		this.cookieService.deleteUser();
		return this.http.post(`${environment.API_ADDRESS}/auth/clear`, {});
	}

	logout() {
		return this.http
			.post(
				`${environment.API_ADDRESS}/auth/logout`,
				{},
				{
					withCredentials: true,
					observe: "response"
				}
			)
			.pipe(
				map((data) => {
					this.cookieService.deleteUser();
					return data.status === 200;
				}),
				catchError((error) => {
					if (error.status === 401) {
						this.cookieService.deleteUser();
						return of(false);
					}
					return of(`ERROR (${error.status}): ${error.statusText}`);
				})
			);
	}
}
