import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CalendarOptions } from "@fullcalendar/angular";
import { MynewormAPIService } from "../services/myneworm-api.service";

@Component({
	selector: "app-home-page",
	templateUrl: "./home-page.component.html",
	styleUrls: ["./home-page.component.css"]
})
export class HomePageComponent implements OnInit {
	calendarOptions: CalendarOptions = {
		height: "calc(100vh - 190px)",
		initialView: "dayGridMonth",
		editable: false,
		buttonText: {
			list: "schedule"
		},
		showNonCurrentDates: false,
		fixedWeekCount: false,
		headerToolbar: {
			left: "today",
			center: "title",
			right: "prev,dayGridWeek,dayGridMonth,listMonth,next"
		}
	};

	constructor(private route: ActivatedRoute, private service: MynewormAPIService) {}

	ngOnInit(): void {}
}
