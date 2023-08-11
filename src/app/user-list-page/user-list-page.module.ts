import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { UserListPageComponent } from "./user-list-page.component";
import { MatTableModule } from "@angular/material/table";
import { RouterModule } from "@angular/router";
import { MatSortModule } from "@angular/material/sort";
import { TableDisplayComponent } from "./table-display/table-display.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
	declarations: [UserListPageComponent, TableDisplayComponent],
	imports: [BrowserModule, MatTableModule, RouterModule, MatSortModule, SharedModule],
	exports: [UserListPageComponent]
})
export class UserListPageModule {}
