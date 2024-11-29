import { Component, OnInit } from "@angular/core";
import { CommonModule, Location, ViewportScroller } from "@angular/common";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { ActivatedRoute, Params, Router, RouterModule } from "@angular/router";
import { BookData } from "../../models/bookData";
import { MetadataService } from "../../services/metadata.service";
import { MynewormAPIService } from "../../services/myneworm-api.service";
import { SearchOptions } from "../../models/SearchOptions";
import { BookType } from "../../models/BookType";
import { BookFormat } from "../../models/BookFormat";
import { ImprintData } from "../../models/imprintData";
import * as moment from "moment";
import { ToastService } from "../../services/toast.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { BookFormatPipe } from "src/app/pipes/BookFormat.pipe";

@Component({
	selector: "search-page",
	templateUrl: "./search.component.html",
	styleUrls: ["./search.component.css"],
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
		BookFormatPipe
	]
})
export class SearchPageComponent implements OnInit {
	displayedColumns = ["cover", "title", "format", "type"];
	searchTerm = "";
	public dataSource: MatTableDataSource<BookData> = new MatTableDataSource<BookData>();
	showAdvancedOptions = false;
	pageNumber = 1;
	advancedOptions = new SearchOptions();
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

			this.searchTerm = params.term;
			this.pageNumber = params.page || 1;
			this.advancedOptions.startDate = params.start;
			this.advancedOptions.endDate = params.end;
			this.advancedOptions.type = params.type;
			this.advancedOptions.format = params.format;
			this.advancedOptions.publisher_id = params.publisher;

			if (params.start || params.end || params.type || params.format || params.publisher) {
				this.showAdvancedOptions = true;
			}

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

			this.searchBooks(this.generateParams());
		});

		this.service.getBookTypes().subscribe((data) => this.types = data);
		this.service.getBookFormats().subscribe((data) => this.formats = data);
		this.service.getImprints().subscribe((data) => {
			this.publishers = data;
			if (this.advancedOptions.publisher_id) {
				this.advancedOptions.publisher_id++;
				this.advancedOptions.publisher_id--;
			}
		});
	}

	private searchBooks(queryParams: Params) {
		if (!this.isFirstLoad && Object.keys(queryParams).length < 3) {
			// Params only are page and limit counts
			this.toastService.sendError("No parameters provided. Unable to search");
			return;
		}

		if (!this.showAdvancedOptions && !this.searchTerm && this.isFirstLoad) {
			return;
		}

		this.isFirstLoad = false;

		this.service.searchBooksWithFilter(queryParams).subscribe((data: BookData[]) => {
			this.dataSource = new MatTableDataSource<BookData>(data);
			if (this.searchTerm) {
				this.metaService.updateMetaTags(`Search - ${this.searchTerm}`, "/search");
			} else {
				this.metaService.updateMetaTags("Search", "/search");
			}

			this.lastSearchedTerm = this.searchTerm + (this.showAdvancedOptions ? " with filters" : "");
		});
	}

	private scrollToTop() {
		this.scroll.scrollToPosition([0, 0]);
	}

	private generateParams(): Params {
		const queryParams: Params = {
			page: this.pageNumber,
			limit: 25
		};

		if (this.searchTerm) {
			queryParams["term"] = this.searchTerm;
		}

		if (this.advancedOptions.startDate) {
			queryParams["start"] = this.advancedOptions.startDate;
		}
		if (this.advancedOptions.endDate) {
			queryParams["end"] = this.advancedOptions.endDate;
		}
		if (this.advancedOptions.publisher_id) {
			queryParams["publisher"] = this.advancedOptions.publisher_id;
		}
		if (this.advancedOptions.type) {
			queryParams["type"] = this.advancedOptions.type;
		}
		if (this.advancedOptions.format) {
			queryParams["format"] = this.advancedOptions.format;
		}

		return queryParams;
	}

	clearFilters() {
		this.advancedOptions = new SearchOptions();
	}

	onStartDateChange() {
		if (this.startDate.year === null) {
			this.advancedOptions.startDate = undefined;
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

		this.advancedOptions.startDate = targetDate.format("YYYY-MM-DD");
	}

	onEndDateChange() {
		if (this.endDate.year === null) {
			this.advancedOptions.endDate = undefined;
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

		this.advancedOptions.endDate = targetDate.format("YYYY-MM-DD");
	}

	getMonth(i: number) {
		return new Date(0, i).toLocaleString("en", { month: "long" });
	}

	submit() {
		this.pageNumber = 1;
		this.updateQuery();
	}

	onAdvOptionsClick() {
		this.showAdvancedOptions = !this.showAdvancedOptions;
	}

	updateQuery() {
		const params = this.generateParams();

		const url = this.router
			.createUrlTree([], {
				relativeTo: this.route,
				queryParams: params
			})
			.toString();

		this.location.go(url);
		this.searchBooks(params);
		this.scrollToTop();
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

	getCover(isbn: string) {
		return this.service.getCover(isbn, "small");
	}
}
