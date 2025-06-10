import { NgModule } from "@angular/core";
import { LazyLoadStyleService } from "../services/lazy-load-style.service";

import { DatepickerModalModule } from "./datepicker-modal/datepicker-modal.module";
import { ToastMessagesComponent } from "./toast-messages/toast-messages.component";
import { ListEntryModalComponent } from "./list-entry-modal/list-entry-modal.component";
import { FormsModule } from "@angular/forms";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatCardModule } from "@angular/material/card";
import { CommonModule } from "@angular/common";
import { CalendarManagerComponent } from "./calendar-manager/calendar-manager.component";

@NgModule({
	imports: [
		CommonModule,
		DatepickerModalModule,
		ToastMessagesComponent,
		CalendarManagerComponent,
		FormsModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatCardModule
	],
	providers: [LazyLoadStyleService],
	exports: [DatepickerModalModule, ToastMessagesComponent, CalendarManagerComponent],
	declarations: [ListEntryModalComponent]
})
export class SharedModule {}
