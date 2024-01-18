import { Component } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { UtilitiesService } from "src/app/services/utilities.service";
import { MynewormAPIService } from "src/app/services/myneworm-api.service";
import { ActivatedRoute, Router } from "@angular/router";
import { BookCorrectionDisplayEntry } from "src/app/models/BookCorrection";

@Component({
	selector: "book-correction-landing",
	templateUrl: "./book-correction-landing.component.html",
	styleUrls: ["./book-correction-landing.component.css"]
})
export class BookCorrectionLandingComponent {
	displayedColumns = ["isbn", "title", "create_date", "update_date", "approved"];
	public dataSource: MatTableDataSource<BookCorrectionDisplayEntry> =
		new MatTableDataSource<BookCorrectionDisplayEntry>();
	bookInfoTitle: Map<number, string> = new Map<number, string>();

	constructor(
		public utilities: UtilitiesService,
		private service: MynewormAPIService,
		private router: Router,
		private route: ActivatedRoute
	) {
		this.dataSource = new MatTableDataSource<BookCorrectionDisplayEntry>();
	}

	getBookInfo(isbn: number) {
		this.service.getByISBN(isbn.toString()).subscribe((data) => {
			if (data === null) {
				this.bookInfoTitle.set(isbn, "Unknown Entry");
			} else {
				this.bookInfoTitle.set(
					isbn,
					`${data.title} (${this.utilities.formatReadable(data.format_name)}, ${this.utilities.formatReadable(
						data.book_type_name
					)})`
				);
			}
		});
	}

	dateFormat(date: string) {
		return this.utilities.APIDateFormatter(new Date(date));
	}

	determineStatus(element: BookCorrectionDisplayEntry) {
		if (element.approved) {
			return "Approved";
		}
		if (element.approver_id && !element.approved) {
			return "Denied";
		}
		return "In Progress";
	}

	determineStatusCSS(element: BookCorrectionDisplayEntry) {
		if (element.approved) {
			return "approved";
		}
		if (element.approver_id && !element.approved) {
			return "denied";
		}
		return "in-progress";
	}

	goToCorrection(correctionID: string, isbn: string) {
		this.router.navigate([isbn, correctionID], { relativeTo: this.route });
	}
}
