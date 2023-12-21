import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
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
		this.service.deleteUser().subscribe((data: object | null) => {
			if (data === null) {
				return this.close();
			}

			this.close(true);
		});
	}

	close(deleted = false) {
		if (!deleted) {
			return this.dialogRef.close(false);
		}

		this.toastService.sendSuccess("Successfully marked your account for deletion.");
		this.dialogRef.close(true);
	}
}
