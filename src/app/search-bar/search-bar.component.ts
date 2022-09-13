import { Component } from "@angular/core";
import { MatFormField } from "@angular/material/form-field";

@Component({
	selector: "search-bar",
	templateUrl: "./search-bar.component.html",
	styleUrls: ["./search-bar.component.css"]
})
export class SearchBarComponent {
	searchInput: string;

	constructor(public searchForm: MatFormField) {}
}
