import { Component, Input } from "@angular/core";
import { Sort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ListEntry } from "src/app/models/ListEntry";
import { MynewormAPIService } from "src/app/services/myneworm-api.service";
import { formatOwnerStatus } from "src/app/functions/formatOwnerStatus";

@Component({
	selector: "table-display",
	templateUrl: "./table-display.component.html",
	styleUrls: ["./table-display.component.css"]
})
export class TableDisplayComponent {
	displayedColumns = ["cover", "title", "score", "reread", "owner", "more"];
	@Input() dataSource: MatTableDataSource<ListEntry>;
	@Input() tableName: string;
	formatOwnerStatus = formatOwnerStatus;

	constructor(public service: MynewormAPIService) {}

	getCover(isbn: string) {
		return this.service.getAsset(`${isbn}`);
	}

	sortData(sort: Sort) {
		const data = this.dataSource.data;

		if (!sort.active || sort.direction === "") {
			this.dataSource.data = data;
			return;
		}

		this.dataSource.data = data.sort((a, b) => {
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
