import { NgModule } from "@angular/core";
import { SupportPageComponent } from "./support-page.component";
import { DataCorrectionComponent } from "./data-correction/data-correction.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ContactFormComponent } from "./contact-form/contact-form.component";
import { CommonModule } from "@angular/common";

@NgModule({
	declarations: [SupportPageComponent, DataCorrectionComponent, ContactFormComponent],
	imports: [CommonModule, FormsModule, ReactiveFormsModule],
	exports: [SupportPageComponent]
})
export class SupportPageModule {}
