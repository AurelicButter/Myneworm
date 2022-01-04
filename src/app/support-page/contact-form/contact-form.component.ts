import { Component, EventEmitter, Output, ViewChild } from "@angular/core";
import { userContactForm } from "src/app/models/userContactForm";

@Component({
	selector: "contact-form",
	templateUrl: "./contact-form.component.html",
	styleUrls: ["../support-forms.shared.css"]
})
export class ContactFormComponent {
	@Output() isReturned = new EventEmitter<void>();
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	@ViewChild("userContact") dataForm: any;
	contactForm = new userContactForm();

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
