import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomePageModule } from "./home-page/home-page.module";
import { BookPageModule } from "./book-page/book-page.module";
import { ImprintPageModule } from "./imprint-page/imprint-page.module";
import { HttpClientModule } from "@angular/common/http";
import { SupportPageModule } from "./support-page/support-page.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ImprintIndexModule } from "./imprint-index/imprint-index.module";
@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		HttpClientModule,
		FormsModule,
		AppRoutingModule,
		HomePageModule,
		BookPageModule,
		ImprintPageModule,
		SupportPageModule,
		BrowserAnimationsModule,
		ImprintIndexModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
