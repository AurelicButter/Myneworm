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
		BookFormatPipe
	]
})
export class SearchBarComponent {
	displayedColumns = ["cover", "title"];
	searchTerm = "";
	public dataSource: MatTableDataSource<BookData> = new MatTableDataSource<BookData>();
	loading = false;
	hoveredRow: BookData | null = null;

	constructor(
		private service: MynewormAPIService,
		public utilities: UtilitiesService,
		private router: Router
	) {}

	private searchBooks() {
		if (this.searchTerm === "") {
			return this.resetData();
		}
		this.service.searchBookByTerm(this.searchTerm).subscribe((data: BookData[]) => {
			this.dataSource = new MatTableDataSource<BookData>(data);
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
		const oldInput = this.searchTerm;
		this.loading = true;
		await new Promise((resolve) => setTimeout(resolve, 500));
		if (oldInput !== this.searchTerm) {
			this.loading = false;
			return;
		}

		this.searchBooks();
	}

	resetData() {
		this.dataSource = new MatTableDataSource<BookData>();
		this.searchTerm = "";
		this.loading = false;
	}

	onClick(isbn: string) {
		this.router.navigate([`/book/${isbn}`]);
		this.resetData();
	}

	onButtonClick() {
		this.router.navigate(["/search"], {
			queryParams: { term: this.searchTerm }
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
