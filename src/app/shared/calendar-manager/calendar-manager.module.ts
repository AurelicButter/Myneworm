import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { FullCalendarModule } from "@fullcalendar/angular";
import { CalendarManagerComponent } from "./calendar-manager.component";

@NgModule({
	declarations: [CalendarManagerComponent],
	imports: [BrowserModule, FullCalendarModule],
	exports: [CalendarManagerComponent]
})
export class CalendarManagerModule {}
