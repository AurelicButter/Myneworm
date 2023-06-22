import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { UserListPageComponent } from "./user-list-page.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { RouterModule } from "@angular/router";
import { MatSortModule } from "@angular/material/sort";

@NgModule({
	declarations: [UserListPageComponent],
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		MatButtonModule,
		MatFormFieldModule,
		MatInputModule,
		MatTableModule,
		RouterModule,
		MatSortModule
	],
	exports: [UserListPageComponent]
})
export class UserListPageModule {}
