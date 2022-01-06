import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { DatepickerModalComponent } from "./datepicker-modal.component";

import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

@NgModule({
	declarations: [DatepickerModalComponent],
	imports: [BrowserModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, MatInputModule],
	exports: [DatepickerModalComponent]
})
export class DatepickerModalModule {}
