import { Component, EventEmitter, Input, Output } from "@angular/core";
import { WishlistEntry } from "src/app/models/WishlistEntry";
import { MynewormAPIService } from "src/app/services/myneworm-api.service";
import { UtilitiesService } from "src/app/services/utilities.service";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { ListEntryModalComponent } from "src/app/shared/list-entry-modal/list-entry-modal.component";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ListEntryClass } from "src/app/models/ListEntry";
import { OwnershipStatus } from "src/app/models/ListEntryStatus";

@Component({
	selector: "wishlist-display",
	templateUrl: "./wishlist-display.component.html",
	styleUrls: ["../wishlist.component.css"]
})
export class WishlistDisplayComponent {
	@Input() book: WishlistEntry;
	@Input() isUser: boolean;
	@Output() entryUpdated = new EventEmitter<boolean>();
	faPen = faPen;

	constructor(
		private service: MynewormAPIService,
		public utilities: UtilitiesService,
		private matDialog: MatDialog
	) {}

	getCover() {
		return this.service.getCover(this.book.isbn.toString(), "small");
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

		listDialog.afterClosed().subscribe((result: ListEntryClass) => {
			if (result === undefined) {
				return;
			}

			return this.entryUpdated.emit(result === null || result.owner_status !== OwnershipStatus.Wanted);
		});
	}
}
