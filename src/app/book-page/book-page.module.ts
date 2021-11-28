import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BookPageComponent } from "./book-page.component";

@NgModule({
	declarations: [BookPageComponent],
	imports: [BrowserModule],
	exports: [BookPageComponent]
})
export class BookPageModule {}
