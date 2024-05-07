import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { BookPageComponent } from "./book-page.component";
import { SharedModule } from "../../shared/shared.module";
import { BookFormatPipe } from "src/app/pipes/BookFormat.pipe";

@NgModule({
	declarations: [BookPageComponent],
	imports: [BrowserModule, RouterModule, SharedModule, BookFormatPipe],
	exports: [BookPageComponent]
})
export class BookPageModule {}
