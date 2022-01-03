import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { SupportPageComponent } from "./support-page.component";
import { DataCorrectionComponent } from "./data-correction/data-correction.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ContactFormComponent } from "./contact-form/contact-form.component";

@NgModule({
	declarations: [SupportPageComponent, DataCorrectionComponent, ContactFormComponent],
	imports: [BrowserModule, FormsModule, ReactiveFormsModule],
	exports: [SupportPageComponent]
})
export class SupportPageModule {}
