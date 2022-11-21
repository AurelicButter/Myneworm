import { Component, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BookType } from "../models/BookType";
import { dataCorrectionForm } from "../models/dataCorrectionForm";
import { MynewormAPIService } from "../services/myneworm-api.service";
import { UtilitiesService } from "../services/utilities.service";

@Component({
	selector: "app-data-correction-form",
	templateUrl: "./data-correction-form.component.html",
	styleUrls: ["./data-correction-form.component.css"]
})
export class DataCorrectionFormComponent {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	@ViewChild("dataCorrection") dataForm: any;
	correction = new dataCorrectionForm();
	storeURL = "";
	booktypes: BookType[];

	constructor(
		private route: ActivatedRoute,
		private service: MynewormAPIService,
		private utilities: UtilitiesService
	) {
		this.route.queryParams.subscribe((data) => {
			this.correction.isbn = data.isbn;

			if (this.correction.isbn !== undefined) {
				this.service.getByISBN(this.correction.isbn).subscribe((bookData) => {
					this.correction.bookType = bookData.book_type_name;
					this.correction.description = bookData.description;
					this.correction.release = bookData.release_date.split("T")[0];
					this.correction.title = bookData.title;
				});
			}

			this.service.getBookTypes().subscribe((types) => {
				this.booktypes = types;
			});
		});
	}

	resetForm() {
		this.dataForm.reset();
	}

	submit() {
		// Implement form submission
		this.resetForm();
	}

	addURL() {
		if (this.storeURL === "") {
			return;
		}

		const currURL = this.storeURL.replace("www.", "").split("?")[0];
		let siteName = currURL.slice(currURL.indexOf("://") + 3, currURL.indexOf("."));

		siteName = this.utilities.toTitleCase(siteName);

		this.correction.storeURLs.push({ url: currURL, name: siteName });
		this.storeURL = "";
	}
}
