import { Component } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { UtilitiesService } from "src/app/services/utilities.service";
import { MynewormAPIService } from "src/app/services/myneworm-api.service";
import { ActivatedRoute, Router } from "@angular/router";
import { BookCorrectionDisplayEntry } from "src/app/models/BookCorrection";
import { MynewormAdminService } from "src/app/services/myneworm-admin.service";

@Component({
	selector: "book-correction-landing",
	templateUrl: "./book-correction-landing.component.html",
	styleUrls: ["./book-correction-landing.component.css"]
})
export class BookCorrectionLandingComponent {
	displayedColumns = ["isbn", "title", "create_date", "update_date", "approved"];
	public dataSource: MatTableDataSource<BookCorrectionDisplayEntry>;

	constructor(
		public utilities: UtilitiesService,
		private service: MynewormAPIService,
		private adminService: MynewormAdminService,
		private router: Router,
		private route: ActivatedRoute
	) {
		this.adminService.getAllBookCorrections().subscribe((data) => {
			data.forEach((correction) => {
				this.service.getByISBN(correction.isbn.toString()).subscribe((data) => {
					if (data === null) {
						correction.title = "Unknown Entry";
					} else {
						correction.title = `${data.title} (${this.utilities.formatReadable(data.format_name)}, ${this.utilities.formatReadable(
							data.book_type_name
						)})`;
					}
				});
			});

			this.dataSource = new MatTableDataSource<BookCorrectionDisplayEntry>(data);
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
