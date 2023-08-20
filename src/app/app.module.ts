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
import { SearchBarModule } from "./search-bar/search-bar.module";
import { DataCorrectionFormComponent } from "./data-correction-form/data-correction-form.component";
import { ContactPageComponent } from "./contact-page/contact-page.component";
import { MatDialogModule } from "@angular/material/dialog";
import { SearchPageModule } from "./search-page/search-page.module";
import { LoginPageComponent } from "./login-page/login-page.component";
import { UserNavMenuComponent } from "./user-nav-menu/user-nav-menu.component";
import { LocalCookiesService } from "./services/authentication/local-cookies.service";
import { UserSettingsPageComponent } from "./user-settings-page/user-settings-page.component";
import { UserListPageModule } from "./user-list-page/user-list-page.module";
import { UserProfilePageComponent } from "./user-profile-page/user-profile-page.component";
import { StatisticDisplayComponent } from "./user-profile-page/statistic-display/statistic-display.component";
import { RegistrationPageComponent } from "./registration-page/registration-page.component";
import { SharedModule } from "./shared/shared.module";
import { DeleteConfirmationComponent } from "./user-settings-page/delete-confirmation/delete-confirmation.component";

@NgModule({
	declarations: [
		AppComponent,
		MissingPageComponent,
		DataCorrectionFormComponent,
		ContactPageComponent,
		LoginPageComponent,
		UserNavMenuComponent,
		UserSettingsPageComponent,
		UserProfilePageComponent,
		StatisticDisplayComponent,
		RegistrationPageComponent,
		DeleteConfirmationComponent
	],
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
		ImprintIndexModule,
		SeriesPageModule,
		SearchBarModule,
		SearchPageModule,
		MatDialogModule,
		UserListPageModule,
		SharedModule
	],
	providers: [Title, LocalCookiesService],
	bootstrap: [AppComponent]
})
export class AppModule {}
