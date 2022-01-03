import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomePageModule } from "./home-page/home-page.module";
import { BookPageModule } from "./book-page/book-page.module";
import { PublisherPageModule } from "./publisher-page/publisher-page.module";
import { HttpClientModule } from "@angular/common/http";
import { SupportPageModule } from "./support-page/support-page.module";

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		HttpClientModule,
		FormsModule,
		AppRoutingModule,
		HomePageModule,
		BookPageModule,
		PublisherPageModule,
		SupportPageModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
