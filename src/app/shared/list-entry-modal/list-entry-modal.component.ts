import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { catchError, of } from "rxjs";
import { ListEntry, ListEntryClass } from "src/app/models/ListEntry";
import { MynewormAPIService } from "src/app/services/myneworm-api.service";
import { ToastService } from "src/app/services/toast.service";
import { UtilitiesService } from "src/app/services/utilities.service";
import { ActivityStatus, OwnershipStatus } from "src/app/models/ListEntryStatus";
import { LocalCookiesService } from "src/app/services/authentication/local-cookies.service";

@Component({
	selector: "list-entry-modal",
	templateUrl: "./list-entry-modal.component.html",
	styleUrls: ["./list-entry-modal.component.css"]
})
export class ListEntryModalComponent {
	listEntryForm = new ListEntryClass();
	isUpdate = false;
	showDatePicker = [false, false];
	activityStatus = ActivityStatus;
	ownershipStatus = OwnershipStatus;
	private user: any;

	constructor(
		@Inject(MAT_DIALOG_DATA) public bookData: { isbn: string; cover: string; title: string },
		private service: MynewormAPIService,
		private toastService: ToastService,
		private utilities: UtilitiesService,
		private cookieService: LocalCookiesService,
		private dialogRef: MatDialogRef<ListEntryModalComponent>
	) {
		this.cookieService.userEvent.subscribe((value) => {
			this.user = value;

			this.service
				.getListEntry(bookData.isbn, this.user.user_id)
				.pipe(
					catchError((err) => {
						if (err.status !== 404) {
							this.toastService.sendError("Unknown error response");
						}

						return of(null);
					})
				)
				.subscribe((data: ListEntry | null) => {
					if (data === null) {
						return;
					}

					this.isUpdate = true;
					this.listEntryForm.active_status = data.active_status;
					this.listEntryForm.owner_status = data.owner_status;
					this.listEntryForm.score = data.score;
					this.listEntryForm.reread = data.reread;
					this.listEntryForm.notes = data.notes;
					if (data.start_date) {
						this.listEntryForm.start_date = this.utilities.APIDateFormatter(new Date(data.start_date));
					}
					if (data.end_date) {
						this.listEntryForm.end_date = this.utilities.APIDateFormatter(new Date(data.end_date));
					}
				});
		});
	}

	showDates(target: number) {
		this.showDatePicker[target] = !this.showDatePicker[target];
	}

	async removeDateDisplay(target: number) {
		// Removing this promise breaks the event where the date is set from the calendar submenu.
		await new Promise((resolve) => setTimeout(resolve, 75));
		if (this.showDatePicker[target]) {
			this.showDates(target);
		}
	}

	validateDate(start: boolean) {
		const dateToCheck = start ? this.listEntryForm.start_date : this.listEntryForm.end_date;
		if (dateToCheck === undefined || dateToCheck === "") {
			return;
		}

		if (isNaN(new Date(dateToCheck).getTime())) {
			this.toastService.sendError("Unable to parse date input. One or more date values exceed date range.");
			return;
		}
	}

	updateDate(event: Date | null, target: number) {
		if (event === null) {
			return;
		}

		if (target === 0) {
			this.listEntryForm.start_date = this.utilities.APIDateFormatter(event);
		} else {
			this.listEntryForm.end_date = this.utilities.APIDateFormatter(event);
		}

		this.showDates(target);
	}

	async validateScore() {
		if (this.listEntryForm.score === null) {
			return;
		}

		const oldInput = this.listEntryForm.score;
		await new Promise((resolve) => setTimeout(resolve, 500));
		if (oldInput !== this.listEntryForm.score) {
			return;
		}

		if (this.listEntryForm.score > 10) {
			this.listEntryForm.score = 10;
		} else if (this.listEntryForm.score < 1) {
			this.listEntryForm.score = 1;
		}
	}

	async validateReread() {
		if (this.listEntryForm.reread === null) {
			return;
		}

		const oldInput = this.listEntryForm.reread;
		await new Promise((resolve) => setTimeout(resolve, 500));
		if (oldInput !== this.listEntryForm.reread) {
			return;
		}

		if (this.listEntryForm.reread < 1) {
			this.listEntryForm.reread = 1;
		}
	}

	submit() {
		if (!Object.values(this.activityStatus).includes(this.listEntryForm.active_status)) {
			this.toastService.sendError("Activity status is required to add a list entry.");
			return;
		}

		if (this.isUpdate) {
			this.service
				.updateListEntry(this.bookData.isbn, this.listEntryForm)
				.pipe(
					catchError((err) => {
						this.toastService.sendError("Unknown error response. Unable to update entry.");
						return of(null);
					})
				)
				.subscribe((data) => {
					if (data === null) {
						return;
					}

					this.toastService.sendSuccess("Updated entry!");
					this.dialogRef.close();
				});
			return;
		}

		this.service
			.addListEntry(this.bookData.isbn, this.listEntryForm)
			.pipe(
				catchError((err) => {
					this.toastService.sendError("Unknown error response. Unable to save entry.");
					return of(null);
				})
			)
			.subscribe((data) => {
				if (data === null) {
					return;
				}

				this.toastService.sendSuccess("Added entry!");
				this.dialogRef.close();
			});
	}

	deleteEntry() {
		this.service
			.removeListEntry(this.bookData.isbn)
			.pipe(
				catchError((err) => {
					if (err.status === 404) {
						this.toastService.sendError("Entry does not exist");
					} else {
						this.toastService.sendError("Unknown error response");
					}

					return of(null);
				})
			)
			.subscribe((data) => {
				if (data === null) {
					return;
				}

				this.toastService.sendSuccess("Entry removed from list");
				this.dialogRef.close();
			});
	}
}
