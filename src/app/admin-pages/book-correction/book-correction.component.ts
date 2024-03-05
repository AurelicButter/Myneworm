import { Component, SecurityContext } from "@angular/core";
import { Location } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { MynewormAPIService } from "src/app/services/myneworm-api.service";
import { BookData } from "src/app/models/bookData";
import { BookCorrectionEntry } from "src/app/models/BookCorrection";
import { MynewormAdminService } from "src/app/services/myneworm-admin.service";
import { BookFormat } from "src/app/models/BookFormat";
import { BookType } from "src/app/models/BookType";
import { ImprintData } from "src/app/models/imprintData";
import { UtilitiesService } from "src/app/services/utilities.service";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ModeratorInputModalComponent } from "./moderator-input-modal/moderator-input-modal.component";
import { FormControl } from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";
import * as moment from "moment";

@Component({
	selector: "book-correction",
	templateUrl: "./book-correction.component.html",
	styleUrls: ["./book-correction.component.css"]
})
export class BookCorrectionComponent {
	bookData: BookData;
	correctionData: BookCorrectionEntry;
	isReady = 0;
	submitterUsername: string;
	modUsername = "";
	types: BookType[];
	formats: BookFormat[];
	publishers: ImprintData[];
	correctionDescription = new FormControl("");

	constructor(
		private service: MynewormAPIService,
		private location: Location,
		private route: ActivatedRoute,
		private router: Router,
		private adminService: MynewormAdminService,
		public utilities: UtilitiesService,
		private matDialog: MatDialog,
		private sanitizer: DomSanitizer
	) {
		this.correctionDescription.valueChanges.subscribe((value) => {
			this.sanitizeInput(value);
		});
		this.correctionDescription.disable();
	}

	ngOnInit() {
		this.route.params.subscribe((data) => {
			this.adminService.getBookCorrection(data.correctionID).subscribe((correction) => {
				if (!correction) {
					return;
				}

				this.correctionData = correction;

				if (this.correctionData.description !== undefined) {
					this.correctionDescription.setValue(this.correctionData.description);
				}

				this.service.getUserByID(correction.submitter_id.toString()).subscribe((user) => {
					if (user === null) {
						this.submitterUsername = `Removed User (ID:${correction.submitter_id})`;
					} else {
						this.submitterUsername = user?.username;
					}
					this.isReady++;
				});
				if (correction.approver_id) {
					this.service.getUserByID(correction.approver_id.toString()).subscribe((user) => {
						if (user === null) {
							this.modUsername = `Removed User (ID:${correction.approver_id})`;
						} else {
							this.modUsername = user?.username;
						}
					});
				}
			});
			this.service.getByISBN(data.isbn).subscribe((bookInfo) => {
				if (!bookInfo) {
					return;
				}

				this.bookData = bookInfo;
				this.bookData.release_date = moment(this.bookData.release_date.split("T")[0]).format("MM/DD/YYYY");

				this.isReady++;
			});
		});
		this.service.getBookTypes().subscribe((data) => this.types = data);
		this.service.getBookFormats().subscribe((data) => this.formats = data);
		this.service.getImprints().subscribe((data) => this.publishers = data);
	}

	returnPrevPage() {
		this.location.back();
	}

	getImage() {
		return this.service.getCover(this.bookData.isbn, "small");
	}

	determineStatus() {
		if (this.correctionData.approved) {
			return "Approved";
		}
		if (this.correctionData.approver_id && !this.correctionData.approved) {
			return "Denied";
		}
		return "In Progress";
	}

	determineStatusCSS() {
		if (this.correctionData.approved) {
			return "approved";
		}
		if (this.correctionData.approver_id && !this.correctionData.approved) {
			return "denied";
		}
		return "in-progress";
	}

	openModeratorModal(action: string): void {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.id = "moderator-input-modal";

		dialogConfig.height = "50%";
		dialogConfig.width = "50%";
		dialogConfig.data = {
			action: action,
			correctionID: this.correctionData.correction_id,
			isbn: this.correctionData.isbn
		};

		const modConfirmation = this.matDialog.open(ModeratorInputModalComponent, dialogConfig);

		modConfirmation.afterClosed().subscribe((check) => {
			if (check) {
				this.router.navigate(["/admin/corrections/book"]);
			}
		});
	}

	sanitizeInput(value: any) {
		if (this.correctionData) {
			const sanitizedValue = this.sanitizer.sanitize(SecurityContext.HTML, value);
			this.correctionData.description = sanitizedValue ? sanitizedValue.toString() : "";
		}
	}
}
