import { Component, Input, OnChanges, OnInit, ViewChild } from "@angular/core";
import { MatSort, Sort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ListEntry } from "src/app/models/ListEntry";
import { MynewormAPIService } from "src/app/services/myneworm-api.service";
import { formatOwnerStatus } from "src/app/functions/formatOwnerStatus";
import { formatDateString } from "src/app/functions/formatDateString";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ListEntryModalComponent } from "src/app/shared/list-entry-modal/list-entry-modal.component";

@Component({
	selector: "table-display",
	templateUrl: "./table-display.component.html",
	styleUrls: ["./table-display.component.css"]
})
export class TableDisplayComponent implements OnInit, OnChanges {
	displayedColumns = ["cover", "title", "score", "reread", "owner", "bookType", "more"];
	@Input() listEntries: MatTableDataSource<ListEntry>;
	@Input() tableName: string;
	@Input() ownershipFilter: string[];
	@Input() booktypeFilter: string[];
	@Input() triggerListUpdate: boolean;
	@Input() isAuthUser: boolean;
	@ViewChild(MatSort) sort: MatSort;
	formatOwnerStatus = formatOwnerStatus;
	formatDateString = formatDateString;

	constructor(
		private service: MynewormAPIService,
		private matDialog: MatDialog
	) {}

	ngOnInit() {
		this.listEntries.filterPredicate = this.filterData();
		this.listEntries.sortData = this.sortData();
	}

	ngAfterViewInit() {
		this.listEntries.sort = this.sort;
	}

	ngOnChanges() {
		if (this.listEntries === undefined) {
			// Prevent change load before entries initialized.
			return;
		}

		if (this.ownershipFilter.length === 0 && this.booktypeFilter.length === 0) {
			this.listEntries.filter = "";
			return;
		}

		this.listEntries.filter = "true";
	}

	getPreview(isbn: string) {
		return this.service.getCover(isbn, "small");
	}

	filterData() {
		return (data: ListEntry, filter: any) => {
			if (!filter) {
				return true;
			}

			let ownerCheck = true;
			let booktypeCheck = true;

			if (this.ownershipFilter.length > 0) {
				ownerCheck = this.ownershipFilter.includes(data.owner_status);
			}

			if (this.booktypeFilter.length > 0) {
				booktypeCheck = this.booktypeFilter.includes(data.book_type_name);
			}

			return ownerCheck === true && ownerCheck === booktypeCheck;
		};
	}

	sortData() {
		return (data: ListEntry[], sort: Sort) => {
			if (!sort.active || sort.direction === "") {
				return data;
			}

			return data.sort((a, b) => {
				const isAsc = sort.direction === "asc";
				switch (sort.active) {
					case "title":
						return compare(a.title, b.title, isAsc);
					case "score":
						return compare(a.score, b.score, isAsc);
					case "reread":
						return compare(a.reread, b.reread, isAsc);
					default:
						return 0;
				}
			});
		};
	}

	expandedDetails(element: ListEntry) {
		element.isExpanded = !element.isExpanded;
	}

	hasExpandedDetails(element: ListEntry) {
		return element.start_date || element.end_date || element.notes;
	}

	updateListEntry(isbn: string, title: string): void {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.id = "list-entry-modal";

		dialogConfig.height = "60%";
		dialogConfig.width = "55%";
		dialogConfig.data = {
			isbn: isbn,
			cover: this.service.getCover(isbn, "medium"),
			title: title
		};
		this.matDialog.open(ListEntryModalComponent, dialogConfig);
	}
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
	if (a === null) {
		return 1 * (isAsc ? 1 : -1);
	}
	if (b === null) {
		return -1 * (isAsc ? 1 : -1);
	}
	return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
