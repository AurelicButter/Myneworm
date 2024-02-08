import { NgModule } from "@angular/core";
import { FullCalendarModule } from "@fullcalendar/angular";
import { CalendarManagerComponent } from "./calendar-manager.component";
import { CommonModule } from "@angular/common";

@NgModule({
	declarations: [CalendarManagerComponent],
	imports: [CommonModule, FullCalendarModule],
	exports: [CalendarManagerComponent]
})
export class CalendarManagerModule {}
