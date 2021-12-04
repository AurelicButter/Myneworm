import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
	providedIn: "root"
})
export class MynewormAPIService {
	constructor(private http: HttpClient) {}

	getByISBN(isbn: string) {
		return this.http.get(`${environment.API_ADDRESS}/book/byISBN/${isbn}`);
	}

	getByPublisher(publisherId: string, page?: string) {
		return this.http.get(`${environment.API_ADDRESS}/book/byPublisher/${publisherId}/${page || ""}`);
	}

	getById(mynewormId: string) {
		return this.http.get(`${environment.API_ADDRESS}/book/byId/${mynewormId}`);
	}

	getMonthData(month: string) {
		return this.http.get(`${environment.API_ADDRESS}/book/date/${month}`);
	}

	getByType(type: string, page?: string) {
		return this.http.get(`${environment.API_ADDRESS}/book/byType/${type}/${page || ""}`);
	}

	getPublisherInfo(mynewormId: string) {
		return this.http.get(`${environment.API_ADDRESS}/publisher/${mynewormId}`);
	}
}
