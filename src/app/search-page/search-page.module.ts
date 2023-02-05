import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { SearchPageComponent } from "./search-page.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { RouterModule } from "@angular/router";

@NgModule({
	declarations: [SearchPageComponent],
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		MatButtonModule,
		MatFormFieldModule,
		MatInputModule,
		MatTableModule,
		RouterModule
	],
	exports: [SearchPageComponent]
})
export class SearchPageModule {}
