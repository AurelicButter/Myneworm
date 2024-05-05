import { Component, ElementRef, OnInit, SecurityContext, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BookType } from "../../models/BookType";
import { BookCorrectionForm } from "../../models/BookCorrectionForm";
import { MetadataService } from "../../services/metadata.service";
import { MynewormAPIService } from "../../services/myneworm-api.service";
import { CommonModule, Location } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";
import { provideAnimations } from "@angular/platform-browser/animations";
import { AUTO_STYLE, animate, state, style, transition, trigger } from "@angular/animations";
import { ToastService } from "src/app/services/toast.service";
import { BookFormat } from "src/app/models/BookFormat";
import { ImprintData } from "src/app/models/imprintData";
import { UtilitiesService } from "src/app/services/utilities.service";
import { BookData } from "src/app/models/bookData";

@Component({
	selector: "book-correction-form",
	templateUrl: "./book-correction-form.component.html",
	styleUrls: ["./book-correction-form.component.css"],
	standalone: true,
	imports: [CommonModule, FormsModule],
	providers: [provideAnimations()],
	animations: [
		trigger("descPreview", [
			state(
				"descPreviewShow",
				style({
					height: AUTO_STYLE,
					visibility: AUTO_STYLE
				})
			),
			state(
				"descPreviewHide",
				style({
					height: "0",
					visibility: "hidden"
				})
			),
			transition("descPreviewShow => descPreviewHide", [animate("1s ease-in")]),
			transition("descPreviewHide => descPreviewShow", [animate("1s ease-out")])
		])
	]
})
export class BookCorrectionFormComponent implements OnInit {
	@ViewChild("descPreviewDisplay") descPreviewEl: ElementRef;
	correction = new BookCorrectionForm();
	booktypes: BookType[];
	formats: BookFormat[];
	imprints: ImprintData[];
	canUpdateISBN = true;
	showDescriptionPreview = false;
	descriptionPreview = "";
	coverPreview = "";
	private existingData: BookData;

	constructor(
		private route: ActivatedRoute,
		private service: MynewormAPIService,
		private metaService: MetadataService,
		private location: Location,
		private sanitizer: DomSanitizer,
		private toastService: ToastService,
		public utilities: UtilitiesService,
		public router: Router
	) {
		this.metaService.updateMetaTags("Book Correction", "/book/correction");

		this.route.queryParams.subscribe((data) => {
			this.correction.isbn = data.isbn;

			if (this.correction.isbn !== undefined) {
				this.canUpdateISBN = false;
				this.service.getByISBN(this.correction.isbn).subscribe((bookData) => {
					this.correction.book_type = bookData.book_type_name;
					this.correction.description = bookData.description;
					this.correction.release_date = bookData.release_date.split("T")[0];
					this.correction.title = bookData.title;
					this.correction.format_name = bookData.format_name;
					this.correction.publisher_id = bookData.publisher_id;
					this.descriptionPreview = bookData.description;
					this.existingData = bookData;
				});
			}

			this.service.getBookTypes().subscribe((types) => this.booktypes = types);
			this.service.getBookFormats().subscribe((data) => this.formats = data);
			this.service.getImprints().subscribe((data) => this.imprints = data);
		});
	}

	ngOnInit(): void {
		this.updateImage();
	}

	submit() {
		this.correction.description = this.descriptionPreview;

		let forSubmission = new BookCorrectionForm();

		if (!this.existingData) {
			forSubmission = this.correction;
		} else {
			forSubmission.isbn = this.correction.isbn;

			if (this.correction.title !== this.existingData.title) {
				forSubmission.title = this.correction.title;
			}
			if (this.correction.description !== this.existingData.description) {
				forSubmission.description = this.correction.description;
			}
			if (this.correction.cover_url) {
				forSubmission.cover_url = this.correction.cover_url;
			}
			if (this.correction.release_date !== this.existingData.release_date.split("T")[0]) {
				forSubmission.release_date = this.correction.release_date;
			}
			if (this.correction.publisher_id !== this.existingData.publisher_id) {
				forSubmission.publisher_id = this.correction.publisher_id;
			}
			if (this.correction.book_type !== this.existingData.book_type_name) {
				forSubmission.book_type = this.correction.book_type;
			}
			if (this.correction.format_name !== this.existingData.format_name) {
				forSubmission.format_name = this.correction.format_name;
			}
			if (this.correction.comment) {
				forSubmission.comment = this.correction.comment;
			}
		}

		if (Object.keys(forSubmission).length === 0) {
			this.toastService.sendError("Failed to submit! No changes detected in submission");
			return;
		}

		this.service.submitBookCorrection(forSubmission).subscribe((data) => {
			if (data === null) {
				return;
			}
			this.toastService.sendSuccess("Submitted book correction!");

			if (this.existingData) {
				this.router.navigate([`/book/${this.correction.isbn}`]);
			} else {
				this.router.navigate(["/home"]);
			}
		});
	}

	backToPage() {
		this.location.back();
	}

	toggleDescPreview() {
		this.showDescriptionPreview = !this.showDescriptionPreview;
	}

	getImage() {
		this.coverPreview = this.service.getCover(this.correction.isbn || "1", "large") as string;
	}

	imageFallback() {
		if (this.correction.cover_image === undefined) {
			return;
		}

		this.toastService.sendError("Unable to load image for preview. Image URL has been reverted.");
		this.correction.cover_image = undefined;
		this.getImage();
	}

	async updateImage() {
		const oldCover = this.correction.cover_image;
		await new Promise((resolve) => setTimeout(resolve, 500));
		if (oldCover !== this.correction.cover_image) {
			return;
		}

		if (this.correction.cover_image) {
			this.coverPreview = this.correction.cover_image;
			return;
		}

		this.getImage();
	}

	async sanitizeInput() {
		const oldDescription = this.correction.description;
		await new Promise((resolve) => setTimeout(resolve, 500));
		if (oldDescription !== this.correction.description) {
			return;
		}

		if (this.correction.description) {
			const sanitizedValue = this.sanitizer.sanitize(SecurityContext.HTML, this.correction.description);
			this.descriptionPreview = sanitizedValue ? sanitizedValue.toString() : "";
		}
	}
}
