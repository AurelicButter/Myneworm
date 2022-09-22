import { Component, ViewChild } from "@angular/core";
import { MynewormAPIService } from "../services/myneworm-api.service";

@Component({
	selector: "search-bar",
	templateUrl: "./search-bar.component.html",
	styleUrls: ["./search-bar.component.css"]
})
export class SearchBarComponent {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	@ViewChild("searchInput") userInput: any;
	searchTerm = "";

	constructor(private service: MynewormAPIService) {}

	submit() {
		console.log(this.searchTerm);
		return null;
	}
}
