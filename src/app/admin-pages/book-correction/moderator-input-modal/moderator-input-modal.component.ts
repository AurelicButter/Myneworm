import { Component, Inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MynewormAdminService } from "src/app/services/myneworm-admin.service";
import { ToastService } from "src/app/services/toast.service";

@Component({
	selector: "moderator-input-modal",
	templateUrl: "./moderator-input-modal.component.html",
	styleUrls: ["./moderator-input-modal.component.css"],
	standalone: true,
	imports: [FormsModule]
})
export class ModeratorInputModalComponent {
	modNotes: string;
	inputStatus: string;

	constructor(
		@Inject(MAT_DIALOG_DATA) public modData: { action: string; correctionID: string; isbn: string },
		private adminService: MynewormAdminService,
		private toastService: ToastService,
		private dialogRef: MatDialogRef<ModeratorInputModalComponent>
	) {
		this.inputStatus = modData.action === "approve" ? "Approval" : "Rejection";
	}

	updateCorrection() {
		if (this.modData.action === "approve") {
			this.adminService.approveBookCorrection(this.modData.correctionID, this.modNotes).subscribe((data) => {
				if (data === null) {
					return;
				}

				this.toastService.sendSuccess("Approved the correction");
				this.close(true);
			});
		} else {
			this.adminService.denyBookCorrection(this.modData.correctionID, this.modNotes).subscribe((data) => {
				if (data === null) {
					return;
				}

				this.toastService.sendSuccess("Rejected the correction");
				this.close(true);
			});
		}
	}

	close(responseStatus = false) {
		if (!responseStatus) {
			return this.dialogRef.close(false);
		}
		this.dialogRef.close(true);
	}
}
