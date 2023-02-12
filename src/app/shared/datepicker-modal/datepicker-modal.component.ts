import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import * as moment from "moment";

@Component({
	selector: "datepicker-modal",
	templateUrl: "./datepicker-modal.component.html",
	styleUrls: ["./datepicker-modal.component.css"]
})
export class DatepickerModalComponent {
	selectedDate: string;
	confirmed = false;
	errMessage = "";

	constructor(public dialogRef: MatDialogRef<DatepickerModalComponent>) {}

	submit() {
		this.confirmed = true;
		this.close();
	}

	close(): void {
		if (!this.confirmed) {
			this.dialogRef.close();
		}

		this.validateDate();
		if (this.errMessage === "") {
			this.dialogRef.close(this.selectedDate);
		}
	}

	validateDate() {
		if (!this.selectedDate.match(/\d{4}-\d{2}-\d{2}/)) {
			this.errMessage = "Date out of range. Unable to parse input.";
			this.confirmed = false;
		} else {
			this.errMessage = "";
		}
	}

	async updateDate(dateInput: Date) {
		const oldDate = dateInput;

		await new Promise((resolve) => setTimeout(resolve, 500));

		if (oldDate === dateInput) {
			this.selectedDate = moment(dateInput).format("YYYY-MM-DD");
			this.validateDate();
		}
	}
}
