import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, of } from "rxjs";
import { environment } from "src/environments/environment";
import { Buffer } from "buffer";

@Injectable({
	providedIn: "root"
})
export class AuthenticationService {
	constructor(private http: HttpClient) {}

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
					return data.status === 200;
				}),
				catchError((error) => {
					return of(`ERROR (${error.status}): ${error.statusText}`);
				})
			);
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
					return data.status === 200;
				}),
				catchError((error) => {
					return of(`ERROR (${error.status}): ${error.statusText}`);
				})
			);
	}
}
