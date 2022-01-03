import { Component, EventEmitter, Output } from "@angular/core";

@Component({
	selector: "contact-form",
	templateUrl: "./contact-form.component.html",
	styleUrls: ["../support-forms.shared.css"]
})
export class ContactFormComponent {
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
