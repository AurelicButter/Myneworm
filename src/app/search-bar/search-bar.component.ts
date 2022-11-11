import { Component } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MynewormAPIService } from "../services/myneworm-api.service";
import { BookData } from "../models/bookData";
import { UtilitiesService } from "../services/utilities.service";
import { Router } from "@angular/router";

@Component({
	selector: "search-bar",
	templateUrl: "./search-bar.component.html",
	styleUrls: ["./search-bar.component.css"]
})
export class SearchBarComponent {
	displayedColumns = ["cover", "title"];
	searchTerm = "";
	public dataSource: MatTableDataSource<BookData> = new MatTableDataSource<BookData>();

	constructor(public service: MynewormAPIService, public utilities: UtilitiesService, private router: Router) {}

	private searchBooks() {
		if (this.searchTerm === "") {
			return this.resetData();
		}
		this.service.searchBookByTerm(this.searchTerm).subscribe((data: BookData[]) => {
			this.dataSource = new MatTableDataSource<BookData>(data);
			console.log(data);
		});
	}

	submit() {
		this.searchBooks();
	}

	async onChange() {
		const oldInput = this.searchTerm;
		await new Promise((resolve) => setTimeout(resolve, 500));
		if (oldInput !== this.searchTerm) {
			return;
		}

		this.searchBooks();
	}

	resetData() {
		this.dataSource = new MatTableDataSource<BookData>();
		this.searchTerm = "";
	}

	onClick(isbn: string) {
		this.router.navigate([`/book/${isbn}`]);
		this.resetData();
	}
}
