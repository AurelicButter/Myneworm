import { Component, Inject } from "@angular/core";
import { MatCalendarCellCssClasses } from "@angular/material/datepicker";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { catchError, of } from "rxjs";
import { ListEntryClass } from "src/app/models/ListEntry";
import { MynewormAPIService } from "src/app/services/myneworm-api.service";
import { ToastService } from "src/app/services/toast.service";
import { UtilitiesService } from "src/app/services/utilities.service";

@Component({
	selector: "list-entry-modal",
	templateUrl: "./list-entry-modal.component.html",
	styleUrls: ["./list-entry-modal.component.css"]
})
export class ListEntryModalComponent {
	listEntryForm = new ListEntryClass();
	isUpdate = false;
	showDatePicker = [false, false];

	constructor(
		@Inject(MAT_DIALOG_DATA) public bookData: { isbn: string; cover: string; title: string },
		private service: MynewormAPIService,
		private toastService: ToastService,
		private utilities: UtilitiesService
	) {}

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

		if (!dateToCheck.match(/\d{4}-\d{2}-\d{2}/)) {
			this.toastService.sendError("Unable to parse date input. Format required: YYYY-MM-DD");
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

	dateClass() {
		return (date: Date): MatCalendarCellCssClasses => {
			if (date.getDate() === 1) {
				return "special-date";
			}
			return "";
		};
	}

	async validateScore() {
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
		const oldInput = this.listEntryForm.reread;
		await new Promise((resolve) => setTimeout(resolve, 500));
		if (oldInput !== this.listEntryForm.reread) {
			return;
		}

		if (this.listEntryForm.reread < 1) {
			this.listEntryForm.reread = 1;
		}
	}

	submit() {}

	deleteEntry() {
		this.service
			.removeListEntry("1")
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
			});
	}
}
