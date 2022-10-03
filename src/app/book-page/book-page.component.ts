import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { BookData } from "../models/bookData";
import { MynewormAPIService } from "../services/myneworm-api.service";

@Component({
	selector: "app-book-page",
	templateUrl: "./book-page.component.html",
	styleUrls: ["./book-page.component.css"]
})
export class BookPageComponent implements OnInit {
	book: BookData;

	constructor(private route: ActivatedRoute, private service: MynewormAPIService, private titleService: Title) {}

	ngOnInit(): void {
		this.route.params.subscribe((data) => {
			this.service.getByISBN(data.isbn).subscribe((data: BookData) => {
				this.book = data;
				this.titleService.setTitle(`Myneworm - ${this.book.title}`);
			});
		});
	}

	getCover(isbn: string) {
		return this.service.getAsset(`${isbn}`);
	}
}
