import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { ImprintData } from "../models/imprintData";
import { MonthReleaseData } from "../models/monthReleaseData";
import { BookData } from "../models/bookData";
import { PublisherData } from "../models/publisherData";

@Injectable({
	providedIn: "root"
})
export class MynewormAPIService {
	constructor(private http: HttpClient) {}

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

	getPublisher(publisherID: string) {
		return this.http.get<PublisherData>(`${environment.API_ADDRESS}/publisher/${publisherID}`);
	}

	searchBookByTerm(term: string) {
		return this.http.get<BookData[]>(`${environment.API_ADDRESS}/book/search?term=${term}`);
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
}
