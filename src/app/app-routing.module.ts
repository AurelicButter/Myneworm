import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BookPageComponent } from "./book-page/book-page.component";
import { SupportPageComponent } from "./support-page/support-page.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { ImprintPageComponent } from "./imprint-page/imprint-page.component";
import { ImprintIndexComponent } from "./imprint-index/imprint-index.component";
import { MissingPageComponent } from "./missing-page/missing-page.component";
import { SeriesPageComponent } from "./series-page/series-page.component";
import { FaqPageComponent } from "./faq-page/faq-page.component";

const routes: Routes = [
	{ path: "", component: HomePageComponent },
	{ path: "home", pathMatch: "full", redirectTo: "" },
	{ path: "book/:isbn", component: BookPageComponent },
	{ path: "publisher", component: ImprintIndexComponent },
	{ path: "publisher/:id", component: ImprintPageComponent },
	{ path: "support", component: SupportPageComponent },
	{ path: "series/:id", component: SeriesPageComponent },
	{ path: "faq", component: FaqPageComponent },
	{ path: "**", pathMatch: "full", component: MissingPageComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
