import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, of } from "rxjs";
import { LoginResponse } from "src/app/models/authInterfaces";
import { environment } from "src/environments/environment";

@Injectable({
	providedIn: "root"
})
export class AuthenticationService {
	constructor(private http: HttpClient) {}

	login(username: string, password: string): Observable<boolean> {
		return this.http
			.post<LoginResponse>(
				`${environment.API_ADDRESS}/user/${username}`,
				{},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`
					}
				}
			)
			.pipe(
				map((data: LoginResponse) => {
					if (data.token !== null) {
						localStorage.setItem("auth", data.token);
						localStorage.setItem("lastCheck", Date.now().toString());
						return true;
					}
					return false;
				}),
				catchError((error) => {
					return of(false);
				})
			);
	}

	logout(): boolean {
		localStorage.removeItem("auth");
		localStorage.removeItem("lastCheck");
		return true;
	}

	private validateToken(): Observable<boolean> {
		return this.http.post<boolean>(
			`${environment.API_ADDRESS}/auth/authorized`,
			{},
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("auth")}`
				}
			}
		);
	}

	isLoggedIn(): boolean {
		if (localStorage.getItem("auth") === null) {
			return false;
		}
		// If the last validation was more than a day ago, validate token again.
		if (Number(localStorage.getItem("lastCheck")) + 86400000 < Date.now()) {
			this.validateToken().pipe(
				map((value) => {
					return value;
				}),
				catchError((error) => {
					return of(false);
				})
			);
		}

		return true;
	}
}
