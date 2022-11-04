import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { SearchBarComponent } from "./search-bar.component";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
	declarations: [SearchBarComponent],
	imports: [BrowserModule, FormsModule, ReactiveFormsModule],
	exports: [SearchBarComponent]
})
export class SearchBarModule {}
