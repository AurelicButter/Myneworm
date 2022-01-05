import { Component, EventEmitter, Output, ViewChild } from "@angular/core";
import { dataCorrectionForm } from "src/app/models/dataCorrectionForm";

@Component({
	selector: "data-correction",
	templateUrl: "./data-correction.component.html",
	styleUrls: ["../support-forms.shared.css"]
})
export class DataCorrectionComponent {
	@Output() isReturned = new EventEmitter<void>();
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	@ViewChild("dataCorrection") dataForm: any;
	correction = new dataCorrectionForm();

	returnMenu() {
		this.isReturned.emit();
	}

	resetForm() {
		this.dataForm.reset();
	}

	submit() {
		// Implement form submission
		this.resetForm();
	}
}
