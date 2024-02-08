import { NgModule } from "@angular/core";
import { SearchBarComponent } from "./search-bar.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { CommonModule } from "@angular/common";

@NgModule({
	declarations: [SearchBarComponent],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MatButtonModule,
		MatFormFieldModule,
		MatInputModule,
		MatTableModule
	],
	exports: [SearchBarComponent]
})
export class SearchBarModule {}
