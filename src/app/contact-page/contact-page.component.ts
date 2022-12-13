import { Component, ViewChild } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { userContactForm } from "src/app/models/userContactForm";

@Component({
	selector: "app-contact-page",
	templateUrl: "./contact-page.component.html",
	styleUrls: ["./contact-page.component.css"]
})
export class ContactPageComponent {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	@ViewChild("userContact") dataForm: any;
	contactForm = new userContactForm();

	constructor(private titleService: Title) {
		this.titleService.setTitle("Myneworm - Contact");
	}

	resetForm() {
		this.dataForm.reset();
	}

	submit() {
		// Implement form submission
		this.resetForm();
	}
}
