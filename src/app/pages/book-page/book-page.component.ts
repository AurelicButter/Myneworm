import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { catchError, of } from "rxjs";
import { BookData } from "../../models/bookData";
import { PublisherData } from "../../models/publisherData";
import { MetadataService } from "../../services/metadata.service";
import { MynewormAPIService } from "../../services/myneworm-api.service";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ListEntryModalComponent } from "../../shared/list-entry-modal/list-entry-modal.component";
import { LocalCookiesService } from "../../services/authentication/local-cookies.service";
import { ListEntry } from "../../models/ListEntry";
import { ToastService } from "../../services/toast.service";
import { CommonModule } from "@angular/common";
import { DateReadablePipe } from "src/app/pipes/DateReadable.pipe";
import { BookFormatPipe } from "src/app/pipes/BookFormat.pipe";
import { SharedModule } from "src/app/shared/shared.module";
import * as moment from "moment";

@Component({
	selector: "book-page",
	templateUrl: "./book-page.component.html",
	styleUrls: ["./book-page.component.css"],
	standalone: true,
	imports: [CommonModule, RouterModule, SharedModule, BookFormatPipe, DateReadablePipe]
})
export class BookPageComponent implements OnInit {
	book: BookData;
	publisher: PublisherData;
	isLoggedIn = false;
	private userID: string;
	hasExistingEntry = false;
	remainingMsg: string;

	constructor(
		private route: ActivatedRoute,
		private service: MynewormAPIService,
		private metaService: MetadataService,
		private matDialog: MatDialog,
		private cookieService: LocalCookiesService,
		private toastService: ToastService,
		private router: Router
	) {
		this.cookieService.userEvent.subscribe((value) => {
			this.isLoggedIn = Object.keys(value).length > 0;

			if (this.isLoggedIn) {
				this.userID = value.user_id;
			}
		});
	}

	ngOnInit(): void {
		this.route.params.subscribe((data) => {
			this.service.getByISBN(data.isbn).subscribe((data: BookData | null) => {
				if (data === null) {
					this.router.navigate(["/404"]);
					return;
				}

				this.book = data;
				this.metaService.updateMetaTags(
					this.book.title,
					`/book/${this.book.isbn}`,
					this.book.description,
					this.service.getAsset(this.book.isbn)
				);

				this.service.getPublisher(data.publisher_id.toString()).subscribe((pubData: PublisherData) => {
					this.publisher = pubData;
				});

				this.calculateDaysLeft();
			});

			if (this.isLoggedIn) {
				this.service
					.getListEntry(data.isbn, this.userID)
					.pipe(
						catchError((err) => {
							if (err.status === 404) {
								return of(null);
							}
							this.toastService.sendError("ERROR: Failed check for list entry.");
							return of(null);
						})
					)
					.subscribe((data: ListEntry | null) => {
						if (data === null) {
							return;
						}

						this.hasExistingEntry = true;
					});
			}
		});
	}

	getCover() {
		return this.service.getCover(this.book.isbn, "large");
	}

	updateListEntry(): void {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.id = "list-entry-modal";

		dialogConfig.height = "60%";
		dialogConfig.width = "55%";
		dialogConfig.data = {
			isbn: this.book.isbn,
			cover: this.service.getCover(this.book.isbn, "medium"),
			title: this.book.title
		};
		const listDialog = this.matDialog.open(ListEntryModalComponent, dialogConfig);

		listDialog.afterClosed().subscribe((result) => {
			if (result === undefined) {
				return;
			}
			this.hasExistingEntry = result !== null;
		});
	}

	calculateDaysLeft() {
		const release = moment(this.book.release_date).startOf("day");
		const today = moment().startOf("day");

		if (today.isBefore(release)) {
			const diff = release.diff(today, "day");
			if (diff > 1) {
				this.remainingMsg = "Releasing " + release.fromNow() + "!";
			} else {
				this.remainingMsg = "Releasing tomorrow!";
			}
		} else if (today.isSame(release, "day")) {
			this.remainingMsg = "Releasing today!";
		} else {
			this.remainingMsg = "";
		}
	}
}
