import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BookPageComponent } from "./pages/book-page/book-page.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { ImprintPageComponent } from "./imprint-page/imprint-page.component";
import { ImprintIndexComponent } from "./imprint-index/imprint-index.component";
import { MissingPageComponent } from "./pages/missing-page/missing-page.component";
import { SeriesPageComponent } from "./pages/series-page/series-page.component";
import { SearchPageComponent } from "./pages/search/search.component";
import { LoginPageComponent } from "./pages/login/login.component";
import { AuthenticationGuard } from "./guards/authentication.guard";
import { UserSettingsPageComponent } from "./user-settings-page/user-settings-page.component";
import { RegistrationPageComponent } from "./pages/registration/registration.component";
import { DatabaseGuidelinesComponent } from "./pages/database-guidelines/database-guidelines.component";
import { PrivacyPageComponent } from "./pages/privacy/privacy.component";
import { FaqComponent } from "./pages/faq/faq.component";

const routes: Routes = [
	{ path: "", component: HomePageComponent },
	{ path: "home", pathMatch: "full", redirectTo: "" },
	{ path: "series/:id", component: SeriesPageComponent },
	{ path: "search", component: SearchPageComponent },
	{
		path: "book",
		children: [
			{
				path: "correction",
				canActivate: [AuthenticationGuard],
				loadComponent: () =>
					import("./pages/book-correction-form/book-correction-form.component").then(
						(m) => m.BookCorrectionFormComponent
					)
			},
			{ path: ":isbn", component: BookPageComponent }
		]
	},
	{
		path: "publisher",
		children: [
			{ path: "", pathMatch: "full", component: ImprintIndexComponent },
			{ path: ":id", component: ImprintPageComponent }
		]
	},
	{
		path: "about",
		loadComponent: () => import("./about-page/about-page.component").then((m) => m.AboutPageComponent)
	},
	{
		path: "support",
		loadComponent: () => import("./pages/support/support.component").then((m) => m.SupportPageComponent)
	},
	{ path: "faq", component: FaqComponent },
	{ path: "privacy", component: PrivacyPageComponent },
	{ path: "guidelines", component: DatabaseGuidelinesComponent },
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
