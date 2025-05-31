import { Component, OnInit } from "@angular/core";
import { CommonModule, Location, ViewportScroller } from "@angular/common";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { BookData } from "../../models/bookData";
import { MetadataService } from "../../services/metadata.service";
import { MynewormAPIService } from "../../services/myneworm-api.service";
import SearchOptions from "../../classes/SearchOptions.class";
import { BookType } from "../../models/BookType";
import { BookFormat } from "../../models/BookFormat";
import { ImprintData } from "../../models/imprintData";
import * as moment from "moment";
import { ToastService } from "../../services/toast.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { BookFormatPipe } from "../../pipes/BookFormat.pipe";
import { MarkdownModule } from "ngx-markdown";
import SearchResults from "src/app/models/SearchResults";

@Component({
	selector: "search-page",
	templateUrl: "./search-page.component.html",
	styleUrls: ["./search-page.component.css"],
	standalone: true,
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MatButtonModule,
		MatFormFieldModule,
		MatInputModule,
		MatTableModule,
		RouterModule,
		BookFormatPipe,
		MarkdownModule
	]
})
export class SearchPageComponent implements OnInit {
	displayedColumns = ["cover", "title", "format", "type"];
	public dataSource: MatTableDataSource<BookData> = new MatTableDataSource<BookData>();
	showAdvancedOptions = false;
	searchOptions = new SearchOptions();
	types: BookType[];
	formats: BookFormat[];
	publishers: ImprintData[];
	startDate: { [key: string]: number | null } = {
		year: null,
		month: null,
		day: null
	};
	endDate: { [key: string]: number | null } = {
		year: null,
		month: null,
		day: null
	};
	private isFirstLoad = true;
	lastSearchedTerm = "";
	hasNextPage = false;

	constructor(
		private route: ActivatedRoute,
		private service: MynewormAPIService,
		private metaService: MetadataService,
		private router: Router,
		private location: Location,
		private scroll: ViewportScroller,
		private toastService: ToastService
	) {}

	ngOnInit() {
		this.metaService.updateMetaTags("Search", "/search");

		this.route.queryParams.subscribe((params) => {
			if (params === null) {
				return;
			}

			this.searchOptions.loadFromParams(params);
			this.showAdvancedOptions = this.searchOptions.hasAdvanceOptions();

			if (params.start) {
				const date = moment(params.start);
				this.startDate.year = date.get("year");
				this.startDate.month = date.get("month");
				this.startDate.day = date.get("date");
			}

			if (params.end) {
				const date = moment(params.end);
				this.endDate.year = date.get("year");
				this.endDate.month = date.get("month");
				this.endDate.day = date.get("date");
			}

			this.searchBooks();
		});

		this.service.getBookTypes().subscribe((data) => this.types = data);
		this.service.getBookFormats().subscribe((data) => this.formats = data);
		this.service.getImprints().subscribe((data) => {
			this.publishers = data;
			if (this.searchOptions.publisher_id) {
				this.searchOptions.publisher_id++;
				this.searchOptions.publisher_id--;
			}
		});
	}

	private searchBooks() {
		if (!this.isFirstLoad && !this.searchOptions.hasInput()) {
			// No params, only page number provided
			this.toastService.sendError("No parameters provided. Unable to search");
			return;
		}

		if (!this.showAdvancedOptions && !this.searchOptions.term && this.isFirstLoad) {
			return;
		}

		this.isFirstLoad = false;

		this.service.searchBooks(this.searchOptions).subscribe((data: SearchResults<BookData>) => {
			this.dataSource = new MatTableDataSource<BookData>(data.results);
			this.hasNextPage = data.nextPage;

			if (this.searchOptions.term) {
				this.metaService.updateMetaTags(`Search - ${this.searchOptions.term}`, "/search");
			} else {
				this.metaService.updateMetaTags("Search", "/search");
			}

			this.lastSearchedTerm = this.searchOptions.term || "";
		});
	}

	private scrollToTop() {
		this.scroll.scrollToPosition([0, 0]);
	}

	clearFilters() {
		this.searchOptions = new SearchOptions();
	}

	onStartDateChange() {
		if (this.startDate.year === null) {
			this.searchOptions.startDate = undefined;
			this.startDate.month = null;
			this.startDate.day = null;
			return;
		}

		const targetDate = moment().startOf("year").set("year", this.startDate.year);

		if (this.startDate.month !== null && this.startDate.month !== -1) {
			targetDate.set("month", this.startDate.month);
		} else {
			this.startDate.day = null;
		}

		if (this.startDate.day !== null) {
			targetDate.set("date", this.startDate.day);
		}

		this.searchOptions.startDate = targetDate.format("YYYY-MM-DD");
	}

	onEndDateChange() {
		if (this.endDate.year === null) {
			this.searchOptions.endDate = undefined;
			this.endDate.month = null;
			this.endDate.day = null;
			return;
		}

		const targetDate = moment().startOf("year").set("year", this.endDate.year);

		if (this.endDate.month !== null && this.endDate.month !== -1) {
			targetDate.set("month", this.endDate.month);
		} else {
			this.endDate.day = null;
		}

		if (this.endDate.day !== null) {
			targetDate.set("date", this.endDate.day);
		}

		this.searchOptions.endDate = targetDate.format("YYYY-MM-DD");
	}

	getMonth(i: number) {
		return new Date(0, i).toLocaleString("en", { month: "long" });
	}

	submit() {
		this.searchOptions.page = 1;
		this.updateQuery();
	}

	onAdvOptionsClick() {
		this.showAdvancedOptions = !this.showAdvancedOptions;
	}

	updateQuery() {
		const url = this.router
			.createUrlTree([], {
				relativeTo: this.route,
				queryParams: this.searchOptions.generateParams()
			})
			.toString();

		this.location.go(url);
		this.searchBooks();
		this.scrollToTop();
	}

	nextPage() {
		this.searchOptions.page++;
		this.updateQuery();
	}

	prevPage() {
		if (this.searchOptions.page === 1) {
			return;
		}

		this.searchOptions.page--;
		this.updateQuery();
	}

	getCover(isbn: string) {
		return this.service.getCover(isbn, "small");
	}
}
