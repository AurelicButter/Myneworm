import { NgModule } from "@angular/core";
import { BrowserModule, Title } from "@angular/platform-browser";
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
import { MissingPageComponent } from "./missing-page/missing-page.component";
import { SeriesPageModule } from "./series-page/series-page.module";
import { FaqPageComponent } from "./faq-page/faq-page.component";
import { AboutPageComponent } from "./about-page/about-page.component";
import { SearchBarModule } from "./search-bar/search-bar.module";
import { DataCorrectionFormComponent } from "./data-correction-form/data-correction-form.component";
import { ContactPageComponent } from "./contact-page/contact-page.component";
import { MatDialogModule } from "@angular/material/dialog";
import { SearchPageModule } from "./search-page/search-page.module";

@NgModule({
	declarations: [
		AppComponent,
		MissingPageComponent,
		FaqPageComponent,
		AboutPageComponent,
		DataCorrectionFormComponent,
		ContactPageComponent
	],
	imports: [
		BrowserModule.withServerTransition({ appId: "serverApp" }),
		HttpClientModule,
		FormsModule,
		AppRoutingModule,
		HomePageModule,
		BookPageModule,
		ImprintPageModule,
		SupportPageModule,
		BrowserAnimationsModule,
		ImprintIndexModule,
		SeriesPageModule,
		SearchBarModule,
		SearchPageModule,
		MatDialogModule
	],
	providers: [Title],
	bootstrap: [AppComponent]
})
export class AppModule {}
