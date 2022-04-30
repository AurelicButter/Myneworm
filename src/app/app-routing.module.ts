import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BookPageComponent } from "./book-page/book-page.component";
import { SupportPageComponent } from "./support-page/support-page.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { ImprintPageComponent } from "./imprint-page/imprint-page.component";
import { ImprintIndexComponent } from "./imprint-index/imprint-index.component";

const routes: Routes = [
	{ path: "", component: HomePageComponent },
	{ path: "home", pathMatch: "full", redirectTo: "" },
	{ path: "book/:isbn", component: BookPageComponent },
	{ path: "publisher", component: ImprintIndexComponent },
	{ path: "publisher/:id", component: ImprintPageComponent },
	{ path: "support", component: SupportPageComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
