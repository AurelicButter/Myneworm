import { Component, Input, OnChanges, OnInit } from "@angular/core";
import { Sort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ListEntry } from "src/app/models/ListEntry";
import { MynewormAPIService } from "src/app/services/myneworm-api.service";
import { formatOwnerStatus } from "src/app/functions/formatOwnerStatus";
import { formatDateString } from "src/app/functions/formatDateString";

@Component({
	selector: "table-display",
	templateUrl: "./table-display.component.html",
	styleUrls: ["./table-display.component.css"]
})
export class TableDisplayComponent implements OnInit, OnChanges {
	displayedColumns = ["cover", "title", "score", "reread", "owner", "bookType", "more"];
	@Input() _allEntries: MatTableDataSource<ListEntry>;
	@Input() tableName: string;
	@Input() ownershipFilter: string[];
	@Input() booktypeFilter: string[];
	@Input() triggerListUpdate: boolean;
	formatOwnerStatus = formatOwnerStatus;
	formatDateString = formatDateString;
	public listEntries: ListEntry[];

	constructor(public service: MynewormAPIService) {}

	ngOnInit() {
		this.listEntries = this._allEntries.data;
	}

	ngOnChanges() {
		if (this.ownershipFilter.length === 0 && this.booktypeFilter.length === 0) {
			this.listEntries = this._allEntries.data;
			return;
		}

		let data = this._allEntries.data;

		if (this.ownershipFilter.length > 0) {
			data = data.filter((item) => this.ownershipFilter.includes(item.owner_status));
		}

		if (this.booktypeFilter.length > 0) {
			data = data.filter((item) => this.booktypeFilter.includes(item.book_type_name));
		}

		this.listEntries = data;
	}

	getCover(isbn: string) {
		return this.service.getAsset(`${isbn}`);
	}

	sortData(sort: Sort) {
		if (!sort.active || sort.direction === "") {
			this.listEntries = this._allEntries.data;
			return;
		}

		const data = this.listEntries;

		this.listEntries = data.sort((a, b) => {
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
	}

	expandedDetails(element: ListEntry) {
		element.isExpanded = !element.isExpanded;
	}

	hasExpandedDetails(element: ListEntry) {
		return element.start_date !== undefined || element.end_date !== undefined || element.notes !== undefined;
	}
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
	return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
