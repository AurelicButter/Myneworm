import { Component } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute } from "@angular/router";
import { BookData } from "../models/bookData";
import { MetadataService } from "../services/metadata.service";
import { MynewormAPIService } from "../services/myneworm-api.service";
import { UtilitiesService } from "../services/utilities.service";

@Component({
	selector: "search-page",
	templateUrl: "./search-page.component.html",
	styleUrls: ["./search-page.component.css"]
})
export class SearchPageComponent {
	displayedColumns = ["cover", "title", "format", "type"];
	searchTerm = "";
	public dataSource: MatTableDataSource<BookData> = new MatTableDataSource<BookData>();
	hoveredRow: BookData | null = null;
	showAdvancedOptions = false;

	constructor(
		private route: ActivatedRoute,
		public service: MynewormAPIService,
		public utilities: UtilitiesService,
		private metaService: MetadataService
	) {
		this.metaService.updateMetaTags("Search", "/search");
	}

	private searchBooks() {
		if (this.searchTerm === "") {
			return;
		}
		this.service.searchBooksWithLimit(this.searchTerm, 25, 1).subscribe((data: BookData[]) => {
			this.dataSource = new MatTableDataSource<BookData>(data);
		});
	}

	submit() {
		this.searchBooks();
	}

	mouseOverRow(row: BookData) {
		this.hoveredRow = row;
	}

	mouseLeaveRow() {
		this.hoveredRow = null;
	}
}
