import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { BookData } from "../models/bookData";
import { MetadataService } from "../services/metadata.service";
import { MynewormAPIService } from "../services/myneworm-api.service";
import { UtilitiesService } from "../services/utilities.service";

@Component({
	selector: "search-page",
	templateUrl: "./search-page.component.html",
	styleUrls: ["./search-page.component.css"]
})
export class SearchPageComponent implements OnInit {
	displayedColumns = ["cover", "title", "format", "type"];
	searchTerm = "";
	public dataSource: MatTableDataSource<BookData> = new MatTableDataSource<BookData>();
	showAdvancedOptions = false;
	pageNumber = 1;

	constructor(
		private route: ActivatedRoute,
		public service: MynewormAPIService,
		public utilities: UtilitiesService,
		private metaService: MetadataService,
		private router: Router
	) {
		this.metaService.updateMetaTags("Search", "/search");
	}

	ngOnInit() {
		this.route.queryParams.subscribe((params) => {
			if (params === null) {
				return;
			}

			this.searchTerm = params.term;
			this.pageNumber = params.page || 1;
			this.searchBooks();
		});
	}

	private searchBooks() {
		if (this.searchTerm === "") {
			return;
		}
		this.service.searchBooksWithLimit(this.searchTerm, 25, this.pageNumber).subscribe((data: BookData[]) => {
			this.dataSource = new MatTableDataSource<BookData>(data);
			console.log(this.dataSource);
		});
	}

	submit() {
		this.pageNumber = 1;
		this.searchBooks();
		this.updateQuery();
	}

	onAdvOptionsClick() {
		this.showAdvancedOptions = !this.showAdvancedOptions;
	}

	updateQuery() {
		const queryParams: Params = {
			term: this.searchTerm,
			page: this.pageNumber
		};

		this.router.navigate([], {
			relativeTo: this.route,
			queryParams: queryParams,
			queryParamsHandling: "merge"
		});
	}

	nextPage() {
		this.pageNumber++;
		this.updateQuery();
	}

	prevPage() {
		if (this.pageNumber === 1) {
			return;
		}

		this.pageNumber--;
		this.updateQuery();
	}
}
