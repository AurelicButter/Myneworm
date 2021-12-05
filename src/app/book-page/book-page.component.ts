import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MynewormAPIService } from "../services/myneworm-api.service";

@Component({
	selector: "app-book-page",
	templateUrl: "./book-page.component.html",
	styleUrls: ["./book-page.component.css"]
})
export class BookPageComponent implements OnInit {
	constructor(private route: ActivatedRoute, private service: MynewormAPIService) {}

	ngOnInit(): void {}
}
