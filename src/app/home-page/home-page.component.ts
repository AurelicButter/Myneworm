import { Component, OnInit } from "@angular/core";
import { CalendarOptions } from "@fullcalendar/angular";

@Component({
	selector: "app-home-page",
	templateUrl: "./home-page.component.html",
	styleUrls: ["./home-page.component.css"]
})
export class HomePageComponent implements OnInit {
	calendarOptions: CalendarOptions = {
		initialView: "dayGridMonth"
	};

	constructor() {}

	ngOnInit(): void {}
}
