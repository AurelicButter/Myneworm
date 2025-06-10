import { Component } from "@angular/core";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MynewormAPIService } from "../services/myneworm-api.service";
import { BookData } from "../models/bookData";
import { UtilitiesService } from "../services/utilities.service";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { BookFormatPipe } from "../pipes/BookFormat.pipe";
import SearchOptions from "../classes/SearchOptions.class";
import SearchResults from "../models/SearchResults";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

@Component({
	selector: "search-bar",
	templateUrl: "./search-bar.component.html",
	styleUrls: ["./search-bar.component.css"],
	standalone: true,
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MatButtonModule,
		MatFormFieldModule,
		MatInputModule,
		MatTableModule,
		BookFormatPipe,
		FontAwesomeModule
	]
})
export class SearchBarComponent {
	faMagnifyingGlass = faMagnifyingGlass;
	displayedColumns = ["cover", "title"];
	public dataSource: MatTableDataSource<BookData> = new MatTableDataSource<BookData>();
	loading = false;
	hoveredRow: BookData | null = null;
	searchOptions = new SearchOptions();

	constructor(
		private service: MynewormAPIService,
		public utilities: UtilitiesService,
		private router: Router
	) {
		this.searchOptions.limit = 10;
	}

	private searchBooks() {
		if (this.searchOptions.term === "") {
			return this.resetData();
		}

		this.service.searchBooks(this.searchOptions).subscribe((data: SearchResults<BookData>) => {
			this.dataSource = new MatTableDataSource<BookData>(data.results);
			this.loading = false;
		});
	}

	getCover(isbn: string) {
		return this.service.getCover(isbn, "thumbnail");
	}

	submit() {
		this.searchBooks();
	}

	async onChange() {
		const oldInput = this.searchOptions.term;
		this.loading = true;
		await new Promise((resolve) => setTimeout(resolve, 500));
		if (oldInput !== this.searchOptions.term) {
			this.loading = false;
			return;
		}

		this.searchBooks();
	}

	resetData() {
		this.dataSource = new MatTableDataSource<BookData>();
		this.searchOptions.term = undefined;
		this.loading = false;
	}

	onClick(isbn: string) {
		this.router.navigate([`/book/${isbn}`]);
		this.resetData();
	}

	onButtonClick() {
		this.router.navigate(["/search"], {
			queryParams: { term: this.searchOptions.term }
		});
		this.resetData();
	}

	mouseOverRow(row: BookData) {
		this.hoveredRow = row;
	}

	mouseLeaveRow() {
		this.hoveredRow = null;
	}
}
