import { Injectable } from "@angular/core";
import { AdminModule } from "../admin-pages/admin.module";
import { HttpClient } from "@angular/common/http";
import { ToastService } from "./toast.service";
import { catchError, of } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
	providedIn: AdminModule
})
export class MynewormAdminService {
	constructor(
		private http: HttpClient,
		private toastService: ToastService
	) {}

	getAllBookCorrections() {
		return this.http.get(`${environment.API_ADDRESS}/corrections/book`);
	}

	getBookCorrection(correctionID: string) {
		return this.http.get(`${environment.API_ADDRESS}/corrections/book/${correctionID}`);
	}

	approveBookCorrection(correctionID: string) {
		return this.http.patch(`${environment.API_ADDRESS}/corrections/book/approve/${correctionID}`, {}).pipe(
			catchError((err: any) => {
				this.toastService.sendError("Caught server error. API has logged the issue.");
				return of(null);
			})
		);
	}

	denyBookCorrection(correctionID: string) {
		return this.http.patch(`${environment.API_ADDRESS}/corrections/book/deny/${correctionID}`, {}).pipe(
			catchError((err: any) => {
				this.toastService.sendError("Caught server error. API has logged the issue.");
				return of(null);
			})
		);
	}
}
