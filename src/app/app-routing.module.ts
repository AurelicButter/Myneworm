import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BookPageComponent } from "./book-page/book-page.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { ImprintPageComponent } from "./imprint-page/imprint-page.component";
import { ImprintIndexComponent } from "./imprint-index/imprint-index.component";
import { MissingPageComponent } from "./missing-page/missing-page.component";
import { SeriesPageComponent } from "./series-page/series-page.component";
import { DataCorrectionFormComponent } from "./data-correction-form/data-correction-form.component";
import { SearchPageComponent } from "./search-page/search-page.component";
import { LoginPageComponent } from "./login-page/login-page.component";
import { AuthenticationGuard } from "./services/authentication/authentication.guard";
import { UserSettingsPageComponent } from "./user-settings-page/user-settings-page.component";
import { RegistrationPageComponent } from "./registration-page/registration-page.component";

const routes: Routes = [
	{ path: "", component: HomePageComponent },
	{ path: "home", pathMatch: "full", redirectTo: "" },
	{ path: "book/:isbn", component: BookPageComponent },
	{ path: "publisher", component: ImprintIndexComponent },
	{ path: "publisher/:id", component: ImprintPageComponent },
	{ path: "series/:id", component: SeriesPageComponent },
	{ path: "search", component: SearchPageComponent },
	{
		path: "about",
		loadComponent: () => import("./about-page/about-page.component").then((m) => m.AboutPageComponent)
	},
	{
		path: "faq",
		loadComponent: () => import("./pages/faq/faq.component").then((m) => m.FaqComponent)
	},
	{ path: "correction", component: DataCorrectionFormComponent },
	{
		path: "support",
		loadComponent: () => import("./pages/support/support.component").then((m) => m.SupportPageComponent)
	},
	{
		path: "privacy",
		loadComponent: () => import("./privacy-page/privacy-page.component").then((m) => m.PrivacyPageComponent)
	},
	{
		path: "guidelines",
		loadComponent: () =>
			import("./database-guidelines/database-guidelines.component").then((m) => m.DatabaseGuidelinesComponent)
	},
	{ path: "login", component: LoginPageComponent },
	{ path: "register", component: RegistrationPageComponent },
	{
		path: "reset",
		pathMatch: "full",
		loadComponent: () =>
			import("./pages/reset-password/reset-password.component").then((m) => m.ResetPasswordComponent)
	},
	{
		path: "reset/:resetID",
		loadComponent: () =>
			import("./pages/reset-password-link/reset-password-link.component").then(
				(m) => m.ResetPasswordLinkComponent
			)
	},
	{ path: "settings", pathMatch: "full", component: UserSettingsPageComponent, canActivate: [AuthenticationGuard] },
	{ path: "settings/:page", component: UserSettingsPageComponent, canActivate: [AuthenticationGuard] },
	{
		path: "user",
		loadChildren: () => import("./user-pages/user.module").then((m) => m.UserModule)
	},
	{
		path: "admin",
		loadChildren: () => import("./admin-pages/admin.module").then((m) => m.AdminModule)
	},
	{ path: "**", component: MissingPageComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { paramsInheritanceStrategy: "always" })],
	exports: [RouterModule]
})
export class AppRoutingModule {}
