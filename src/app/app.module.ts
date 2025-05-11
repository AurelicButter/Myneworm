import { NgModule } from "@angular/core";
import { BrowserModule, Title } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomePageModule } from "./home-page/home-page.module";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SeriesPageModule } from "./series-page/series-page.module";
import { MatDialogModule } from "@angular/material/dialog";
import { LoginPageComponent } from "./pages/login/login.component";
import { UserNavMenuComponent } from "./user-nav-menu/user-nav-menu.component";
import { LocalCookiesService } from "./services/authentication/local-cookies.service";
import { UserSettingsPageComponent } from "./user-settings-page/user-settings-page.component";
import { RegistrationPageComponent } from "./pages/registration/registration.component";
import { SharedModule } from "./shared/shared.module";
import { DeleteConfirmationComponent } from "./user-settings-page/delete-confirmation/delete-confirmation.component";
import { MarkdownModule } from "ngx-markdown";
import { SearchBarComponent } from "./search-bar/search-bar.component";
import { BookPageComponent } from "./pages/book-page/book-page.component";

@NgModule({
	declarations: [
		AppComponent,
		LoginPageComponent,
		UserNavMenuComponent,
		UserSettingsPageComponent,
		RegistrationPageComponent,
		DeleteConfirmationComponent
	],
	imports: [
		MarkdownModule.forRoot(),
		BrowserModule,
		HttpClientModule,
		FormsModule,
		AppRoutingModule,
		HomePageModule,
		BrowserAnimationsModule,
		SeriesPageModule,
		SearchBarComponent,
		MatDialogModule,
		SharedModule,
		BookPageComponent
	],
	providers: [Title, LocalCookiesService],
	bootstrap: [AppComponent]
})
export class AppModule {}
