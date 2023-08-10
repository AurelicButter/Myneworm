import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { catchError } from "rxjs";
import { BookData } from "../models/bookData";
import { PublisherData } from "../models/publisherData";
import { MetadataService } from "../services/metadata.service";
import { MynewormAPIService } from "../services/myneworm-api.service";
import { UtilitiesService } from "../services/utilities.service";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ListEntryModalComponent } from "../shared/list-entry-modal/list-entry-modal.component";
import { LocalCookiesService } from "../services/authentication/local-cookies.service";

@Component({
	selector: "app-book-page",
	templateUrl: "./book-page.component.html",
	styleUrls: ["./book-page.component.css"]
})
export class BookPageComponent implements OnInit {
	book: BookData;
	publisher: PublisherData;
	isLoggedIn = false;

	constructor(
		private route: ActivatedRoute,
		private service: MynewormAPIService,
		public utilities: UtilitiesService,
		private metaService: MetadataService,
		public matDialog: MatDialog,
		private cookieService: LocalCookiesService
	) {
		this.cookieService.userEvent.subscribe((value) => {
			this.isLoggedIn = Object.keys(value).length === 0;
		});
	}

	ngOnInit(): void {
		this.route.params.subscribe((data) => {
			this.service
				.getByISBN(data.isbn)
				.pipe(catchError((err) => this.utilities.catchAPIError(err)))
				.subscribe((data: BookData | null) => {
					if (data === null) {
						return;
					}

					this.book = data;
					this.metaService.updateMetaTags(
						this.book.title,
						`/book/${this.book.isbn}`,
						this.book.description,
						this.service.getAsset(`${this.book.isbn}`)
					);

					this.service.getPublisher(data.publisher_id.toString()).subscribe((pubData: PublisherData) => {
						this.publisher = pubData;
					});
				});
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
		this.matDialog.open(ListEntryModalComponent, dialogConfig);
	}
}
