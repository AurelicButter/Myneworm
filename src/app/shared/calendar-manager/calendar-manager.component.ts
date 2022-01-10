import { Component, Input, ViewChild } from "@angular/core";
import { FullCalendarComponent } from "@fullcalendar/angular";
import { CalendarOptions } from "@fullcalendar/core";

@Component({
	selector: "calendar-manager",
	templateUrl: "./calendar-manager.component.html",
	styleUrls: ["./calendar-manager.component.css"]
})
export class CalendarManagerComponent {
	@Input() options: CalendarOptions | undefined;

	@ViewChild("calendar") myCalendar: FullCalendarComponent | undefined;

	updateDate(date: string) {
		this.myCalendar?.getApi().gotoDate(date);
	}
}
