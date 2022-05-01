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

	constructor(public dialogRef: MatDialogRef<DatepickerModalComponent>) {}

	submit() {
		this.confirmed = true;
		this.close();
	}

	close(): void {
		if (this.confirmed) {
			this.dialogRef.close(this.selectedDate);
			return;
		}
		this.dialogRef.close();
	}

	updateDate(dateInput: Date) {
		this.selectedDate = moment(dateInput).format("YYYY-MM-DD");
	}
}
