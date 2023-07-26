import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { LazyLoadStyleService } from "../services/lazy-load-style.service";

import { CalendarManagerModule } from "./calendar-manager/calendar-manager.module";
import { DatepickerModalModule } from "./datepicker-modal/datepicker-modal.module";
import { ToastMessagesComponent } from "./toast-messages/toast-messages.component";

@NgModule({
	imports: [BrowserModule, CalendarManagerModule, DatepickerModalModule, ToastMessagesComponent],
	providers: [LazyLoadStyleService],
	exports: [CalendarManagerModule, DatepickerModalModule, ToastMessagesComponent]
})
export class SharedModule {}
