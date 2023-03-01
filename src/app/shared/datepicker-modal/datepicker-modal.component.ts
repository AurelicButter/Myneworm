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
	selectedDateObj: Date;

	constructor(public dialogRef: MatDialogRef<DatepickerModalComponent>) {}

	submit() {
		this.confirmed = true;
		this.close();
	}

	close(): void {
		if (!this.confirmed) {
			return this.dialogRef.close();
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

	updateDate(dateInput: Date) {
		this.selectedDate = moment.utc(dateInput).format("YYYY-MM-DD");
		const offset = dateInput.getTimezoneOffset();

		if (offset > 0) {
			const tempDate = new Date(this.selectedDate).setDate(dateInput.getDate());
			this.selectedDateObj = new Date(tempDate);
		} else {
			this.selectedDateObj = new Date(this.selectedDate);
		}

		this.validateDate();
	}
}
