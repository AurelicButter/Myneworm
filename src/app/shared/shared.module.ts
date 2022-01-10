import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { CalendarManagerModule } from "./calendar-manager/calendar-manager.module";
import { DatepickerModalModule } from "./datepicker-modal/datepicker-modal.module";

@NgModule({
	declarations: [],
	imports: [BrowserModule, CalendarManagerModule, DatepickerModalModule],
	exports: [CalendarManagerModule, DatepickerModalModule]
})
export class SharedModule {}
