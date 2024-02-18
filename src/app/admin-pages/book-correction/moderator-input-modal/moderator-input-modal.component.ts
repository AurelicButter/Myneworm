import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { LocalCookiesService } from "src/app/services/authentication/local-cookies.service";
import { MynewormAPIService } from "src/app/services/myneworm-api.service";
import { ToastService } from "src/app/services/toast.service";

@Component({
	selector: "moderator-input-modal",
	templateUrl: "./moderator-input-modal.component.html",
	styleUrls: ["./moderator-input-modal.component.css"]
})
export class ModeratorInputModalComponent {
	constructor(
		@Inject(MAT_DIALOG_DATA) public modData: { action: string },
		private service: MynewormAPIService,
		private toastService: ToastService,
		private cookieService: LocalCookiesService,
		private dialogRef: MatDialogRef<ModeratorInputModalComponent>
	) {}
}
