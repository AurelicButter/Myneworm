import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomePageModule } from "./home-page/home-page.module";
import { BookPageModule } from "./book-page/book-page.module";
import { PublisherPageModule } from "./publisher-page/publisher-page.module";

@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, AppRoutingModule, HomePageModule, BookPageModule, PublisherPageModule],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
