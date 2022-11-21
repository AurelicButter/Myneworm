import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { BookPageComponent } from "./book-page.component";

@NgModule({
	declarations: [BookPageComponent],
	imports: [BrowserModule, RouterModule],
	exports: [BookPageComponent]
})
export class BookPageModule {}
