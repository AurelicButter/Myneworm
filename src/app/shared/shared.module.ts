import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { LazyLoadStyleService } from "../services/lazy-load-style.service";

import { CalendarManagerModule } from "./calendar-manager/calendar-manager.module";
import { DatepickerModalModule } from "./datepicker-modal/datepicker-modal.module";

@NgModule({
	declarations: [],
	imports: [BrowserModule, CalendarManagerModule, DatepickerModalModule],
	providers: [LazyLoadStyleService],
	exports: [CalendarManagerModule, DatepickerModalModule]
})
export class SharedModule {}
