import { Component, EventEmitter, Output } from "@angular/core";

@Component({
	selector: "data-correction",
	templateUrl: "./data-correction.component.html",
	styleUrls: ["../support-forms.shared.css"]
})
export class DataCorrectionComponent {
	@Output() isReturned = new EventEmitter<void>();

	returnMenu() {
		this.isReturned.emit();
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	submit(form: any) {
		console.log(form.value);
		return;
	}
}
