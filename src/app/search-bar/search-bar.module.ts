import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { SearchBarComponent } from "./search-bar.component";

import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from "@angular/forms";

@NgModule({
	declarations: [SearchBarComponent],
	imports: [BrowserModule, MatFormFieldModule, MatInputModule, FormsModule],
	exports: [SearchBarComponent]
})
export class SearchBarModule {}
