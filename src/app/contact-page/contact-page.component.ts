import { Component, ViewChild } from "@angular/core";
import { userContactForm } from "src/app/models/userContactForm";
import { MetadataService } from "../services/metadata.service";

@Component({
	selector: "app-contact-page",
	templateUrl: "./contact-page.component.html",
	styleUrls: ["./contact-page.component.css"]
})
export class ContactPageComponent {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	@ViewChild("userContact") dataForm: any;
	contactForm = new userContactForm();

	constructor(private metaService: MetadataService) {
		this.metaService.updateMetaTags("Contact", "/contact");
	}

	resetForm() {
		this.dataForm.reset();
	}

	submit() {
		// Implement form submission
		this.resetForm();
	}
}
