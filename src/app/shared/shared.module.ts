import { NgModule } from "@angular/core";
import { LazyLoadStyleService } from "../services/lazy-load-style.service";

import { CalendarManagerModule } from "./calendar-manager/calendar-manager.module";
import { DatepickerModalModule } from "./datepicker-modal/datepicker-modal.module";
import { ToastMessagesComponent } from "./toast-messages/toast-messages.component";
import { ListEntryModalComponent } from "./list-entry-modal/list-entry-modal.component";
import { FormsModule } from "@angular/forms";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatCardModule } from "@angular/material/card";
import { UserActionDropdownComponent } from "./user-action-dropdown/user-action-dropdown.component";
import { CommonModule } from "@angular/common";

@NgModule({
	imports: [
		CommonModule,
		CalendarManagerModule,
		DatepickerModalModule,
		ToastMessagesComponent,
		UserActionDropdownComponent,
		FormsModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatCardModule
	],
	providers: [LazyLoadStyleService],
	exports: [CalendarManagerModule, DatepickerModalModule, ToastMessagesComponent, UserActionDropdownComponent],
	declarations: [ListEntryModalComponent]
})
export class SharedModule {}
