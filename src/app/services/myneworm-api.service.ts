import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { ImprintData } from "../models/imprintData";
import { MonthReleaseData } from "../models/monthReleaseData";
import { BookData } from "../models/bookData";
import { PublisherData } from "../models/publisherData";
import { BookType } from "../models/BookType";
import { ListEntry } from "../models/ListEntry";
import { AccountData, UserData } from "../models/userData";
import { UserStatisticsProfile } from "../models/userStatisticsData";
import { RegistrationData } from "../models/RegistrationData";
import { ProfileUpdateData } from "../models/profileUpdateData";
import { AccountUpdateData } from "../models/accountUpdateData";
import { AssetSize } from "../models/AssetSize";
import { BookFormat } from "../models/BookFormat";
import { Params, Router } from "@angular/router";
import { WishlistEntry } from "../models/WishlistEntry";
import { ToastService } from "./toast.service";
import { catchError, of } from "rxjs";

@Injectable({
	providedIn: "root"
})
export class MynewormAPIService {
	constructor(
		private http: HttpClient,
		private toastService: ToastService,
		private router: Router
	) {}

	private catchCommonErrors(error: any) {
		if (error.status === 404) {
			this.router.navigate(["/404"]);
		} else {
			console.error(error);
		}
		return of(null);
	}

	getByISBN(isbn: string) {
		return this.http.get<BookData>(`${environment.API_ADDRESS}/book/byISBN/${isbn}`);
	}

	getByPublisher(publisherId: string, page?: string) {
		return this.http.get(`${environment.API_ADDRESS}/book/byPublisher/${publisherId}/${page || ""}`);
	}

	getById(mynewormId: string) {
		return this.http.get<BookData>(`${environment.API_ADDRESS}/book/byId/${mynewormId}`);
	}

	getMonthData(month: string) {
		return this.http.get<MonthReleaseData[]>(`${environment.API_ADDRESS}/book/date/${month}`);
	}

	getByType(type: string, page?: string) {
		return this.http.get(`${environment.API_ADDRESS}/book/byType/${type}/${page || ""}`);
	}

	getImprints() {
		return this.http.get<ImprintData[]>(`${environment.API_ADDRESS}/publisher/`);
	}

	getImprintInfo(mynewormId: string) {
		return this.http.get<ImprintData>(`${environment.API_ADDRESS}/publisher/${mynewormId}`);
	}

	getAsset(localPath: string) {
		return `${environment.API_ADDRESS}/asset/${localPath}`;
	}

	getCover(isbn: string, size: string) {
		if (!Object.keys(AssetSize).includes(size)) {
			return null;
		}

		return `${environment.API_ADDRESS}/asset/cover/${isbn}?size=${size}`;
	}

	getPublisher(publisherID: string) {
		return this.http.get<PublisherData>(`${environment.API_ADDRESS}/publisher/${publisherID}`);
	}

	searchBookByTerm(term: string) {
		return this.http.get<BookData[]>(`${environment.API_ADDRESS}/book/search?term=${term}&limit=10`);
	}

	searchBooksWithLimit(term: string, limit: number, page?: number) {
		if (page === undefined || page < 1) {
			page = 1;
		}
		if (limit === undefined || limit < 1) {
			limit = 10;
		}

		return this.http.get<BookData[]>(`${environment.API_ADDRESS}/book/search/${page}?term=${term}&limit=${limit}`);
	}

	searchBooksWithFilter(queryParams: Params) {
		return this.http.get<BookData[]>(
			`${environment.API_ADDRESS}/book/search/${queryParams["page"]}?${new HttpParams({
				fromObject: queryParams
			}).toString()}`
		);
	}

	searchBooks(publisherID?: string, startDate?: string, endDate?: string) {
		let params = "";
		let multipleParams = false;

		if (publisherID) {
			params += `publisher=${publisherID}`;
			multipleParams = true;
		}

		if (startDate) {
			if (multipleParams) {
				params += "&";
			}
			params += `start=${startDate}`;
			multipleParams = true;
		}

		if (endDate) {
			if (multipleParams) {
				params += "&";
			}
			params += `end=${endDate}`;
			multipleParams = true;
		}

		return this.http.get<BookData[]>(`${environment.API_ADDRESS}/book/search?${params}`);
	}

	getBookTypes() {
		return this.http.get<BookType[]>(`${environment.API_ADDRESS}/booktype`);
	}

	getBookFormats() {
		return this.http.get<BookFormat[]>(`${environment.API_ADDRESS}/bookformat`);
	}

	getAuthUser(userID: string) {
		return this.http.get<UserData>(`${environment.API_ADDRESS}/user/byID/${userID}`).pipe(
			catchError((err: any) => {
				return this.catchCommonErrors(err);
			})
		);
	}

	getAccount() {
		return this.http.get<AccountData>(`${environment.API_ADDRESS}/user/account`).pipe(
			catchError((err: any) => {
				return this.catchCommonErrors(err);
			})
		);
	}

	getUser(username: string) {
		return this.http.get<UserData>(`${environment.API_ADDRESS}/user/${username}`).pipe(
			catchError((err: any) => {
				return this.catchCommonErrors(err);
			})
		);
	}

	getUserStats(username: string) {
		return this.http.get<UserStatisticsProfile>(`${environment.API_ADDRESS}/user/stats/${username}`).pipe(
			catchError((err: any) => {
				return this.catchCommonErrors(err);
			})
		);
	}

	getUserList(userID: string) {
		return this.http.get<ListEntry[]>(`${environment.API_ADDRESS}/lists/${userID}`).pipe(
			catchError((err: any) => {
				return this.catchCommonErrors(err);
			})
		);
	}

	getUserListByOwnership(userID: string, ownership: string) {
		return this.http.get<ListEntry[]>(`${environment.API_ADDRESS}/lists/byOwnership/${userID}/${ownership}`);
	}

	getUserWishlist(userID: string) {
		return this.http.get<WishlistEntry[]>(`${environment.API_ADDRESS}/lists/wishlist/${userID}`).pipe(
			catchError((err: any) => {
				return this.catchCommonErrors(err);
			})
		);
	}

	updateAvatar(avatar: FormData) {
		return this.http.post(`${environment.API_ADDRESS}/asset/user`, avatar).pipe(
			catchError((err: any) => {
				if (err.status === 400) {
					this.toastService.sendError("Failed to save avatar");
				} else {
					this.toastService.sendError("Uncaught error. Unable to save avatar.");
				}

				return of(null);
			})
		);
	}

	updateProfile(profileInfo: ProfileUpdateData) {
		return this.http.patch<UserData>(`${environment.API_ADDRESS}/user/profile`, { user: profileInfo }).pipe(
			catchError((err: any) => {
				this.toastService.sendError("Uncaught error. Unable to save profile.");
				return of(null);
			})
		);
	}

	updateAccount(accountInfo: AccountUpdateData) {
		if (accountInfo.password) {
			accountInfo.password = Buffer.from(accountInfo.password).toString("base64");
		}

		return this.http.patch(`${environment.API_ADDRESS}/user`, { user: accountInfo }).pipe(
			catchError((err: any) => {
				if (err.status === 403) {
					this.toastService.sendError(err.error.errors);
				} else {
					this.toastService.sendError("Uncaught error. Unable to update account.");
				}
				return of(null);
			})
		);
	}

	registerUser(user: RegistrationData) {
		return this.http.post(
			`${environment.API_ADDRESS}/user/`,
			{ user: user },
			{
				withCredentials: true,
				observe: "body",
				responseType: "json"
			}
		);
	}

	deleteUser() {
		return this.http
			.delete(`${environment.API_ADDRESS}/user`, {
				withCredentials: true,
				observe: "body",
				responseType: "json"
			})
			.pipe(
				catchError((err: any) => {
					this.toastService.sendError(
						"Failed to mark account for deletion. Reauthenticate or try again later."
					);
					return of(null);
				})
			);
	}

	getListEntry(isbn: string, userID: string) {
		return this.http.get<ListEntry>(`${environment.API_ADDRESS}/lists/${isbn}/${userID}`).pipe(
			catchError((err) => {
				if (err.status !== 404) {
					this.toastService.sendError("Unknown error response");
				}

				return of(null);
			})
		);
	}

	addListEntry(isbn: string, data: ListEntry) {
		return this.http
			.post(
				`${environment.API_ADDRESS}/lists/${isbn}`,
				{ list: data },
				{
					withCredentials: true,
					observe: "body",
					responseType: "json"
				}
			)
			.pipe(
				catchError(() => {
					this.toastService.sendError("Unknown error response. Unable to save entry.");
					return of(null);
				})
			);
	}

	updateListEntry(isbn: string, data: ListEntry) {
		return this.http
			.patch(
				`${environment.API_ADDRESS}/lists/${isbn}`,
				{ list: data },
				{
					withCredentials: true,
					observe: "body",
					responseType: "json"
				}
			)
			.pipe(
				catchError(() => {
					this.toastService.sendError("Unknown error response. Unable to update entry.");
					return of(null);
				})
			);
	}

	removeListEntry(isbn: string) {
		return this.http
			.delete(`${environment.API_ADDRESS}/lists/${isbn}`, {
				withCredentials: true,
				observe: "body",
				responseType: "json"
			})
			.pipe(
				catchError((err: any) => {
					if (err.status === 404) {
						this.toastService.sendError("Entry does not exist");
					} else {
						this.toastService.sendError("Unknown error response");
					}

					return of(null);
				})
			);
	}
}
