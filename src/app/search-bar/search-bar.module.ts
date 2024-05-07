import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { SearchBarComponent } from "./search-bar.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { BookFormatPipe } from "../pipes/BookFormat.pipe";

@NgModule({
	declarations: [SearchBarComponent],
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		MatButtonModule,
		MatFormFieldModule,
		MatInputModule,
		MatTableModule,
		BookFormatPipe
	],
	exports: [SearchBarComponent]
})
export class SearchBarModule {}
