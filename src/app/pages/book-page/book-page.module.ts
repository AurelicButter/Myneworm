import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { BookPageComponent } from "./book-page.component";
import { SharedModule } from "../../shared/shared.module";
import { CommonModule } from "@angular/common";

@NgModule({
	declarations: [BookPageComponent],
	imports: [CommonModule, RouterModule, SharedModule],
	exports: [BookPageComponent]
})
export class BookPageModule {}
