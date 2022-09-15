import { Component, ViewChild } from "@angular/core";

@Component({
	selector: "search-bar",
	templateUrl: "./search-bar.component.html",
	styleUrls: ["./search-bar.component.css"]
})
export class SearchBarComponent {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	@ViewChild("searchInput") userInput: any;
	searchTerm = "";

	submit() {
		return null;
	}
}
