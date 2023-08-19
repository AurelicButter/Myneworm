import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { catchError, of } from "rxjs";
import { MynewormAPIService } from "src/app/services/myneworm-api.service";
import { ToastService } from "src/app/services/toast.service";

@Component({
	selector: "delete-confirmation",
	templateUrl: "./delete-confirmation.component.html",
	styleUrls: ["./delete-confirmation.component.css"]
})
export class DeleteConfirmationComponent {
	constructor(
		private service: MynewormAPIService,
		private toastService: ToastService,
		private dialogRef: MatDialogRef<DeleteConfirmationComponent>
	) {}

	deleteAccount() {
		this.service
			.deleteUser()
			.pipe(
				catchError((err) => {
					console.error(err);
					this.toastService.sendError("Failed to mark account for deletion. Server issue, try again later.");
					return of(null);
				})
			)
			.subscribe((data: object | null) => {
				if (data === null) {
					this.close();
					return;
				}

				this.close(true);
			});
	}

	close(deleted = false) {
		if (deleted) {
			this.toastService.sendSuccess("Successfully marked your account for deletion.");
			this.dialogRef.close(true);
			return;
		}

		this.dialogRef.close(false);
	}
}
