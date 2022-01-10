import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { FullCalendarModule } from "@fullcalendar/angular";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { CalendarManagerComponent } from "./calendar-manager.component";

FullCalendarModule.registerPlugins([dayGridPlugin, interactionPlugin, listPlugin]);

@NgModule({
	declarations: [CalendarManagerComponent],
	imports: [BrowserModule, FullCalendarModule],
	exports: [CalendarManagerComponent]
})
export class CalendarManagerModule {}
