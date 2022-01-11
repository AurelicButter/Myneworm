import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { FullCalendarComponent } from "@fullcalendar/angular";
import { CalendarOptions } from "@fullcalendar/core";
import { LazyLoadStyleService } from "src/app/services/lazy-load-style.service";

@Component({
	selector: "calendar-manager",
	templateUrl: "./calendar-manager.component.html"
})
export class CalendarManagerComponent implements OnInit {
	@Input() options: CalendarOptions | undefined;

	@ViewChild("calendar") myCalendar: FullCalendarComponent | undefined;

	constructor(private lazyLoad: LazyLoadStyleService) {}

	ngOnInit(): void {
		this.lazyLoad.loadStyle("calendar-styles");
	}

	updateDate(date: string) {
		this.myCalendar?.getApi().gotoDate(date);
	}
}
