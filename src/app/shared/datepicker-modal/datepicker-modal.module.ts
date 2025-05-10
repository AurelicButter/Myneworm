import { NgModule } from "@angular/core";
import { DatepickerModalComponent } from "./datepicker-modal.component";

import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { CommonModule } from "@angular/common";

@NgModule({
	declarations: [DatepickerModalComponent],
	imports: [CommonModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, MatInputModule],
	exports: [DatepickerModalComponent]
})
export class DatepickerModalModule {}
